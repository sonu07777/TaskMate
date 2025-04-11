import React, { useState } from "react";
// import logo from "../src/assets/capLogo.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../src/Redux/Slice/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // For menu icons

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

    if (res?.payload?.success) navigate("/");
  }

  return (
    // <div className="bg-white">
    //   {/* Navbar */}
    //   <nav className="flex justify-between items-center p-4 md:px-8">
    //     <div className="text-lg font-semibold flex items-center gap-2  w-[150px]">
    //       <img src={logo} alt="Logo" className="" />
    //     </div>
    //     <div className="hidden md:flex gap-6 text-gray-700">
    //       <Link to="/" className="hover:underline">
    //         Home
    //       </Link>
    //       <Link to="/contactUs" className="hover:underline">
    //         Contact Us
    //       </Link>
    //       {isLoggedIn && role === "ADMIN" && (
    //         <Link to="/adminDashboard" className="hover:underline">
    //           Admin Dashboard
    //         </Link>
    //       )}

    //       <Link to="/aboutUs" className="hover:underline">
    //         About us
    //       </Link>

    //         <Link to="/todoPage" className="hover:underline">
    //           TODO
    //         </Link>

    //     </div>
    //     {!isLoggedIn && (
    //       <div className="flex gap-2">
    //         <button className="border border-gray-500 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">
    //           <Link to="/signup"> Sign in</Link>
    //         </button>
    //         <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
    //           <Link to="/login"> Login </Link>
    //         </button>
    //       </div>
    //     )}

    //     {isLoggedIn && (
    //       <div className="flex gap-2">
    //         <button className="border border-gray-500 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">
    //           <Link to="/user/profile">Profile</Link>
    //         </button>
    //         <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
    //           <Link onClick={handelLogout}> Logout </Link>
    //         </button>
    //       </div>
    //     )}
    //   </nav>

    //   {children}
    // </div>
    // <div className="bg-white ">
    //   {/* Navbar */}
    //   <nav className="sticky top-0 z-50 bg-white/30 backdrop-blur-md border-b border-white/20 shadow-sm">
    //     <div className="max-w-7xl w-full mx-auto flex justify-between items-center p-4 md:px-8">
    //       {/* Logo (hidden on small screens) */}
    //       <div className="text-lg font-semibold flex items-center gap-2 w-[150px]  md:block">
    //         <img src={logo} alt="Logo" className="" />
    //       </div>

    //       {/* Menu links (hidden on small screens) */}
    //       <div className="hidden md:flex gap-6 text-gray-700">
    //         <Link to="/" className="hover:underline">
    //           Home
    //         </Link>
    //         <Link to="/contactUs" className="hover:underline">
    //           Contact Us
    //         </Link>
    //         {isLoggedIn && role === "ADMIN" && (
    //           <Link to="/adminDashboard" className="hover:underline">
    //             Admin Dashboard
    //           </Link>
    //         )}
    //         <Link to="/aboutUs" className="hover:underline">
    //           About us
    //         </Link>
    //         <Link to="/todoPage" className="hover:underline">
    //           TODO
    //         </Link>
    //       </div>

    //       {/* Auth buttons (desktop) */}
    //       <div className="hidden md:flex gap-2">
    //         {!isLoggedIn ? (
    //           <>
    //             <button className="border border-gray-500 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">
    //               <Link to="/signup"> Sign in</Link>
    //             </button>
    //             <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
    //               <Link to="/login"> Login </Link>
    //             </button>
    //           </>
    //         ) : (
    //           <>
    //             <button className="border border-gray-500 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">
    //               <Link to="/user/profile">Profile</Link>
    //             </button>
    //             <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
    //               <Link onClick={handelLogout}> Logout </Link>
    //             </button>
    //           </>
    //         )}
    //       </div>

    //       {/* Mobile menu button */}
    //       <div className="md:hidden">
    //         <button onClick={() => setMenuOpen(!menuOpen)}>
    //           {menuOpen ? (
    //             <X className="w-6 h-6" />
    //           ) : (
    //             <Menu className="w-6 h-6" />
    //           )}
    //         </button>
    //       </div>
    //     </div>
    //   </nav>

    //   {/* Mobile Menu Dropdown */}
    //   {menuOpen && (
    //     <div className="md:hidden px-4 pb-4 space-y-3 text-gray-700 absolute bg-white/30 backdrop-blur-md rounded-md shadow-lg z-50 w-full">
    //       <Link
    //         to="/"
    //         className="block hover:underline"
    //         onClick={() => setMenuOpen(false)}>
    //         Home
    //       </Link>
    //       <Link
    //         to="/contactUs"
    //         className="block hover:underline"
    //         onClick={() => setMenuOpen(false)}>
    //         Contact Us
    //       </Link>
    //       {isLoggedIn && role === "ADMIN" && (
    //         <Link
    //           to="/adminDashboard"
    //           className="block hover:underline"
    //           onClick={() => setMenuOpen(false)}>
    //           Admin Dashboard
    //         </Link>
    //       )}
    //       <Link
    //         to="/aboutUs"
    //         className="block hover:underline"
    //         onClick={() => setMenuOpen(false)}>
    //         About us
    //       </Link>
    //       <Link
    //         to="/todoPage"
    //         className="block hover:underline"
    //         onClick={() => setMenuOpen(false)}>
    //         TODO
    //       </Link>

    //       {!isLoggedIn ? (
    //         <div className="flex gap-2">
    //           <Link
    //             to="/signup"
    //             className="block hover:underline border border-gray-500 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 w-[100px]"
    //             onClick={() => setMenuOpen(false)}>
    //             Sign in
    //           </Link>
    //           <Link
    //             to="/login"
    //             className="block hover:underline bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 w-[100px]"
    //             onClick={() => setMenuOpen(false)}>
    //             Login
    //           </Link>
    //         </div>
    //       ) : (
    //         <div className="flex gap-2">
    //           <Link
    //             to="/user/profile"
    //             className="block hover:underline border border-gray-500 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100  w-[100px]"
    //             onClick={() => setMenuOpen(false)}>
    //             Profile
    //           </Link>
    //           <button
    //             onClick={(e) => {
    //               handelLogout(e);
    //               setMenuOpen(false);
    //             }}
    //             className="block text-left  hover:underline bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800  w-[100px]">
    //             Logout
    //           </button>
    //         </div>
    //       )}
    //     </div>
    //   )}

    //   {children}

    //   <Footer/>
    // </div>

    // <div className="bg-white min-h-screen">
    //   {/* Navbar */}
    //   <nav className="sticky top-0 z-50 bg-gradient-to-r from-white/40 to-white/10 backdrop-blur-lg shadow-md border-b border-gray-200 transition-all duration-300">
    //     <div className="max-w-7xl w-full mx-auto flex justify-between items-center px-4 py-3 md:px-8">
    //       {/* Logo */}
    //       <div className="text-2xl font-bold text-indigo-600 flex items-center gap-2 w-[150px] md:block">
    //         {/* <img src={logo} alt="Logo" className="w-8 h-8" /> */}
    //         <span className="md:inline">TaskMate</span>
    //       </div>

    //       {/* Combined Menu and Auth Buttons */}
    //       <div className="hidden md:flex items-center gap-6 text-gray-700 text-sm font-medium ml-auto">
    //         <Link to="/" className="hover:text-indigo-600 transition">
    //           Home
    //         </Link>
    //         <Link to="/contactUs" className="hover:text-indigo-600 transition">
    //           Contact Us
    //         </Link>
    //         {isLoggedIn && role === "ADMIN" && (
    //           <Link
    //             to="/adminDashboard"
    //             className="hover:text-indigo-600 transition">
    //             Admin Dashboard
    //           </Link>
    //         )}
    //         <Link to="/aboutUs" className="hover:text-indigo-600 transition">
    //           About Us
    //         </Link>
    //         <Link to="/todoPage" className="hover:text-indigo-600 transition">
    //           TODO
    //         </Link>

    //         {!isLoggedIn ? (
    //           <>
    //             <Link
    //               to="/signup"
    //               className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition">
    //               Sign in
    //             </Link>
    //             <Link
    //               to="/login"
    //               className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
    //               Login
    //             </Link>
    //           </>
    //         ) : (
    //           <>
    //             <Link
    //               to="/user/profile"
    //               className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition">
    //               Profile
    //             </Link>
    //             <button
    //               onClick={handelLogout}
    //               className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
    //               Logout
    //             </button>
    //           </>
    //         )}
    //       </div>

    //       {/* Mobile Menu Toggle */}
    //       <div className="md:hidden">
    //         <button onClick={() => setMenuOpen(!menuOpen)}>
    //           {menuOpen ? (
    //             <X className="w-6 h-6 text-indigo-600" />
    //           ) : (
    //             <Menu className="w-6 h-6 text-indigo-600" />
    //           )}
    //         </button>
    //       </div>
    //     </div>
    //   </nav>

    //   {/* Mobile Dropdown Menu */}
    //   {menuOpen && (
    //     <div className="md:hidden px-4 py-4 bg-white/50 backdrop-blur-lg shadow-lg border border-gray-200 rounded-md absolute top-[72px] left-0 right-0 z-40 mx-4 animate-fade-in">
    //       <div className="space-y-3 text-sm text-gray-700">
    //         <Link
    //           to="/"
    //           onClick={() => setMenuOpen(false)}
    //           className="block hover:text-indigo-600">
    //           Home
    //         </Link>
    //         <Link
    //           to="/contactUs"
    //           onClick={() => setMenuOpen(false)}
    //           className="block hover:text-indigo-600">
    //           Contact Us
    //         </Link>
    //         {isLoggedIn && role === "ADMIN" && (
    //           <Link
    //             to="/adminDashboard"
    //             onClick={() => setMenuOpen(false)}
    //             className="block hover:text-indigo-600">
    //             Admin Dashboard
    //           </Link>
    //         )}
    //         <Link
    //           to="/aboutUs"
    //           onClick={() => setMenuOpen(false)}
    //           className="block hover:text-indigo-600">
    //           About Us
    //         </Link>
    //         <Link
    //           to="/todoPage"
    //           onClick={() => setMenuOpen(false)}
    //           className="block hover:text-indigo-600">
    //           TODO
    //         </Link>

    //         {!isLoggedIn ? (
    //           <div className="flex gap-2 pt-4">
    //             <Link
    //               to="/signup"
    //               onClick={() => setMenuOpen(false)}
    //               className="flex-1 text-center border border-indigo-600 text-indigo-600 rounded-md py-2 hover:bg-indigo-50">
    //               Sign in
    //             </Link>
    //             <Link
    //               to="/login"
    //               onClick={() => setMenuOpen(false)}
    //               className="flex-1 text-center bg-indigo-600 text-white rounded-md py-2 hover:bg-indigo-700">
    //               Login
    //             </Link>
    //           </div>
    //         ) : (
    //           <div className="flex gap-2 pt-4">
    //             <Link
    //               to="/user/profile"
    //               onClick={() => setMenuOpen(false)}
    //               className="flex-1 text-center border border-indigo-600 text-indigo-600 rounded-md py-2 hover:bg-indigo-50">
    //               Profile
    //             </Link>
    //             <button
    //               onClick={(e) => {
    //                 handelLogout(e);
    //                 setMenuOpen(false);
    //               }}
    //               className="flex-1 text-center bg-indigo-600 text-white rounded-md py-2 hover:bg-indigo-700">
    //               Logout
    //             </button>
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   )}

    //   {children}

    //   <Footer />
    // </div>
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
            <Link to="/contactUs" className="hover:text-indigo-600 transition">
              Contact Us
            </Link>
            {isLoggedIn && role === "ADMIN" && (
              <Link
                to="/adminDashboard"
                className="hover:text-indigo-600 transition">
                Admin Dashboard
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
            <Link
              to="/contactUs"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-indigo-600">
              Contact Us
            </Link>
            {isLoggedIn && role === "ADMIN" && (
              <Link
                to="/adminDashboard"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-indigo-600">
                Admin Dashboard
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
