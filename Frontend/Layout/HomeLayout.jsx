import React, { useState } from "react";
// import logo from "../src/assets/capLogo.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../src/Redux/Slice/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // For menu icons
import { resetTodoState } from "../src/Redux/Slice/TodoSlice";

const LandingPage = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);
  // console.log(isLoggedIn,role);

  async function handelLogout(e) {
    e.preventDefault();
    const res = await dispatch(logout());
    // console.log(res);

    // if (res?.payload?.success) navigate("/");

    if (res?.payload?.success) {
      dispatch(resetTodoState()); // 🧼 clear old todos from Redux & localStorage
      navigate("/"); // 🔁 redirect to home or login
    }
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-white/40 to-white/10 backdrop-blur-lg shadow-md border-b border-gray-200 transition-all duration-300">
        <div className="max-w-7xl w-full mx-auto flex justify-between items-center px-4 py-3 md:px-8">
          {/* Logo */}
          <div className="text-2xl font-bold text-indigo-600 flex items-center gap-2 w-[150px] md:block">
            <span className="md:inline">TaskMate</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 text-gray-700 text-sm font-medium ml-auto">
            <Link to="/" className="hover:text-indigo-600 transition">
              Home
            </Link>
            <Link to="/courses" className="hover:text-indigo-600 transition">
              All Courses
            </Link>
            <Link to="/contactUs" className="hover:text-indigo-600 transition">
              Contact Us
            </Link>
            {isLoggedIn && (role === "ADMIN" || role === "admin") && (
              <Link
                to="/adminDashboard"
                className="hover:text-indigo-600 transition">
                Admin Dashboard
              </Link>
            )}
            {isLoggedIn && (role === "ADMIN" || role === "admin") && (
              <Link
                to="/course/create"
                className="hover:text-indigo-600 transition">
                Create new course
              </Link>
            )}
            <Link to="/aboutUs" className="hover:text-indigo-600 transition">
              About Us
            </Link>
            <Link to="/todoPage" className="hover:text-indigo-600 transition">
              TODO
            </Link>

            {!isLoggedIn ? (
              <>
                <Link
                  to="/signup"
                  className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition">
                  Sign in
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                  Login
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/user/profile"
                  className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition">
                  Profile
                </Link>
                <button
                  onClick={handelLogout}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu">
              {menuOpen ? (
                <X className="w-6 h-6 text-indigo-600" />
              ) : (
                <Menu className="w-6 h-6 text-indigo-600" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 py-4 bg-white/70 backdrop-blur-lg shadow-lg border border-gray-200 rounded-md fixed top-[72px] left-4 right-4 z-40 animate-fade-in transition-all">
          <div className="space-y-3 text-sm text-gray-700">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-indigo-600">
              Home
            </Link>
            <Link to="/courses" className="hover:text-indigo-600 transition">
              All Courses
            </Link>
            <Link
              to="/contactUs"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-indigo-600">
              Contact Us
            </Link>
            {isLoggedIn && (role === "ADMIN" || role === "admin") && (
              <Link
                to="/adminDashboard"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-indigo-600">
                Admin Dashboard
              </Link>
            )}
            {isLoggedIn && (role === "ADMIN" || role === "admin") && (
              <Link
                to="/course/create"
                className="block hover:text-indigo-600">
                Create new course
              </Link>
            )}
            <Link
              to="/aboutUs"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-indigo-600">
              About Us
            </Link>
            <Link
              to="/todoPage"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-indigo-600">
              TODO
            </Link>

            {!isLoggedIn ? (
              <div className="flex flex-col gap-2 pt-4">
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center border border-indigo-600 text-indigo-600 rounded-md py-2 hover:bg-indigo-50">
                  Sign in
                </Link>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center bg-indigo-600 text-white rounded-md py-2 hover:bg-indigo-700">
                  Login
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-4">
                <Link
                  to="/user/profile"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center border border-indigo-600 text-indigo-600 rounded-md py-2 hover:bg-indigo-50">
                  Profile
                </Link>
                <button
                  onClick={(e) => {
                    handelLogout(e);
                    setMenuOpen(false);
                  }}
                  className="w-full text-center bg-indigo-600 text-white rounded-md py-2 hover:bg-indigo-700">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="mt-4 ">{children}</div>
    </div>
  );
};

export default LandingPage;
