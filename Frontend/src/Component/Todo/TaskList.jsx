// import React, { useState } from "react";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import { FaRegSave } from "react-icons/fa";

// function TaskList({ data, changeFinished }) {
//   // const [tasks, setTasks] = useState([]);
//   const [tick, setTick] = useState(Boolean(data.finished));
//   const [editing, setEditing] = useState(false);
//   const [alldata,setAlldata] = useState({
//     id:"",
//     todoData:"",
//     finished:"",
//     taskListId:"",
//   })

//   // console.log("Current Tick State:", tick); // Debugging
//   console.log(data);

//   // console.log(data.finished);
//   // console.log(tick);

//   // const editTask = () => {
//   //   const updatedName = prompt("Edit task name:", data.todoData);
//   //   if (updatedName !== null) {
//   //     // Handle edit logic (this should update the parent component or backend)
//   //     console.log(`Updated Task: ${updatedName}`);
//   //   }
//   // };

//   const deleteTask = () => {
//     // Handle delete logic (this should call a function from the parent)
//     console.log(`Deleted Task: ${data.todoData}`);
//   };
//   // const handleCheckboxChange = (e) => {
//   //   const newFinishedState = e.target.checked;
//   //   changeFinished(data._id, newFinishedState);
//   // };
//   return (
//     <div>
//       <li
//         key={data.id}
//         className="flex items-center justify-between p-2 border-b">
//         <div className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             checked={tick}
//             onChange={(e) => {
//               setTick(e.target.checked);
//               changeFinished(e.target.checked);
//             }}
//             className="w-4 h-4"
//           />
//           {editing ? (
//             <input type="text" onChange={(e)=>{
//               console.log(e);
//               alldata.todoData = e.target.value;
//             }}/>
//           ) : (
//             <span
//               className={data.completed ? "line-through text-gray-500" : ""}>
//               {data?.todoData}
//             </span>
//           )}
//         </div>
//         <div className="flex gap-2">
//           <button
//             onClick={() => {
//               // console.log(e)
//               setEditing(!editing)
//             }}
//             className="text-yellow-500 hover:text-yellow-600">
//             {!editing ? <FaEdit /> : <FaRegSave />}
//           </button>
//           <button
//             onClick={() => deleteTask(data.id)}
//             className="text-red-500 hover:text-red-600">
//             <FaTrash />
//           </button>
//         </div>
//       </li>
//     </div>
//   );
// }

// export default TaskList;

import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaRegSave } from "react-icons/fa";

