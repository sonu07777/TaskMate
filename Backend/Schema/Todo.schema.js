// import { JsonWebTokenError } from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";

const todo_schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User_Of_cpt",
    required: true,
  },
  title: {
    type: new mongoose.Schema({
      name: { type: String, required: true },
      tasks: [
        {
          todoData: { type: String },
          finished: {
            type: Boolean, default: false
          },
        },
      ],
      String,
    }),
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

todo_schema.methods ={
  generateTaskJWTToken: async function () {
      return await jwt.sign(
        {
          taskListId: this._id,  // ✅ Task List Document ID
          userId: this.user,  // ✅ User ID (to verify ownership)
          titleId: this.title?._id || null, // ✅ Title ID (optional)
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRY,
        }
      );
    },
}

const Task = mongoose.model("Task", todo_schema);
export default Task;
