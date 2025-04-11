import React, { useState } from "react";
import { FaEdit, FaRegSave, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function TodoList({ data, updateTodo, deleteTodo }) {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [alldata, setAlldata] = useState({
    taskListId: data._id,
    newName: data.title.name,
  });

  //  const deleteTodo = (id) => {
  //     setTodos(todos.filter((todo) => todo.id !== id));
  //   };
  // const dateObj = new Date(data.createdAt);
  // const date = dateObj.toLocaleDateString(); // e.g., "3/30/2025"
  // const time = dateObj.toLocaleTimeString(); // e.g., "6:11:06 AM"
  // console.log({ ...data });
  const handleSave = () => {
    updateTodo(alldata); // Pass updated task data to parent component
    setEditing(false); // Exit editing mode
  };
  const formatDate = (iso) => {
    const date = new Date(iso);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-4 flex justify-between items-start gap-4 transition-transform transform hover:scale-[1.02] hover:shadow-xl duration-200">
      {/* Note Content */}
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          if (!editing)
            navigate(`/allTask/${data._id}`, { state: { ...data } });
        }}>
        {/* Date */}
        <p className="text-xs text-gray-400 italic mb-1">
          {formatDate(data.createdAt)}
        </p>

        {/* Title (Editable) */}
        {editing ? (
          <input
            type="text"
            value={alldata.newName}
            onChange={(e) =>
              setAlldata((prev) => ({ ...prev, newName: e.target.value }))
            }
            className="border border-gray-300 p-2 rounded-md w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ) : (
          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
            {data.title.name}
          </h3>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-1">
        {/* Edit / Save Button */}
        <button
          onClick={() => {
            if (editing) handleSave();
            else setEditing(true);
          }}
          className="text-yellow-500 hover:text-yellow-600 transition-transform transform hover:scale-110"
          title={editing ? "Save" : "Edit"}>
          {editing ? <FaRegSave size={18} /> : <FaEdit size={18} />}
        </button>

        {/* Delete Button */}
        <button
          className="text-red-500 hover:text-red-600 transition-transform transform hover:scale-110"
          onClick={() => deleteTodo(alldata.taskListId)}
          title="Delete">
          <FaTrash size={18} />
        </button>
      </div>
    </div>
  );
}

export default TodoList;
