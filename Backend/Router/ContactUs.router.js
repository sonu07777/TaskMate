import express from "express";
import { contactUs } from "../Controller/ContactUs.controller.js";

const authRouter = express.Router();

authRouter.route("/contactUs").post(contactUs);

export default authRouter;
