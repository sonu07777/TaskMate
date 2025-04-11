import React, { useState } from "react";
import HomeLayout from "../../../Layout/HomeLayout.jsx";
import { FaEdit, FaTrash } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { deleteAccount, getUserData, updateProfile } from "../../Redux/Slice/AuthSlice.js";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

function EditProfile() {
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    previewImage: "",
    fullName: "",
    avatar: "",
    userId: useSelector((state) => state?.auth?.data?._id),
  });

  function handleImageUpload(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setData({
          ...data,
          previewImage: this.result,
          avatar: uploadedImage,
        });
      });
    }
  }
  function handleInputChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }
  async function onDelete(e) {
    e.preventDefault();
    
      const response = await dispatch(deleteAccount())
      if(response?.payload?.success)  navigate("/signup");
  
  }
  async function onFormSubmit(e) {
    e.preventDefault();
    if (!data.fullName || !data.avatar) {
      toast.error("All fields are mandatory");
      return;
    }
    if (data.fullName.length < 5) {
      toast.error("Name cannot be of less than 5 characters");
      return;
    }
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("avatar", data.avatar);
    // console.log("the full name ", formData);
    console.log("the avatar ", formData.entries().next());
    await dispatch(updateProfile([data.userId, formData]));
    // if (result?.success) {
    //   toast.success("Profile updated successfully");
    // } else {
    //   toast.error("Failed to update profile");
    // }
    const result = await dispatch(getUserData());
    if (result) {
      navigate("/user/profile");
    } else {
      navigate("/denied");
    }
  }

  return (
    <div>
      <HomeLayout>
        <div className="flex justify-center items-center  bg-white p-4  h-full">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
            {/* Profile Header */}

            {/* Profile Form */}
            <form
              className="flex flex-col justify-evenly "
              onSubmit={onFormSubmit}
              noValidate
              >
              <div className="flex items-center gap-4 mb-6 border-b pb-4">
                <div className="relative w-16 h-16">
                  <label className="cursor-pointer" htmlFor="image_uploads">
                    {data.previewImage ? (
                      <img
                        src={data.previewImage}
                        alt="Profile"
                        className="w-16 h-16 rounded-full border"
                      />
                    ) : (
                      <BsPersonCircle className="w-16 h-16 rounded-full " />
                    )}
                  </label>
                  <input
                    onChange={handleImageUpload}
                    className="hidden"
                    type="file"
                    id="image_uploads"
                    name="image_uploads"
                    accept=".jpg, .png, .svg, .jpeg"
                  />
                </div>
                
                <h2 className="text-xl font-semibold cursor-pointer" htmlFor="image_uploads"> ⬅️Upload Profile</h2>
                {isLoggedIn && role == "ADMIN" && (
                  <button onClick={onDelete} className="ml-auto text-red-500 flex items-center gap-1 hover:text-red-600 cursor-pointer">
                    <FaTrash /> Delete Account
                  </button>
                )}
              </div>
              <div>
                <label className="block text-gray-600 text-sm w-full">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Enter your name"
                  value={data.fullName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div className="flex mt-8 justify-start items-center gap-3">
                <Link to="/user/profile">
                  <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                    <AiOutlineArrowLeft /> Go back to profile
                  </p>
                </Link>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </HomeLayout>
    </div>
  );
}

export default EditProfile;
