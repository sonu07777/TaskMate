import React from "react";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../../Layout/HomeLayout.jsx";
import { addCourseLecture } from "../../Redux/Slice/LecturesSlice.js";

function AddLecture() {
  const courseDetails = useLocation().state;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    id: courseDetails?._id,
    lecture: undefined,
    title: "",
    description: "",
    videoSrc: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  function handleVideo(e) {
    const video = e.target.files[0];
    const source = window.URL.createObjectURL(video);
    console.log(source);
    setUserInput({
      ...userInput,
      lecture: video,
      videoSrc: source,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!userInput.lecture || !userInput.title || !userInput.description) {
      toast.error("All fields are mandatory");
      return;
    }
    const response = await dispatch(addCourseLecture(userInput));
    if (response?.payload?.success) {
      navigate(-1);
      setUserInput({
        id: courseDetails?._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: "",
      });
    }
  }

  useEffect(() => {
    if (!courseDetails) navigate("/courses");
  }, []);

  return (
    <HomeLayout>
      {/* <div className="min-h-[90vh] text-white flex flex-col items-center justify-center gap-10 mx-16">
        <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
          <header className="flex items-center justify-center relative">
            <button
              className="absolute left-2 text-xl text-green-500"
              onClick={() => navigate(-1)}>
              <AiOutlineArrowLeft />
            </button>
            <h1 className="text-xl text-yellow-500 font-semibold">
              Add new lecture
            </h1>
          </header>
          <form onSubmit={onFormSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              name="title"
              placeholder="enter the title of the lecture"
              onChange={handleInputChange}
              className="bg-transparent px-3 py-1 border"
              value={userInput.title}
            />
            <textarea
              type="text"
              name="description"
              placeholder="enter the description of the lecture"
              onChange={handleInputChange}
              className="bg-transparent px-3 py-1 border resize-none overflow-y-scroll h-36"
              value={userInput.description}
            />
            {userInput.videoSrc ? (
              <video
                muted
                src={userInput.videoSrc}
                controls
                controlsList="nodownload nofullscreen"
                disablePictureInPicture
                className="object-fill rounded-tl-lg rounded-tr-lg w-full"></video>
            ) : (
              <div className="h-48 border flex items-center justify-center cursor-pointer">
                <label
                  className="font-semibold text-cl cursor-pointer"
                  htmlFor="lecture">
                  Choose your video
                </label>
                <input
                  type="file"
                  className="hidden"
                  id="lecture"
                  name="lecture"
                  onChange={handleVideo}
                  accept="video/mp4 video/x-mp4 video/*"
                />
              </div>
            )}
            <button
              type="submit"
              className="btn btn-primary py-1 font-semibold text-lg">
              Add new Lecture
            </button>
          </form>
        </div>
      </div> */}
      <div className="min-h-[90vh] text-white flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-xl bg-[#1e1e1e] shadow-[0_0_15px_rgba(0,0,0,0.5)] rounded-2xl p-6 space-y-6">
          {/* Header */}
          <header className="relative flex items-center justify-center pb-2 border-b border-gray-700">
            <button
              className="absolute left-0 text-2xl text-green-500"
              onClick={() => navigate(-1)}>
              <AiOutlineArrowLeft />
            </button>
            <h1 className="text-xl sm:text-2xl text-yellow-500 font-bold">
              Add new lecture
            </h1>
          </header>

          {/* Form */}
          <form onSubmit={onFormSubmit} className="flex flex-col gap-4">
            {/* Title Input */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-300">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter the title of the lecture"
                onChange={handleInputChange}
                className="bg-transparent border border-gray-600 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
                value={userInput.title}
              />
            </div>

            {/* Description Textarea */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-300">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Enter the description of the lecture"
                onChange={handleInputChange}
                className="bg-transparent border border-gray-600 rounded-md px-4 py-2 text-sm h-36 resize-none overflow-y-auto focus:outline-none focus:ring-1 focus:ring-yellow-500"
                value={userInput.description}
              />
            </div>

            {/* Video Preview / Upload */}
            {userInput.videoSrc ? (
              <video
                muted
                src={userInput.videoSrc}
                controls
                controlsList="nodownload nofullscreen"
                disablePictureInPicture
                className="rounded-lg w-full h-48 object-cover"></video>
            ) : (
              <div className="h-48 border border-gray-600 rounded-lg flex items-center justify-center cursor-pointer">
                <label
                  htmlFor="lecture"
                  className="text-sm font-semibold text-yellow-500 cursor-pointer">
                  Choose your video
                </label>
                <input
                  type="file"
                  id="lecture"
                  name="lecture"
                  onChange={handleVideo}
                  accept="video/mp4,video/x-mp4,video/*"
                  className="hidden"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full py-2 font-semibold text-lg rounded-md hover:bg-yellow-600 transition">
              Add new Lecture
            </button>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AddLecture;
