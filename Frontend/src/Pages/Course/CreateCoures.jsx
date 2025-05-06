import React, { useId, useState } from "react";
import HomeLayout from "../../../Layout/HomeLayout.jsx";
import toast from "react-hot-toast";
import { createNewCourse } from "../../Redux/Slice/CourseSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function createCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    category: "",
    createdBy: "",
    thumbnail: null,
    previewImage: "",
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    console.log("before", value);
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };
  function handleImageUpload(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setUserInput({
          ...userInput,
          previewImage: this.result,
          thumbnail: uploadedImage,
        });
      });
    }
  }
  async function onFormSubmit(e) {
    e.preventDefault();

    if(!userInput.title || !userInput.description || !userInput.category || !userInput.thumbnail || !userInput.createdBy) {
        toast.error("All fields are mandatory");
        return;
    }

    const response = await dispatch(createNewCourse(userInput));
    if(response?.payload?.success) {
        setUserInput({
            title: "",
            category: "",
            createdBy: "",
            description: "",
            thumbnail: null,
            previewImage: ""
        });
        navigate("/courses");
    }
}
  return (
    // <HomeLayout>
    //   <div className="flex items-center justify-center h-[100vh]">
    //     <form
    //       onSubmit={onFormSubmit}
    //       className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative">
    //       {/* <Link className="absolute top-8 text-2xl link text-accent cursor-pointer">
    //                     <AiOutlineArrowLeft />
    //                 </Link> */}

    //       <h1 className="text-center text-2xl font-bold">Create New Course</h1>

    //       <main className="grid grid-cols-2 gap-x-10">
    //         <div className="gap-y-6">
    //           <div>
    //             <label htmlFor="image_uploads" className="cursor-pointer">
    //               {userInput.previewImage ? (
    //                 <img
    //                   className="w-full h-44 m-auto border"
    //                   src={userInput.previewImage}
    //                 />
    //               ) : (
    //                 <div className="w-full h-44 m-auto flex items-center justify-center border">
    //                   <h1 className="font-bold text-lg">
    //                     Upload your course thumbnail
    //                   </h1>
    //                 </div>
    //               )}
    //             </label>
    //             <input
    //               className="hidden"
    //               type="file"
    //               id="image_uploads"
    //               accept=".jpg, .jpeg, .png"
    //               name="image_uploads"
    //               onChange={handleImageUpload}
    //             />
    //           </div>
    //           <div className="flex flex-col gap-1">
    //             <label className="text-lg font-semibold" htmlFor="title">
    //               Course title
    //             </label>
    //             <input
    //               required
    //               type="text"
    //               name="title"
    //               id="title"
    //               placeholder="Enter course title"
    //               className="bg-transparent px-2 py-1 border"
    //               value={userInput.title}
    //               onChange={handleUserInput}
    //             />
    //           </div>
    //         </div>

    //         <div className="flex flex-col gap-1">
    //           <div className="flex flex-col gap-1">
    //             <label className="text-lg font-semibold" htmlFor="createdBy">
    //               Course Instructor
    //             </label>
    //             <input
    //               required
    //               type="text"
    //               name="createdBy"
    //               id="createdBy"
    //               placeholder="Enter course instructor"
    //               className="bg-transparent px-2 py-1 border"
    //               value={userInput.createdBy}
    //               onChange={handleUserInput}
    //             />
    //           </div>

    //           <div className="flex flex-col gap-1">
    //             <label className="text-lg font-semibold" htmlFor="category">
    //               Course category
    //             </label>
    //             <input
    //               required
    //               type="text"
    //               name="category"
    //               id="category"
    //               placeholder="Enter course category"
    //               className="bg-transparent px-2 py-1 border"
    //               value={userInput.category}
    //               onChange={handleUserInput}
    //             />
    //           </div>
    //           <div className="flex flex-col gap-1">
    //             <label className="text-lg font-semibold" htmlFor="description">
    //               Course description
    //             </label>
    //             <textarea
    //               required
    //               type="text"
    //               name="description"
    //               id="description"
    //               placeholder="Enter course description"
    //               className="bg-transparent px-2 py-1 h-24 overflow-y-scroll resize-none border"
    //               value={userInput.description}
    //               onChange={handleUserInput}
    //             />
    //           </div>
    //         </div>
    //       </main>

    //       <button
    //         type="submit"
    //         className="w-full py-2 rounded-sm font-semibold text-lg cursor-pointer bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300">
    //         Create Course
    //       </button>
    //     </form>
    //   </div>
    // </HomeLayout>
    <HomeLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={onFormSubmit}
        className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 space-y-8"
      >
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Create a New Course
        </h1>

        {/* Form Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section: Thumbnail & Title */}
          <div className="space-y-6">
            {/* Thumbnail Upload */}
            <div>
              <label
                htmlFor="image_uploads"
                className="block cursor-pointer w-full"
              >
                {userInput.previewImage ? (
                  <img
                    className="w-full h-48 object-cover rounded-lg border border-gray-300"
                    src={userInput.previewImage}
                    alt="Course Thumbnail Preview"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center text-gray-500">
                    <span className="text-lg font-medium">
                      Upload Course Thumbnail
                    </span>
                  </div>
                )}
              </label>
              <input
                className="hidden"
                type="file"
                id="image_uploads"
                accept=".jpg, .jpeg, .png"
                name="image_uploads"
                onChange={handleImageUpload}
              />
            </div>

            {/* Course Title */}
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700"
              >
                Course Title
              </label>
              <input
                required
                type="text"
                name="title"
                id="title"
                placeholder="Enter course title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={userInput.title}
                onChange={handleUserInput}
              />
            </div>
          </div>

          {/* Right Section: Instructor, Category, Description */}
          <div className="space-y-6">
            {/* Course Instructor */}
            <div className="space-y-2">
              <label
                htmlFor="createdBy"
                className="block text-sm font-semibold text-gray-700"
              >
                Course Instructor
              </label>
              <input
                required
                type="text"
                name="createdBy"
                id="createdBy"
                placeholder="Enter course instructor"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={userInput.createdBy}
                onChange={handleUserInput}
              />
            </div>

            {/* Course Category */}
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-gray-700"
              >
                Course Category
              </label>
              <input
                required
                type="text"
                name="category"
                id="category"
                placeholder="Enter course category"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={userInput.category}
                onChange={handleUserInput}
              />
            </div>

            {/* Course Description */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700"
              >
                Course Description
              </label>
              <textarea
                required
                name="description"
                id="description"
                placeholder="Enter course description"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={userInput.description}
                onChange={handleUserInput}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
        >
          Create Course
        </button>
      </form>
    </div>
    </HomeLayout>
    
  );
}

export default createCourse;
