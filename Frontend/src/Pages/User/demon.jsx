import React from 'react'

function demon() {
  return (
   
    <div className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center mb-2">
      {/* Note Title (Editable) */}
      <div
        className="w-3/4 cursor-pointer"
        onClick={() => {
          if (!editing)
            navigate(`/allTask/${data._id}`, { state: { ...data } });
        }}>
        {editing ? (
          <input
            type="text"
            value={alldata.newName}
            onChange={(e) =>
                setAlldata((prev) => ({ ...prev, newName: e.target.value }))}
            className="border p-1 rounded w-full"
          />
        ) : (
          <h3 className="text-lg font-semibold text-gray-900">
           {data.title.name}
          </h3>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        {/* Edit / Save Button */}
        <button
          onClick={() => {
            if (editing) handleSave();
            else setEditing(true);
          }}
          className="text-yellow-500 hover:text-yellow-600">
          {editing ? <FaRegSave /> : <FaEdit />}
        </button>

        {/* Delete Button */}
        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => deleteTodo(alldata.taskListId)}>
          <FaTrash />
        </button>
      </div>
    </div>
  )
}

export default demon