function TaskList({ data, changeFinished, updateTask, deleteTask }) {
  const [tick, setTick] = useState(Boolean(data.finished));
  const [editing, setEditing] = useState(false);
  const [alldata, setAlldata] = useState({
    // id: data.id,
    todoData: data.todoData,
    _id: data._id,
  });
  const [mounted, setMounted] = useState(false);

  // console.log(data);
  // console.log(data.taskName);

  const handleSave = () => {
    updateTask(alldata); // Pass updated task data to parent component
    setEditing(false); // Exit editing mode
  };
  // const handelIsFinished = () => {
  //   changeFinished(alldata.id, tick);
  // };
  useEffect(() => {
    setTick(Boolean(data.finished));
  }, [data.finished]);
  useEffect(() => {
    // trigger slide/fade after mount
    const timeout = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timeout);
  }, []);
  return (
    // <li
    //   key={data.id}
    //   className="flex items-center justify-between p-2 border-b transition-transform duration-300 hover:shadow-yellow-100 hover:scale-[1.01]">
    //   <div className="flex items-center gap-2">
    //     <input
    //       type="checkbox"
    //       checked={tick}
    //       onChange={(e) => {
    //         setTick(e.target.checked);
    //         changeFinished(data.id, e.target.checked);
    //         handelIsFinished;
    //       }}
    //       className="w-4 h-4"
    //     />
    //     {editing ? (
    //       <input
    //         type="text"
    //         value={alldata.todoData}
    //         onChange={(e) =>
    //           setAlldata((prev) => ({ ...prev, todoData: e.target.value }))
    //         }
    //         className="border p-1"
    //       />
    //     ) : (
    //       <span className={data.finished ? "line-through text-gray-500" : ""}>
    //         {data.todoData}
    //       </span>
    //     )}
    //   </div>
    //   <div className="flex gap-2">
    //     <button
    //       onClick={() => {
    //         if (editing) {
    //           handleSave();
    //         } else {
    //           setEditing(true);
    //         }
    //       }}
    //       className="text-yellow-500 hover:text-yellow-600">
    //       {editing ? <FaRegSave /> : <FaEdit />}
    //     </button>
    //     <button
    //       onClick={() => {
    //         console.log(alldata.id);
    //         deleteTask(alldata.id);
    //       }}
    //       className="text-red-500 hover:text-red-600">
    //       <FaTrash />
    //     </button>
    //   </div>
    // </li>
    // <li
    //   key={data.id}
    //   className={`flex items-center justify-between p-2 border-b rounded-lg shadow-sm bg-white transition-all duration-500 transform
    //   ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
    //   hover:shadow-yellow-100 hover:scale-[1.01] hover:bg-yellow-50
    //   ${data.finished ? "bg-green-50" : ""}
    // `}>
    //   <div className="flex items-center gap-2 w-full">
    //     <input
    //       type="checkbox"
    //       checked={tick}
    //       onChange={(e) => {
    //         setTick(e.target.checked);
    //         changeFinished(data._id, e.target.checked);
    //         handelIsFinished;
    //       }}
    //       className="w-4 h-4 accent-blue-500 transition-all duration-200"
    //     />

    //     {editing ? (
    //       <input
    //         type="text"
    //         value={alldata.todoData}
    //         onChange={(e) =>
    //           setAlldata((prev) => ({ ...prev, todoData: e.target.value }))
    //         }
    //         className="border p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
    //       />
    //     ) : (
    //       <span
    //         className={`text-base transition-all duration-300 ${
    //           data.finished
    //             ? "line-through text-gray-500 italic"
    //             : "text-gray-800"
    //         }`}>
    //         {data.todoData}
    //       </span>
    //     )}
    //   </div>

    //   <div className="flex gap-2 ml-4">
    //     <button
    //       onClick={() => {
    //         if (editing) {
    //           handleSave();
    //         } else {
    //           setEditing(true);
    //         }
    //       }}
    //       className="text-yellow-500 hover:text-yellow-600 transition-all duration-200">
    //       {editing ? <FaRegSave /> : <FaEdit />}
    //     </button>

    //     <button
    //       onClick={() => {
    //         console.log(alldata.id);
    //         deleteTask(alldata._id);
    //       }}
    //       className="text-red-500 hover:text-red-600 transition-all duration-200">
    //       <FaTrash />
    //     </button>
    //   </div>
    // </li>
    <li
      key={data.id}
      className={`flex items-center justify-between p-3 border border-yellow-100 rounded-xl bg-white shadow-sm transition-all duration-300
    ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
    hover:shadow-lg hover:bg-yellow-50
    ${data.finished ? "bg-green-50" : ""}
  `}>
      <div className="flex items-center gap-3 w-full">
        <input
          type="checkbox"
          checked={tick}
          onChange={(e) => {
            setTick(e.target.checked);
            changeFinished(data._id, e.target.checked);
          }}
          className="w-5 h-5 accent-yellow-500 transition-all duration-200"
        />

        {editing ? (
          <input
            type="text"
            value={alldata.todoData}
            onChange={(e) =>
              setAlldata((prev) => ({ ...prev, todoData: e.target.value }))
            }
            className="border p-2 rounded-lg w-full shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
          />
        ) : (
          <span
            className={`text-base font-medium transition-all duration-300 ${
              data.finished
                ? "line-through text-gray-400 italic"
                : "text-gray-800"
            }`}>
            {data.todoData}
          </span>
        )}
      </div>

      <div className="flex gap-2 ml-4">
        <button
          onClick={() => {
            if (editing) {
              handleSave();
            } else {
              setEditing(true);
            }
          }}
          className="text-yellow-500 hover:text-yellow-600 transition-all duration-200 text-xl">
          {editing ? <FaRegSave /> : <FaEdit />}
        </button>

        <button
          onClick={() => deleteTask(alldata._id)}
          className="text-red-500 hover:text-red-600 transition-all duration-200 text-xl">
          <FaTrash />
        </button>
      </div>
    </li>
  );
}

export default TaskList;
