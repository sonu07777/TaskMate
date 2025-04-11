import jwt from "jsonwebtoken";
import AppError from "../Utils/All_error.js";
// import User from "../Schema/User.schema.js";

const todoVerify = async (req, res, next) => {
  const { taskToken } = req.cookies;
  if (!taskToken) {
    return next(new AppError("unentheticated , please login first ", 400));
  }

  const todoDetails = await jwt.verify(taskToken, process.env.JWT_SECRET);
  req.task = todoDetails; /* this req.user is same as the controller req.user.id */
  next();
};

export { todoVerify };
