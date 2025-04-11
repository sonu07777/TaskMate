import { Schema,model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";


const user_schema = new Schema(
    {
      fullName: {
        type: "String",
        required: [true, "name is required"],
        minLength: [5, "name should be less than 5 char"],
        maxLength: [50, "name should be less  than 50 char"],
      },
      email: {
        type: "String",
        required: true,
        trim: true,
        unique: true,
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please fill in a valid email address",
        ], // Matches email against regex
      },
      password: {
        type: "String",
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 8 characters'],
        select: false, // Will not select password upon looking up a document
      },
      avatar: {
        public_id: {
          type: "String",
        },
        secure_url: {
          type: "String",
        },
      },
      role: {
        type: "String",
        enum: ["user","USER", "admin","ADMIN"],
        default: "user",
      },
      forgetPasswordToken: "String",
      forgetPasswordExpiry: Date,
      subscription:{
        id:String,
        status:String
      }
    },
    {
      timestamps: true,
    }
  );

user_schema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

user_schema.methods = {
   generateJWTToken: async function () {
    return await jwt.sign(
      {
        id: this._id,
        email: this.email,
        subscription: this.subscription,
        role: this.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );
  },
  comparePassword: async function (plainTextPassword) {
    return await bcrypt.compare(plainTextPassword, this.password);
  },
  generateResetPasswordToken: async function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    console.log(resetToken);
    this.forgetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    // console.log(forgetPasswordToken);
    this.forgetPasswordExpiry = Date.now() + 15 * 60 * 1000; //15 min from now
    // console.log(forgetPasswordExpiry);

    return resetToken;
  }
}

const user = model("User_Of_cpt", user_schema);

export default user;
