import React from "react";
import { useNavigate } from "react-router-dom";
// import { deleteCourse, getAllCourse } from "../Redux/Slice/CourseSlice";
// import { useDispatch } from "react-redux";
import { BsTrash } from "react-icons/bs";

function courseCard({ data }) {
  console.log(data);

  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // async function onCourseDelete(id) {
  //   if (window.confirm("Are you sure you want to delete the course ? ")) {
  //     const res = await dispatch(deleteCourse(id));
  //     // console.log(res);
  //     if (res?.payload?.success) {
  //       await dispatch(getAllCourse());
  //     }
  //   }
  // }
  // const onCourseDelete = async (id) => {
  //   if (!id) {
  //     console.error("Course ID is undefined");
  //     return;
  //   }
  //   if (window.confirm("Are you sure you want to delete the course?")) {
  //     try {
  //       const res = await dispatch(deleteCourse(id));
  //       if (res?.payload?.success) {
  //         await dispatch(getAllCourse());
  //       }
  //     } catch (error) {
  //       console.error("Error deleting course:", error);
  //     }
  //   }
  // };
  // const title = data.title || "Untitled Course";
  // const thumbnail = data.thumbnail?.secure_url || "/default-thumbnail.jpg";
  // const description = data.description || "No description available.";
  // const category = data.category || "General";
  // const numbersOfLectures = data.numbersOfLectures ?? "N/A";
  // const createdBy = data.createdBy || "Unknown";
  // const id = data._id;
  return (
    <div
      onClick={() => navigate("/course/description/", { state: { ...data } })}
      className="relative bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-sm mx-auto cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      {/* Thumbnail */}
      <div className="relative overflow-hidden">
        <img
          src={data?.thumbnail?.secure_url || "/default-thumbnail.jpg"}
          alt={data?.title || "Course Thumbnail"}
          className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <h2 className="text-xl font-semibold text-gray-900 line-clamp-2">
          {data?.title || "Untitled Course"}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-2">
          {data?.description || "No description available."}
        </p>
        <div className="space-y-2 text-sm">
          <p className="flex items-center">
            <span className="font-medium text-yellow-600 mr-2">Category:</span>
            {data?.category || "General"}
          </p>
          <p className="flex items-center">
            <span className="font-medium text-yellow-600 mr-2">Lectures:</span>
            {data?.numbersOfLectures ?? "N/A"}
          </p>
          <p className="flex items-center">
            <span className="font-medium text-yellow-600 mr-2">
              Instructor:
            </span>
            {data?.createdBy || "Unknown"}
          </p>
        </div>
      </div>
       {/* Delete Button */}
      
      {/* Hover Effect */}
      <div className="absolute inset-0 border-4 border-transparent hover:border-yellow-500 rounded-2xl transition-all duration-300" />
      {/* <button
        className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
        onClick={() => onCourseDelete(data?._id)}>
        <BsTrash />
      </button> */}
    </div>
    // <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-sm mx-auto transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
    //   {/* Thumbnail */}
    //   <div className="relative overflow-hidden">
    //     <img
    //       src={thumbnail}
    //       alt={title}
    //       className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110"
    //     />
    //     <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
    //   </div>

    //   {/* Content */}
    //   <div
    //     onClick={() => navigate("/course/description/", { state: { ...data } })}
    //     className="p-6 space-y-3 cursor-pointer">
    //     <h2 className="text-xl font-semibold text-gray-900 line-clamp-2">
    //       {title}
    //     </h2>
    //     <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
    //     <div className="space-y-2 text-sm">
    //       <p className="flex items-center">
    //         <span className="font-medium text-indigo-600 mr-2">Category:</span>
    //         {category}
    //       </p>
    //       <p className="flex items-center">
    //         <span className="font-medium text-indigo-600 mr-2">Lectures:</span>
    //         {numbersOfLectures}
    //       </p>
    //       <p className="flex items-center">
    //         <span className="font-medium text-indigo-600 mr-2">
    //           Instructor:
    //         </span>
    //         {createdBy}
    //       </p>
    //     </div>
    //   </div>

    //   {/* Delete Button */}
    //   {/* <button
    //     onClick={(e) => {
    //       e.stopPropagation(); // Prevent card click from triggering
    //       onCourseDelete(id);
    //     }}
    //     className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-300"
    //     aria-label="Delete Course">
    //     <BsTrash className="w-5 h-5" />
    //   </button> */}

    //   {/* Hover Border Effect */}
    //   <div className="absolute inset-0 border-4 border-transparent hover:border-indigo-500 rounded-2xl transition-all duration-300" />
    // </div>
  );
}

export default courseCard;

// <div
//   onClick={() => navigate("/course/description/", { state: { ...data } })}
//   className="text-white w-[22rem] h-[430px] shadow-lg rounded-lg cursor-pointer group overflow-hidden bg-zinc-700 ">
//   <div className="overflow-hidden">
//     <img
//       className="h-48 w-full rounded-tl-lg rounded-tr-lg group-hover:scale=[1,2] transition-all ease-in-out diration-300"
//       src={data?.thumbnail?.secure_url}
//       alt="course thumbnail"
//     />
//     <div className="p-3 space-y-1 text-white">
//       <h2 className="text-xl font-bold text-yellow-500 line-clamp-2">
//         {data?.title}
//       </h2>
//       <p className="line-clamp-2">{data?.description}</p>
//       <p className="font-semibold">
//         <span className="text-yellow-500 font-bold">Category : </span>
//         {data?.category}
//       </p>
//       <p className="font-semibold">
//         <span className="text-yellow-500 font-bold">Total lectures : </span>
//         {data?.numbersOfLectures}
//       </p>
//       <p className="font-semibold">
//         <span className="text-yellow-500 font-bold">Instructor : </span>
//         {data?.createdBy}
//       </p>
//     </div>
//   </div>
// </div>
// --------------------------------------------
// <div
//   onClick={() => navigate("/course/description/", { state: { ...data } })}
//   className="w-[22rem] h-[430px] rounded-xl overflow-hidden bg-zinc-800 text-white shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 group"
// >
//   {/* Thumbnail */}
//   <div className="overflow-hidden">
//     <img
//       src={data?.thumbnail?.secure_url || "/default-thumbnail.jpg"}
//       alt="Course Thumbnail"
//       className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
//     />
//   </div>

//   {/* Course Content */}
//   <div className="p-4 space-y-2">
//     <h2 className="text-xl font-bold text-yellow-500 line-clamp-2">
//       {data?.title || "Untitled Course"}
//     </h2>

//     <p className="line-clamp-2 text-sm text-gray-300">
//       {data?.description || "No description available."}
//     </p>

//     <p className="text-sm font-medium">
//       <span className="text-yellow-500 font-semibold">Category: </span>
//       {data?.category || "General"}
//     </p>

//     <p className="text-sm font-medium">
//       <span className="text-yellow-500 font-semibold">Total Lectures: </span>
//       {data?.numbersOfLectures ?? "N/A"}
//     </p>

//     <p className="text-sm font-medium">
//       <span className="text-yellow-500 font-semibold">Instructor: </span>
//       {data?.createdBy || "Unknown"}
//     </p>
//   </div>
// </div>
