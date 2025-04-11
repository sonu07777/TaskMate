// import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import HomeLayout from "../../../Layout/HomeLayout.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteAccount } from "../../Redux/Slice/AuthSlice.js";
import { FaUser, FaShieldAlt } from "react-icons/fa";
import Footer from "../Footer.jsx";

// import toast from "react-hot-toast";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.auth?.data);
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);
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
            {isLoggedIn && role === "ADMIN" && (
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
          </div>
        </div>
      </div>
      <Footer/>
    </HomeLayout>
  );
};

export default ProfilePage;

{
  /* <div className="flex justify-center items-center  bg-white p-4  h-full">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
          <div className="flex items-center gap-4 mb-6 border-b pb-4">
            <div className="relative w-16 h-16">
              <img
                src={userData?.avatar?.secure_url}
                alt="Profile"
                className="w-16 h-16 rounded-full border "
              />
              <Link
                to="/user/editProfile"
                className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md">
                <FaEdit className="text-gray-600" />
              </Link>
            </div>
            <h2 className="text-xl font-semibold">My Profile</h2>
            {isLoggedIn && role == "ADMIN" && (
              <button onClick={onDelete} className="ml-auto text-red-500 flex items-center gap-1 hover:text-red-600 cursor-pointer">
                <FaTrash /> Delete Account
              </button>
            )}
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 text-sm">Full Name</label>
              <input
                type="text"
                value={userData?.fullName}
                className="w-full p-2 border rounded-md cursor-not-allowed outline-none"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm">Role</label>
              <input
                type="text"
                value={userData?.role}
                className="w-full p-2 border rounded-md  cursor-not-allowed outline-none"
                readOnly
              />
            </div>
            <div className="col-span-2">
              <label className="block text-gray-600 text-sm">Email</label>
              <input
                type="email"
                value={userData?.email}
                readOnly
                className="w-full p-2 border rounded-md  cursor-not-allowed outline-none"
              />
            </div>

            <div className="col-span-2 flex justify-start gap-2">
              <Link
                to="/"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                Go Back
              </Link>
              <Link
                to="/changePassword"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                  change Password
              </Link>
              <Link
                to="/user/editProfile"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                 Edit Profile
              </Link>
            </div>
            <div className="col-span-2 flex justify-start">
             
            </div>
          </form>
        </div>
      </div> */
}
{
  /* <div className="flex justify-center items-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen border border-amber-950"> */
}
