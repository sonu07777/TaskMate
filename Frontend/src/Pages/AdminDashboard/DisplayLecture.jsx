import React, { useEffect, useState } from "react";
import HomeLayout from "../../../Layout/HomeLayout.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCourseLecture,
  getCourseLectures,
} from "../../Redux/Slice/LecturesSlice.js";

function displayLecture() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);

  // console.log("the display lecture is ", state);
  // console.log("the display lecture is ", lectures);

  const [currentVideo, setCurrentVideo] = useState(0);

  async function onLectureDelete(courseId, lectureId) {
    console.log("the course id is ", courseId, lectureId);
    await dispatch(
      deleteCourseLecture({ courseId: courseId, lectureId: lectureId })
    );
    await dispatch(getCourseLectures(courseId));
  }

  useEffect(() => {
    // console.log(state);
    if (!state) navigate("/course");
    dispatch(getCourseLectures(state._id));
  }, []);
  return (
    <HomeLayout>
      <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Course Title */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400">
              Course: {state?.title || "Loading..."}
            </h1>
          </div>

          {lectures && lectures.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Video Player Section */}
              <div className="lg:col-span-2 bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <video
                    src={lectures[currentVideo]?.lecture?.secure_url}
                    className="w-full h-full object-cover"
                    controls
                    disablePictureInPicture
                    muted
                    controlsList="nodownload"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold text-yellow-400">
                    {lectures[currentVideo]?.title}
                  </h2>
                  <p className="text-gray-300 line-clamp-3">
                    {lectures[currentVideo]?.description}
                  </p>
                </div>
              </div>

              {/* Lectures List Section */}
              <div className="bg-gray-800 rounded-xl shadow-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-yellow-400">
                    Lectures
                  </h2>
                  {role?.toUpperCase() === "ADMIN" && (
                    <button
                      onClick={() =>
                        navigate("/course/addlecture", { state: { ...state } })
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Add Lecture
                    </button>
                  )}
                </div>
                <ul className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                  {lectures.map((lecture, idx) => (
                    <li
                      key={lecture._id}
                      className={`p-4 rounded-lg cursor-pointer transition-colors ${
                        currentVideo === idx
                          ? "bg-gray-700"
                          : "hover:bg-gray-700"
                      }`}
                      onClick={() => setCurrentVideo(idx)}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">
                            Lecture {idx + 1}: {lecture.title}
                          </p>
                        </div>
                        {role?.toUpperCase() === "ADMIN" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onLectureDelete(state?._id, lecture._id);
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors">
                            Delete
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center">
              {role?.toUpperCase() === "ADMIN" ? (
                <button
                  onClick={() =>
                    navigate("/course/addlecture", { state: { ...state } })
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors">
                  Add New Lecture
                </button>
              ) : (
                <p className="text-gray-400">
                  No lectures available for this course.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </HomeLayout>
  );
}

export default displayLecture;
