import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgot } from "../Redux/Slice/AuthSlice.js";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [Email, setEmail] = useState({ email: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleUserInput(e) {
    const { name, value } = e.target;
    setEmail({
      ...Email,
      [name]: value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Email.email) {
      toast.error("Please fill all the details");
      return;
    }
    const response = await dispatch(forgot(Email));
    console.log("Reset link sent to:", response);
    if (response?.payload?.success) {
      // navigate("/resetPassword", {
      //   state: { resetToken: response.payload.resetToken },
      // });
      navigate(`/resetPassword/${response.payload.resetToken}`);
      // navigate(`/login`);
      
      
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Forgot Password
        </h2>
        <p className="text-gray-600 text-center mt-2">
          Enter your email to reset your password
        </p>
        <form onSubmit={handleSubmit} noValidate className="mt-6">
          <label className="block text-gray-700 font-medium">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={Email.email}
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
