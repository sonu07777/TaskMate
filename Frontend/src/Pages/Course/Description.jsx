// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import HomeLayout from "../../../Layout/HomeLayout.jsx";
// import { useSelector } from "react-redux";

// function description() {
//   const { state } = useLocation();
// //   console.log(state);
//   const navigate = useNavigate()
//   const { role,data } = useSelector((state) => state.auth);
//   // console.log("location is",state.pathname)
//   return (
//     <HomeLayout>
//       {/* {
//             console.log( "the role is ",typeof(role))

//       } */}
//         {console.log("the state is",state)}

//       <div className="min-h-[90vh] pt-12 px-20 flex flex-col items-center justify-center text-white">
//         <div className="grid grid-cols-2 gap-10 py-10 relative">
//           <div className="space-y-5">
//             <img
//               className="w-full h-64"
//               alt="thumbnail"
//               src={state?.thumbnail?.secure_url}
//             />

//             <div className="space-y-4">
//               <div className="flex flex-col items-center justify-between text-xl">
//                 <p className="font-semibold text-black">
//                   <span className="text-yellow-500 font-bold">
//                     Total lectures :{" "}
//                   </span>
//                   {state?.numberOfLectures}
//                 </p>

//                 <p className="font-semibold">
//                   <span className="text-yellow-500 font-bold">
//                     Instructor :{" "}
//                   </span>
//                   {state?.createdBy}
//                 </p>
//               </div>

//               {role == "ADMIN" || data?.subscription?.status == "active" ? (
//                 <button
//                   onClick={() =>
//                     navigate("/DisplayLecture", { state: { ...state } })
//                   }
//                   className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300">
//                   Watch lectures
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => navigate("/checkout")}
//                   className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300">
//                   Subscribe
//                 </button>
//               )}
//             </div>
//           </div>

//           <div className="space-y-2 text-xl">
//             <h1 className="text-3xl font-bold text-yellow-500 mb-5 text-center">
//               {state?.title}
//             </h1>

//             <p className="text-yellow-500">Course description: </p>
//             <p>{state?.description}</p>
//           </div>
//         </div>
//       </div>
//     </HomeLayout>
//   );
// }

// export default description;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HomeLayout from "../../../Layout/HomeLayout.jsx";

function CourseDescription() {
  const { state: course } = useLocation();
  const navigate = useNavigate();
  const { role, data } = useSelector((state) => state.auth);
  console.log("the role is " + role + " and the data is  ", data);

  const isSubscribed =
    role?.toUpperCase() === "ADMIN" || data?.subscription?.status === "active";

  console.log(isSubscribed);

  return (
    <HomeLayout>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              {course?.title || "Untitled Course"}
            </h1>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Thumbnail & Button */}
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-2xl shadow-md">
                <img
                  className="w-full h-64 sm:h-72 object-cover transition-transform duration-500 hover:scale-110"
                  alt={course?.title || "Course Thumbnail"}
                  src={
                    course?.thumbnail?.secure_url || "/default-thumbnail.jpg"
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
              </div>
              <button
                onClick={() =>
                  isSubscribed
                    ? navigate("/DisplayLecture", { state: course })
                    : navigate("/checkout")
                }
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg px-6 py-3 rounded-lg transition-colors duration-300">
                {isSubscribed ? "Go to Lectures" : "Enroll Now"}
              </button>
            </div>

            {/* Course Info & Description */}
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-lg font-medium">
                  <span className="text-indigo-600 font-semibold">
                    Total Lectures:{" "}
                  </span>
                  {course?.numbersOfLectures ?? "N/A"}
                </p>
                <p className="text-lg font-medium">
                  <span className="text-indigo-600 font-semibold">
                    Instructor:{" "}
                  </span>
                  {course?.createdBy ?? "Unknown"}
                </p>
              </div>
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-indigo-600">
                  About This Course
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {course?.description || "No description available."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CourseDescription;
