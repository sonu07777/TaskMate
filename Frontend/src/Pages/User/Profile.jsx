// import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import HomeLayout from "../../../Layout/HomeLayout.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteAccount, getUserData } from "../../Redux/Slice/AuthSlice.js";
import { FaUser, FaShieldAlt } from "react-icons/fa";
import Footer from "../Footer.jsx";
import { cancelCourseBundle } from "../../Redux/Slice/PaymentSlice.js";
import toast from "react-hot-toast";

// import toast from "react-hot-toast";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.auth?.data);
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);
  const handleCancellation = async () => {
    toast("Initiating cancellation");
    await dispatch(cancelCourseBundle());
    await dispatch(getUserData());
    toast.success("Cancellation completed!");
    navigate("/");
  };
  async function onDelete(e) {
    e.preventDefault();

    const response = await dispatch(deleteAccount());
    if (response?.payload?.success) navigate("/signup");
  }

  return (
    <HomeLayout>
      <div className="flex justify-center items-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-[calc(100vh-80px)] w-full max-w-7xl mx-auto  px-4 overflow-x-hidden">
        <div className="w-full max-w-3xl bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-8 border border-gray-100 relative  ">
          {/* Avatar + Header */}
          <div className="flex items-center mb-8 ">
            <div className="relative w-20 h-20 mr-6">
              <img
                src={userData?.avatar?.secure_url}
                alt="Profile"
                className="w-full h-full rounded-full border-4 border-indigo-300 object-cover"
              />
              <Link
                to="/user/editProfile"
                className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1 rounded-full shadow-md hover:bg-indigo-700 transition">
                <FaEdit className="w-4 h-4" />
              </Link>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
              <p className="text-sm text-gray-500">{userData?.email}</p>
            </div>
            {isLoggedIn && (role === "ADMIN" || role === "admin") && (
              <button
                onClick={onDelete}
                className="ml-auto text-red-500 hover:text-red-600 flex items-center gap-1 transition">
                <FaTrash className="w-4 h-4" />
                Delete Account
              </button>
            )}
          </div>

          {/* Info Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Full Name
              </label>
              <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2">
                <span className="text-indigo-500 mr-2">
                  <FaUser />
                </span>
                <input
                  type="text"
                  value={userData?.fullName}
                  readOnly
                  className="w-full outline-none bg-transparent text-gray-700 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Role</label>
              <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2">
                <span className="text-indigo-500 mr-2">
                  <FaShieldAlt />
                </span>
                <input
                  type="text"
                  value={userData?.role}
                  readOnly
                  className="w-full outline-none bg-transparent text-gray-700 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-start flex-wrap">
            <Link
              to="/"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition shadow-sm">
              Home
            </Link>
            <Link
              to="/changePassword"
              className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition shadow-sm">
              Change Password
            </Link>
            <Link
              to="/user/editProfile"
              className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition shadow-sm">
              Edit Profile
            </Link>
            {userData?.subscription?.status === "active" && (
              <button
                onClick={handleCancellation}
                className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center">
                Cancel Subscription
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </HomeLayout>
  );
};

export default ProfilePage;
