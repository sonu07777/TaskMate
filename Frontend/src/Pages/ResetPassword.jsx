import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {reset_Password } from "../Redux/Slice/AuthSlice.js";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [Password, setPassword] = useState({ password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  // console.log("Reset Token:", token);

  function handleUserInput(e) {
    const { name, value } = e.target;
    setPassword({
      ...Password,
      [name]: value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Password.password) {
      toast.error("Please fill all the details");
      return;
    }
    const response = await dispatch(reset_Password([token,Password]));
    if (response?.payload?.success) navigate("/login");
    setPassword({
        password: "",
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Forgot Password
        </h2>
        <p className="text-gray-600 text-center mt-2">
          Enter your Password to reset your password
        </p>
        <form onSubmit={handleSubmit} noValidate className="mt-6">
          <label className="block text-gray-700 font-medium">
           New Password
          </label>
          <input
            type="password"
            placeholder="Enter your Password"
            name="password"
            value={Password.password}
            onChange={handleUserInput}
            required
            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 mt-4 rounded-md transition duration-300">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
