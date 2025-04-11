import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import HomeLayout from "../../../Layout/HomeLayout.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodo,
  addingTodo,
  editingTodo,
  todoDelete,
} from "../../Redux/Slice/TodoSlice.js";
import TodoList from "../../Component/Todo/TodoList.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import useDebounce from "../../Component/hooks/useDebounce.js";

export default function TodoPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newTodo, setNewTodo] = useState({
    name: "",
  });
  const { allTodo } = useSelector((state) => state.todo);

  async function addTodo(event) {
    event.preventDefault();
    const res = await dispatch(addingTodo(newTodo));
    console.log("the response is", res);

    if (res?.payload?.success) {
      navigate("/todoPage");
    }
    window.location.reload();
    setNewTodo({ name: "" });
  }
  function handleUserInput(e) {
    const { name, value } = e.target;
    setNewTodo({
      ...newTodo,
      [name]: value,
    });
  }
  // const handleUserInput = useDebounce((name, value) => {
  //   setNewTodo({
  //     ...newTodo,
  //     [name]: value,
  //   });
  // },300);
  // const handleUserInput = useCallback((e) => {
  //   setNewTodo((prev) => ({
  //     ...prev,
  //     [e.target.name]: e.target.value,
  //   }));
  // }, []);
  async function updateTodo(updateTodo) {
    const response = await dispatch(editingTodo(updateTodo));
    // console.log(response?.payload?.success);

    if (response?.payload?.success) {
      toast.success("Todo updated successfully");

      // ✅ Fetch updated tasks from Redux and update state
      await loadAllTodo();
    } else {
      toast.error("Failed to update Todo");
    }
  }

  async function deleteTodo(deleteId) {
    const response = await dispatch(todoDelete(deleteId));

    if (response?.payload?.success) {
      toast.success("Todo delete successfully");
      // ✅ Fetch updated tasks from Redux and update state
      await loadAllTodo();
    } else {
      toast.error("Failed to delete Todo");
    }
  }
  async function loadAllTodo() {
    await dispatch(fetchTodo());
  }
  useEffect(() => {
    loadAllTodo();
  }, []);

  return (
    <HomeLayout>
      {/* <div className=" container mx-auto max-w-[100vw] mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        
        <div className="flex gap-2 max-w-12 mb-4">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter a new todo"
            value={newTodo.name}
            onChange={handleUserInput}
            // onChange={(e) => handleUserInput(e.target.name, e.target.value)}
            className="flex-1 p-2 border rounded-lg"
          />
          <button
            // type="submit"
            onClick={addTodo}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Add
          </button>
        </div>
      
        <div className="max-w-full flex flex-wrap justify-between gap-5  items-center ">
          {allTodo.map((el) => {
            // console.log(el);
            return (
              <TodoList
                key={el._id}
                data={el}
                updateTodo={updateTodo}
                deleteTodo={deleteTodo}
              />
            );
          })}
        </div>
      </div> */}

<div className="container mx-auto max-w-[95vw] mt-10 p-6 bg-white shadow-2xl rounded-2xl">
  <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">📝 Todo List</h1>

  {/* Input and Add Button */}
  <div className="flex flex-col sm:flex-row gap-3 mb-6">
    <input
      type="text"
      name="name"
      id="name"
      placeholder="Enter a new todo"
      value={newTodo.name}
      onChange={handleUserInput}
      className="flex-1 p-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <button
      onClick={addTodo}
      className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-200">
      ➕ Add
    </button>
  </div>

  {/* Todo List Grid */}
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {allTodo.map((el) => (
      <TodoList
        key={el._id}
        data={el}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
      />
    ))}
  </div>
</div>

    </HomeLayout>
  );
}
