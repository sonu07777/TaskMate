import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../../Layout/HomeLayout.jsx";
import TaskList from "../../Component/Todo/TaskList.jsx";
import {
  addingTask,
  editingTask,
  fetchTask,
  isFinished,
  selectAllTask,
  taskDelete,
  unselectAllTask,
} from "../../Redux/Slice/TodoSlice.js";
import toast from "react-hot-toast";

function AllTaskPage() {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const allPrevTask = useSelector((states) => states.todo.allTask);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [allCheck, setAllCheck] = useState(true);

  const [alltasks, setNewTask] = useState({
    // id: Lengths + 1,
    todoData: "",
    finished: false,
  });
  console.log(allPrevTask);

  allPrevTask.map((el) => {
    console.log(el.finished);
  });

  const [tasks, setTasks] = useState([]); // ✅ Local state to store updated tasks

  console.log("Current Task:", state);

  function handleTask(e) {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function addTask(e) {
    e.preventDefault();
    console.log("Adding Task:", alltasks);

    if (!alltasks.todoData.trim()) {
      toast.error("Task field cannot be empty!");
      return;
    }

    // const latestId = Lengths + 1; // ✅ Ensure proper id calculation
    const newTask = {
      // id: latestId,
      todoData: alltasks.todoData,
      finished: false,
    };

    const response = await dispatch(addingTask([state._id, newTask]));
    console.log("Response:", response);

    if (response?.payload?.success) {
      toast.success("Task added successfully");

      // ✅ Update local state immediately without reload
      setTasks((prev) => [...prev, newTask]);

      // setNewTask({ id: latestId + 1, todoData: "", finished: false });
      setNewTask({ todoData: "", finished: false });

      // ✅ Fetch updated tasks from Redux
      await loadAllTask();
    }
  }

  async function changeFinished(id, finished) {
    // console.log("Task Finished:", id,finished);
    const response = await dispatch(isFinished([state._id, id, finished]));
    if (response?.payload?.success) {
      toast.success("Task updated successfully");

      // ✅ Fetch updated tasks from Redux and update state
      await loadAllTask();
    } else {
      toast.error("Failed to update finished");
    }
  }

  async function updateTask(updatedTask) {
    const response = await dispatch(editingTask([state._id, updatedTask]));
    console.log(response?.payload?.success);

    if (response?.payload?.success) {
      toast.success("Task updated successfully");

      // ✅ Fetch updated tasks from Redux and update state
      await loadAllTask();
    } else {
      toast.error("Failed to update task");
    }
  }

  async function deleteTask(taskId) {
    const response = await dispatch(taskDelete([state._id, taskId]));
    console.log("104", response?.payload?.success);

    if (response?.payload?.success) {
      toast.success("Task updated successfully");

      // ✅ Fetch updated tasks from Redux and update state
      await loadAllTask();
    } else {
      toast.error("Failed to update task");
    }
  }

  async function selectAllTasks() {
    const response = await dispatch(selectAllTask(state._id));
    if (response?.payload?.success) {
      toast.success("All tasks selected");
      await loadAllTask();
    } else {
      toast.error("Failed to select tasks");
    }
  }

  async function unselectAllTasks() {
    const response = await dispatch(unselectAllTask(state._id));
    console.log(response?.payload?.success);

    if (response?.payload?.success) {
      toast.success("All tasks unselected");
      await loadAllTask();
    } else {
      toast.error("Failed to unselect tasks");
    }
  }

  async function loadAllTask() {
    const res = await dispatch(fetchTask(state._id));
    if (res?.payload?.data) {
      setName(res?.payload?.data?.title?.name);
      setTasks(res.payload.data.title.tasks); // ✅ Update local state with new tasks
    }
  }
  useEffect(() => {
    const allFinished =
      allPrevTask.length > 0 && allPrevTask.every((task) => task.finished);
    setAllCheck(!allFinished);
  }, [allPrevTask]);

  useEffect(() => {
    loadAllTask();
  }, []);

  return (
    <HomeLayout>
      <div className="max-w-[95vw] sm:max-w-4xl mx-auto  p-8 bg-gradient-to-br from-white via-yellow-50 to-white shadow-2xl rounded-3xl border border-yellow-100">
        {/* Title */}
        <span className="text-yellow-500">Tasks</span>
        <h2 className="text-3xl font-bold text-gray-800 relative pb-3 mb-8 after:content-[''] after:w-24 after:h-1 after:bg-yellow-400 after:absolute after:bottom-0 after:left-0 after:rounded-full">
          {name}
        </h2>

        {/* Input + Add Button + Select All */}
        <div className="flex flex-col sm:flex-row items-stretch gap-4 mb-6">
          <input
            type="text"
            name="todoData"
            id="todoData"
            className="flex-1 p-3 border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-400 hover:border-yellow-400 transition-all"
            placeholder="Add a task..."
            value={alltasks.todoData}
            onChange={handleTask}
          />
          <button
            onClick={addTask}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-600 active:scale-95 transition-all duration-200 shadow-lg">
            ➕ Add
          </button>

          {allCheck ? (
            <button
              onClick={selectAllTasks}
              className="px-4 py-3 border border-yellow-500 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-all font-medium shadow-sm">
              ✔️ Select All
            </button>
          ) : (
            <button
              onClick={unselectAllTasks}
              className="px-4 py-3 border border-yellow-500 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-all font-medium shadow-sm">
              ❌ Unselect All
            </button>
          )}
        </div>

        {/* Task List */}
        <div className="max-h-[280px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-yellow-100">
          <ul className="space-y-4">
            {tasks.map((task) => (
              <TaskList
                key={task._id || task.id}
                data={task}
                changeFinished={changeFinished}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
            ))}
          </ul>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-right">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold rounded-lg hover:from-gray-700 hover:to-gray-800 active:scale-95 transition-all duration-200 shadow-md">
            ⬅️ Back
          </button>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AllTaskPage;

{
  /* <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold text-gray-800 relative after:content-[''] after:w-full after:h-1 after:bg-yellow-500 after:absolute after:bottom-0 after:left-0 after:rounded-full pb-3 mb-2">
          {name}:
        </h2>
        <div className="flex mb-4">
          <input
            type="text"
            name="todoData"
            id="todoData"
            className="flex-1 p-2 border rounded-l-lg focus:outline-none"
            placeholder="Add a task..."
            value={alltasks.todoData}
            onChange={handleTask}
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600">
            Add
          </button>
        </div>
        <ul>
          {tasks.map(
            (
              el // ✅ Using updated local state instead of static state
            ) => (
              <TaskList
                key={el._id || el.id}
                data={{ ...el, finished: Boolean(el.finished) }}
                changeFinished={changeFinished}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
            )
          )}
        </ul>
      </div> */
}
{
  /* <div className="max-w-[95vw] sm:max-w-3xl mx-auto mt-5 p-6 bg-white shadow-2xl rounded-2xl">
        <h2 className="text-2xl font-bold text-gray-800 relative pb-3 mb-6 after:content-[''] after:w-20 after:h-1 after:bg-yellow-400 after:absolute after:bottom-0 after:left-0 after:rounded-full">
          {name}:
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="text"
            name="todoData"
            id="todoData"
            className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition-all"
            placeholder="Add a task..."
            value={alltasks.todoData}
            onChange={handleTask}
          />
          <button
            onClick={addTask}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-600 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg">
            ➕ Add
          </button>
        </div>

        <div className="max-h-[340px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-100">
          <ul className="space-y-4">
            {tasks.map((el) => (
              <TaskList
                key={el._id || el.id}
                data={{ ...el, finished: Boolean(el.finished) }}
                changeFinished={changeFinished}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
            ))}
          </ul>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-3 inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-medium rounded-lg shadow-md hover:from-gray-600 hover:to-gray-800 active:scale-95 transition-all duration-200">
          ⬅️ Back
        </button>
      </div> */
}
{
  /* {allCheck ? (
            <button
              onClick={selectAllTasks}
              className="px-4 py-3 border border-yellow-500 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-all font-medium shadow-sm">
              ✔️ Select All
            </button>
          ) : (
            <button
              onClick={unselectAllTasks}
              className="px-4 py-3 border border-yellow-500 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-all font-medium shadow-sm">
              ❌ Unselect All
            </button>
          )} */
}

// async function unselectAllTasks() {
//   setAllCheck(true);
//   const response = await dispatch(unselectAllTask(state._id));
//   console.log(response?.payload?.success);

//   if (response?.payload?.success) {
//     toast.success("All tasks unselected");
//     await loadAllTask();
//   } else {
//     toast.error("Failed to unselect tasks");
//   }
// }

// ---------------------
// async function selectAllTasks() {
//   setAllCheck(false);
//   const response = await dispatch(selectAllTask(state._id));
//   console.log(response?.payload?.success);

//   if (response?.payload?.success) {
//     toast.success("Task updated successfully");

//     // ✅ Fetch updated tasks from Redux and update state
//     await loadAllTask();
//   } else {
//     toast.error("Failed to update task");
//   }
// }
