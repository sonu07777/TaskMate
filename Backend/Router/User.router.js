import express from "express";
import uploads from "../Middleware/Upload.middleware.js";
import { isLogged_in } from "../Middleware/Authentication.middleware.js";
import { registerUserSchema ,loginSchema,forgotPasswordSchema,resetPasswordSchema} from "../Schema/zod.authValidation.schema.js";
import validation from "../Middleware/zodValidation.middleware.js";
import { z } from "zod";
const authRouter = express.Router();

import {
  register,
  login,
  logout,
  get_profile,
  forget_password,
  reset,
  changeProfile,
  deleteUser,
  changePassword,
} from "../Controller/User.controller.js";

authRouter.post(
  "/register",
  uploads.single("avatar"),
  validation(registerUserSchema),
  register
);
authRouter.post("/login", validation(loginSchema), login);
authRouter.post("/logout", logout);
authRouter.get("/profile", isLogged_in, get_profile);
authRouter.post("/forgetPassword", validation(forgotPasswordSchema), forget_password);
authRouter.post("/reset/:resetToken", validation(resetPasswordSchema), reset);
authRouter.put(
  "/updateProfile/:id",
  isLogged_in,
  uploads.single("avatar"),
  changeProfile
);
authRouter.delete("/delete", isLogged_in, deleteUser);
authRouter.post("/changePassword", isLogged_in, changePassword);

export default authRouter;
