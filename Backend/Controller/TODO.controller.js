import Task from "../Schema/Todo.schema.js";
// import user from "../Schema/User.schema.js";

const cookieOption = {
  maxAge: 7 * 24 * 60 * 60 * 1000, // for 7days login
  httpOnly: true,
  secure: process.env.NODE_ENV === "production" ? true : false,
  sameSite: "Lax"
};

const addTodo = async (req, res, next) => {
  try {
    const { name } = req.body;
    let existingTaskList = await Task.findOne({ user: req.user.id });

    const newTaskList = await Task.create({
      user: req.user.id,
      title: { name },
    });

    await newTaskList.save();
    const token = await newTaskList.generateTaskJWTToken();
    res.cookie("taskToken", token, cookieOption);
    res.status(201).json({
      success: true,
      message: "Task list created successfully",
      data: newTaskList,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating task list", error: error.message });
  }
};
const addTasks = async (req, res, next) => {
  try {
    const { id } = req.params; // This id is mainly the parent id of the new collection
    const tasks = req.body;
    console.log(tasks);
    let existingTaskList = await Task.findById(id);
    if (existingTaskList) {
      console.log("Existing Task List Found:", existingTaskList.title._id);
      // if (!Array.isArray(existingTaskList.title.tasks)) {
      //   existingTaskList.title.tasks = [];
      // }
      existingTaskList.title.tasks.push({
        // id: tasks.id,
        todoData: tasks.todoData,
        finished: tasks.finished,
      });
      await existingTaskList.save();
      // const token = await newTaskList.generateTaskJWTToken();
      // res.cookie("taskToken", token, cookieOption);
      res.status(200).json({
        success: true,
        message: "Tasks added to existing list",
        data: existingTaskList,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error creating task list",
      error: error.message,
    });
  }
};
const fetchTodo = async (req, res, next) => {
  try {
    // ✅ Fetch only the 'title.name' field for all task lists belonging to the user
    const taskLists = await Task.find({ user: req.user.id });
    // console.log(taskLists);

    if (!taskLists || taskLists.length === 0) {
      return res.status(404).json({ message: "No titles found" });
    }

    // ✅ Extract only title names
    const titles = taskLists.map((task) => task.title.name);
    // const token = await taskLists.generateTaskJWTToken();
    // res.cookie("taskToken", token, cookieOption);
    return res
      .status(200)
      .json({ message: "Titles fetched successfully", data: taskLists });
  } catch (error) {
    console.error("Error fetching titles:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching titles", error: error.message });
  }
};
const fetchTask = async (req, res, next) => {
  try {
    const { titleId } = req.params; // ✅ Get the title ID from URL parameters
    console.log(titleId);
    const userId = req.user.id; // ✅ Get the authenticated user's ID

    // ✅ Find the task list that contains the requested title ID
    const taskList = await Task.findById(titleId);
    // console.log(taskList);

    if (!taskList) {
      return res
        .status(404)
        .json({ success: false, message: "No tasks found for this title ID" });
    }
    // const token = await taskList.generateTaskJWTToken();
    // res.cookie("taskToken", token, cookieOption);
    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      data: taskList,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching tasks",
      error: error.message,
    });
  }
};
const editTodo = async (req, res, next) => {
  try {
    // const { taskListId } = req.task; // ✅ Get Task List ID from params
    const { taskListId, newName } = req.body; // ✅ Get new title name from request body
    const userId = req.user.id; // ✅ Get authenticated user ID
    console.log(taskListId);
    console.log(newName);
    console.log(userId);

    // ✅ Find the task list by ID and user
    const taskList = await Task.findOne({ _id: taskListId, user: userId });

    if (!taskList) {
      return res
        .status(404)
        .json({ success: false, message: "Task list not found" });
    }

    // ✅ Update the title name
    taskList.title.name = newName;

    // ✅ Save changes to the database
    await taskList.save();

    return res.status(200).json({
      success: true,
      message: "Title name updated successfully",
      data: {
        titleId: taskList._id,
        updatedName: taskList.title.name,
      },
    });
  } catch (error) {
    console.error("Error updating title name:", error.message);
    res.status(500).json({
      success: false,
      message: "Error updating title name",
      error: error.message,
    });
  }
};

