// import { useState } from 'react'
import LandingPage from "../Layout/HomeLayout";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/signUp";
import HomePage from "./Pages/HomePage.jsx";
import Profile from "./Pages/User/Profile.jsx";
import RequireAuth from "./Component/Auth/AuthenticationUser.jsx";
import EditProfile from "./Pages/User/EditProfile.jsx";
import ContactUs from "./Pages/ContactUs.jsx";
import AboutUs from "./Pages/AboutUs.jsx";
import ForgetPassword from "./Pages/ForgetPassword.jsx";
import ResetPassword from "./Pages/ResetPassword.jsx";
import ChangePassword from "./Pages/User/ChangePassword.jsx"
import NotFoundPage from "./Pages/NotFoundPage.jsx"
import DeniedPage from "./Pages/DeniedPage.jsx"
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard.jsx";
import TodoPage from "./Pages/Todo/todoPage.jsx";
import AllTaskPage from "./Pages/Todo/AllTaskPage.jsx"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/contactUs" element={<ContactUs />}></Route>
        <Route path="/aboutUs" element={<AboutUs />}></Route>
        <Route path="/forgetPassword" element={<ForgetPassword />}></Route>
        <Route path="/resetPassword/:token" element={<ResetPassword />}></Route>
        <Route path="/denied" element={<DeniedPage/>}></Route>

        <Route
          element={
            <RequireAuth allowedRoles={["ADMIN", "user", "admin", "USER"]} />
          }>
          <Route path="/user/profile" element={<Profile />}></Route>
          <Route path="/user/editProfile" element={<EditProfile />}></Route>
          <Route path="/changePassword" element={<ChangePassword />}></Route>
          <Route path="/todoPage" element={<TodoPage />}></Route>
          <Route path="/allTask/:titleId" element={<AllTaskPage />}></Route>
        </Route>
        <Route
          element={
            <RequireAuth allowedRoles={["ADMIN","admin"]} />
          }>
          
          <Route path="/adminDashboard" element={<AdminDashboard />}></Route>
        </Route>

        <Route path="*" element={<NotFoundPage/>}></Route>
      </Routes>
    </>
  );
}
export default App;
