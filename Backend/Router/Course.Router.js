import express from "express";
import { authorizedRoles, authorizedSubscriber, isLogged_in } from "../Middleware/Authentication.middleware.js";

import {
  getAllCourse,
  getLectureByCourseId,
  createCourse,
  updateCourse,
  removeCourse,
  addLectureToCourseById,
  removeLectureFromCourse
} from "../Controller/Course.controller.js";
import upload from "../Middleware/Upload.middleware.js";
const authRouter = express.Router();

authRouter
  .route("/")
  .get(getAllCourse)
  .post(
    isLogged_in,
    authorizedRoles("admin"),
    upload.single("thumbnail"),
    createCourse
  ).delete(isLogged_in,authorizedRoles("admin"),removeLectureFromCourse);

authRouter
  .route("/:id")
  .get(isLogged_in, authorizedSubscriber,getLectureByCourseId)
  .put(isLogged_in, authorizedRoles("admin"), updateCourse)
  .delete(isLogged_in, authorizedRoles("admin"), removeCourse)
  .post(isLogged_in, authorizedRoles("admin"),upload.single("lecture"), addLectureToCourseById);
export default authRouter;
