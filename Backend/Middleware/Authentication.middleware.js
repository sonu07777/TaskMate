import jwt from "jsonwebtoken";
import AppError from "../Utils/All_error.js";
import User from "../Schema/User.schema.js";

const isLogged_in = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new AppError("unentheticated , please login first ", 400));
  }

  const userDetail = await jwt.verify(token, process.env.JWT_SECRET);
  req.user =
    userDetail; /* this req.user is same as the controller req.user.id */
  next();
};

const authorizedRoles =
  (...roles) =>
  async (req, res, next) => {
    //roles return the value in Array form
    const currentUserRoles = req.user.role;
    if (!roles.includes(currentUserRoles)) {
      return next(
        new AppError("you don't have permission to access this ", 400)
      );
    }

    next();
  };
const authorizedSubscriber = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (
    user.subscription.status != "active" &&
    user.role != "admin" &&
    user.role != "ADMIN"
  ) {
    return next(new AppError("you not parches the course", 400));
  }
  next();
};

export { isLogged_in, authorizedRoles, authorizedSubscriber};
