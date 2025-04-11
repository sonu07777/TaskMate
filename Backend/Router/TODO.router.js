import express from "express";
import {
  addTodo,
  editTodo,
  fetchTodo,
  addTasks,
  fetchTask,
  editTask,
  deleteTodoList,
  deleteTaskList,
  updateTaskStatus,
  selectAllTasks,
  unselectAllTask
} from "../Controller/TODO.controller.js";
import { isLogged_in } from "../Middleware/Authentication.middleware.js";
import { todoVerify } from "../Middleware/TodoVerify.middleware.js";

const router = express.Router();

router.post("/addTodo", isLogged_in, addTodo);
router.post("/addTask/:id", isLogged_in, addTasks);
router.get("/getAllTodo", isLogged_in, fetchTodo);
router.get("/fetchTask/:titleId", isLogged_in, fetchTask);
router.post("/editTodo", isLogged_in, editTodo);
router.put("/editTask/:taskListId", isLogged_in, editTask);
router.delete("/deleteTodo/:taskListId", isLogged_in, deleteTodoList);
router.delete("/deleteTask/:taskListId/:taskId", isLogged_in, deleteTaskList);
router.put(
  "/updateTaskStatus/:taskListId/:taskId",
  isLogged_in,
  updateTaskStatus
);
router.patch("/selectAll_Task/:taskListId/", isLogged_in, selectAllTasks);
router.patch("/unselectAll_Task/:taskListId/", isLogged_in, unselectAllTask);

export default router;
