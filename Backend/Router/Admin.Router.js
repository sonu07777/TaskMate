import express from "express"
import { isLogged_in } from "../Middleware/Authentication.middleware.js";
import { isAdmin } from "../Middleware/Admin.middleware.js";
import { getAllUsers, updateUserRole } from "../Controller/Admin.controller.js";

const adminRouter = express.Router()
adminRouter.get("/all-users", isLogged_in, isAdmin, getAllUsers);
adminRouter.put("/updateRole/:id", isLogged_in, isAdmin, updateUserRole);

export default adminRouter;