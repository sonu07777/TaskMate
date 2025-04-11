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

export { isLogged_in };
