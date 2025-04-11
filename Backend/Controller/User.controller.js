import { json } from "express";
import AppError from "../Utils/All_error.js";
import user from "../Schema/User.schema.js";
import cloudinary from "cloudinary";
import sendEmail from "../Utils/SendEmail.js";
import crypto from "crypto";
import fs from "fs/promises";


const cookieOption = {
  maxAge: 7 * 24 * 60 * 60 * 1000, // for 7days login
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production' ? true : false,
};

const register = async (req, res, next) => {
  try {
    const { fullName, email, password, role } = req.body;
    if (!fullName || !email || !password) {
      return next(new AppError("please enter all the fields", 400));
    }
    const userExist = await user.findOne({ email });
    if (userExist) {
      return next(new AppError("email already exist", 400));
    }
    const User = await user.create({
      fullName,
      email,
      password,
      avatar: {
        public_id: email,
        secure_url:
          "https://asset.cloudinary.com/dyz7rtaa6/8e902efa7704a0ed632caa40941ad396",
      },
      role,
    });
    if (!User) {
      return next(new AppError("try again register", 400));
    }
    // FILE UPLOAD
    // console.log("file details >" + json.Stringfy(req.file));
    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "User_Image_Of_CPT",
          width: 250,
          height: 250,
          gravity: "face",
          crop: "fill",
        });
        if (result) {
          (User.avatar.public_id = result.public_id),
            (User.avatar.secure_url = result.secure_url);
          fs.rm(`uploads/${req.file.filename}`);
        }
      } catch (error) {
        return next(new AppError(error || "file not uploaded", 500));
      }
    }
    await User.save();
    User.password = undefined;
    const token = await User.generateJWTToken();
    res.cookie("token", token, cookieOption);
    res.status(201).json({
      success: true,
      message: "registration is done",
      User,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("All  fields are required", 400));
    }
    const User = await user
      .findOne({
        email,
      })
      .select("+password");
    if (!(User && (await User.comparePassword(password)))) {
      return next(
        new AppError(
          "Email or Password do not match or user does not exist",
          401
        )
      );
    }
    const token = await User.generateJWTToken();
    user.password = undefined;
    res.cookie("token", token, cookieOption);
    res.status(200).json({
      success: true,
      message: "successfully done login",
      User,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

const logout = (req, res, next) => {
  try {
    res.cookie("token", null, {
      secure: process.env.NODE_ENV === "production" ? true : false,
      maxAge: 0,
      httpOnly: true,
    });
    res.cookie("taskToken", null, {
      secure: process.env.NODE_ENV === "production" ? true : false,
      maxAge: 0,
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    return next(new AppError("unsuccessfully logout", 400));
  }
};

const get_profile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const User = await user.findById(userId);
    res.status(200).json({
      success: true,
      message: "user details",
      User,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

const forget_password = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new AppError("email is required", 400));
  }
  const User = await user.findOne({ email });
  if (!User) {
    return next(new AppError("email is not present ", 400));
  }
  const resetToken = await User.generateResetPasswordToken();
  await User.save();
  console.log(resetToken);
  const resetPasswordURL = `http://localhost:5173/resetPassword/${resetToken}`;
  console.log(resetPasswordURL);
  const subject = "reset Password";
  const message = `
    <p>Click the link below to reset your password:</p>
    <p><a href="${resetPasswordURL}" target="_blank">${resetPasswordURL}</a></p>
    <p>If you did not request this, please ignore this email.</p>
  `;
  try {
    await sendEmail(email, subject, message);
    res.status(200).json({
      success: true,
      message: `reset password token has been sent to ${email} successfully`,
      resetToken,
    });
  } catch (error) {
    User.forgetPasswordExpiry = undefined;
    User.forgetPasswordToken = undefined;
    await User.save();
    return next(new AppError("error.message", 500));
  }
};

const reset = async (req, res, next) => {
  const { resetToken } = req.params;
  const { password } = req.body;
  const forgetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const User = await user.findOne({
    forgetPasswordToken,
    forgetPasswordExpiry: { $gt: Date.now() },
  });
  if (!User) {
    return next(new AppError("not working the token is expiry", 500));
  }
  User.password = password;
  User.forgetPasswordToken = undefined;
  User.forgetPasswordExpiry = undefined;
  await User.save();

  res.status(200).json({
    success: true,
    message: "successfully change",
  });
};
const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.user;
  console.log(id);
  if (!oldPassword || !newPassword) {
    return next(new AppError("please login first", 400));
  }
  const User = await user.findById(id).select("+password");
  if (!User) {
    return next(new AppError("user doesn't exist", 400));
  }

  const isPasswordValid = await User.comparePassword(oldPassword);
  if (!isPasswordValid) {
    return next(new AppError("invalid old password", 400));
  }
  User.password = newPassword;
  await User.save();
  user.password = undefined;
  res.status(200).json({
    success: true,
    message: "successfully change the password",
  });
};

const changeProfile = async (req, res, next) => {
  const { fullName } = req.body;
  const { id } = req.params;
  const User = await user.findById(id);
  if (!User) {
    return next(new AppError("user doesn't exist ", 400));
  }
  if (fullName) {
    User.fullName = fullName;
  }
  if (req.file) {
    await cloudinary.v2.uploader.destroy(User.avatar.public_id);
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms",
        width: 250,
        height: 250,
        gravity: "face",
        crop: "fill",
      });
      if (result) {
        (User.avatar.public_id = result.public_id),
          (User.avatar.secure_url = result.secure_url);
        fs.rm(`uploads/${req.file.filename}`);
      }
    } catch (error) {
      return next(new AppError(error || "file not uploaded", 500));
    }
  }
  await User.save();

  res.status(200).json({
    success: true,
    message: "successfully update",
  });
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.user.id; // Get user ID from authenticated request

    const User = await user.findById(userId);
    if (!User) {
      return next(new AppError("User not found", 404));
    }

    // If user has an avatar, delete it from Cloudinary
    if (User.avatar && User.avatar.public_id) {
      await cloudinary.v2.uploader.destroy(User.avatar.public_id);
    }

    // Delete user from database
    await user.findByIdAndDelete(userId);

    // Clear authentication cookie
    res.cookie("token", null, {
      secure: process.env.NODE_ENV === "production" ? true : false,
      maxAge: 0,
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "User account deleted successfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export {
  register,
  login,
  logout,
  get_profile,
  forget_password,
  reset,
  changeProfile,
  deleteUser,
  changePassword
};
