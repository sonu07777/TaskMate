import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import HomeLayout from "../../../Layout/HomeLayout.jsx";
import { changePassword } from "../../Redux/Slice/AuthSlice.js";

const ForgotPassword = () => {
  const [values, setValue] = useState({ oldPassword: "",newPassword:"" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleUserInput(e) {
    const { name, value } = e.target;
    setValue({
      ...values,
      [name]: value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.oldPassword ||!values.newPassword) {
      toast.error("please enter both the filed");
      return;
    }
    const response = await dispatch(changePassword(values));
    console.log("Reset link sent to:", response);
    if (response?.payload?.success) {
      // navigate("/resetPassword", {
      //   state: { resetToken: response.payload.resetToken },
      // });
      navigate(`/user/profile`);
      // navigate(`/login`);
    }
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Forgot Password
          </h2>
          <p className="text-gray-600 text-center mt-2">
            Enter your Old and new Password to reset your password
          </p>
          <form onSubmit={handleSubmit} noValidate className="mt-6">
            <label className="block text-gray-700 font-medium">
             Old Password
            </label>
            <input
              type="password"
              placeholder="Enter your oldPassword"
              name="oldPassword"
              value={values.oldPassword}
              onChange={handleUserInput}
              required
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block text-gray-700 font-medium">
             Old Password
            </label>
            <input
              type="password"
              placeholder="Enter your newPassword"
              name="newPassword"
              value={values.newPassword}
              onChange={handleUserInput}
              required
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 mt-4 rounded-md transition duration-300">
             Submit
            </button>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
};

export default ForgotPassword;