const editTask = async (req, res, next) => {
  try {
    const { taskListId } = req.params; // Get task list ID from params
    const { _id, todoData, finished } = req.body; // Extract task ID & new data

    // console.log("Task List ID:", taskListId);
    console.log("Updating Task ID:", _id, todoData, finished);

    // ✅ Find Task List
    const taskList = await Task.findOne({ _id: taskListId, user: req.user.id });

    if (!taskList || !taskList.title || !Array.isArray(taskList.title.tasks)) {
      return res.status(404).json({
        success: false,
        message: "Task list not found or tasks array is missing",
      });
    }
    // console.log("272",taskList);

    // ✅ Convert `_id` to a number before searching
    // const taskId = Number(_id);
    // console.log("276",taskId);

    // ✅ Find the task inside `tasks` array
    const TodoTask = taskList.title.tasks.find((task) => task._id == _id);
    // console.log(TodoTask);

    // console.log("279",TodoTask);

    if (!TodoTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    // ✅ Update task fields if provided
    if (todoData !== undefined) TodoTask.todoData = todoData;
    if (finished !== undefined) TodoTask.finished = finished;

    // ✅ Save updated document
    await taskList.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: TodoTask, // Return updated task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating task",
      error: error.message,
    });
  }
};

const deleteTaskList = async (req, res) => {
  try {
    const { taskListId, taskId } = req.params; // Get IDs from request params
    console.log("Deleting Task from TaskList:", taskListId, "Task ID:", taskId);

    // ✅ Find the TaskList document by ID
    const taskList = await Task.findOne({ _id: taskListId, user: req.user.id });
    // console.log(taskList);

    if (!taskList || !taskList.title || !Array.isArray(taskList.title.tasks)) {
      return res.status(404).json({
        success: false,
        message: "Task list not found or tasks array is missing",
      });
    }

    // ✅ Convert taskId to number (if necessary)
    // const taskID = Number(taskId);

    // ✅ Find task index inside the tasks array
    const taskIndex = taskList.title.tasks.findIndex((task) =>
      task._id.equals(taskId)
    );
    console.log(taskIndex);

    if (taskIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    // ✅ Remove task from array
    taskList.title.tasks.splice(taskIndex, 1);

    // ✅ Save updated document
    await taskList.save();

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting task",
      error: error.message,
    });
  }
};

const deleteTodoList = async (req, res) => {
  try {
    // const {taskListId}  = req.body; // Get the Task List ID from params
    const { taskListId } = req.params;
    console.log("Deleting Todo List with ID:", taskListId);

    // ✅ Find and delete the task list from the database
    const deletedTaskList = await Task.findOneAndDelete({
      _id: taskListId,
      user: req.user.id,
    });

    if (!deletedTaskList) {
      return res
        .status(404)
        .json({ success: false, message: "Todo List not found" });
    }

    res.status(200).json({
      success: true,
      message: "Todo List deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting Todo List",
      error: error.message,
    });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { taskListId, taskId } = req.params; // Get IDs from URL params
    const { finished } = req.body; // Get updated status from request body

    if (typeof finished !== "boolean") {
      return res
        .status(400)
        .json({ success: false, message: "Finished must be a boolean" });
    }

    // ✅ Find the Task List document by ID
    const taskList = await Task.findOne({ _id: taskListId, user: req.user.id });
    // console.log(taskList)

    if (!taskList) {
      return res
        .status(404)
        .json({ success: false, message: "Task list not found" });
    }

    // ✅ Find the task inside title.tasks array
    const task = taskList.title.tasks.find((t) => t.id == taskId);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    // ✅ Update the `finished` status
    task.finished = finished;

    // ✅ Save the updated document
    await taskList.save();

    res.status(200).json({
      success: true,
      message: "Task status updated successfully",
      updatedTask: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating task status",
      error: error.message,
    });
  }
};
const selectAllTasks = async (req, res) => {
  const { taskListId } = req.params;
  // console.log(taskListId);
  try {
    const taskList = await Task.findById(taskListId);
    // console.log(taskList);
    if (!taskList) {
      return res
        .status(404)
        .json({ success: false, message: "Task list not found" });
    }

    taskList.title.tasks = taskList.title.tasks.map((task) => ({
      ...task.toObject(),
      finished: true,
    }));

    await taskList.save();
    res
      .status(200)
      .json({
        success: true,
        message: "All tasks marked as finished",
        taskList,
      });
  } catch (error) {
    console.error("Error selecting all tasks:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Server error while selecting all tasks",
      });
  }
};
const unselectAllTask = async (req, res) => {
  const { taskListId } = req.params;
  // console.log(taskListId);
  try {
    const taskList = await Task.findById(taskListId);
    // console.log(taskList);
    if (!taskList) {
      return res
        .status(404)
        .json({ success: false, message: "Task list not found" });
    }

    taskList.title.tasks = taskList.title.tasks.map((task) => ({
      ...task.toObject(),
      finished: false,
    }));

    await taskList.save();
    res
      .status(200)
      .json({
        success: true,
        message: "All tasks marked as finished",
        taskList,
      });
  } catch (error) {
    console.error("Error selecting all tasks:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Server error while selecting all tasks",
      });
  }
};

export {
  addTodo,
  editTodo,
  fetchTodo,
  deleteTodoList,
  addTasks,
  fetchTask,
  editTask,
  deleteTaskList,
  updateTaskStatus,
  selectAllTasks,
  unselectAllTask,
};
