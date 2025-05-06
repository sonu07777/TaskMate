import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import userRouter from "./Router/User.router.js";
import contactRouter from "./Router/ContactUs.router.js";
import router from "./Router/TODO.router.js";
import adminRouter from "./Router/Admin.Router.js";
import courseRouter from "./Router/Course.Router.js"
import paymentRouter from "./Router/Payment.Router.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// console.log("CORS allowed origin:", process.env.FRONTEND_URL);
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/v1/user", userRouter); //user Route
app.use("/api/v1/contact", contactRouter); //contacts Route
app.use("/api/v1/todo", router);// todo router
app.use("/api/v1/admin", adminRouter); // admin Route
app.use("/api/v1/course",courseRouter)//course Route
app.use("/api/v1/payment",paymentRouter) //Payment Route

app.use("*", (req, res) => {
  res.send("oops! 404 not found");
});

export default app;
