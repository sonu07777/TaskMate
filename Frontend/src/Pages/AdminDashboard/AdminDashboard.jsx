// src/pages/AllUsers.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchAllUsers } from "../redux/userSlice";
// import axiosInstance from "../utils/axios"; // make sure withCredentials is set
import toast from "react-hot-toast";
import { fetchAllUsers } from "../../Redux/Slice/AdminSlice.js";
import axiosInstance from "../../AxiosInstance/authAxio.js";
import LandingPage from "../../../Layout/HomeLayout.jsx";
import { deleteCourse, getAllCourse } from "../../Redux/Slice/CourseSlice.js";
import { BsTrash } from "react-icons/bs";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.admin);

  const [updatingUserId, setUpdatingUserId] = useState(null);
  const myCourses = useSelector((state) => state?.course?.courseData);
  const onCourseDelete = async (id) => {
    if (!id) {
      console.error("Course ID is undefined");
      return;
    }
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        const res = await dispatch(deleteCourse(id));
        if (res?.payload?.success) {
          await dispatch(getAllCourse());
        }
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(getAllCourse());
  }, [dispatch]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      setUpdatingUserId(userId);
      const res = await axiosInstance.put(
        `/api/v1/admin/updateRole/${userId}`,
        {
          role: newRole,
        }
      );
      toast.success(res?.data?.message || "Role updated successfully");
      dispatch(fetchAllUsers()); // refresh the list
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update role");
    } finally {
      setUpdatingUserId(null);
    }
  };

  return (
    <LandingPage>
      {/* <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">
          🛠️ Admin Dashboard – Manage Users
        </h2>

        {loading && <p>Loading users...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <div className="overflow-x-auto shadow rounded-lg">
            <table className="min-w-full bg-white border border-gray-200 text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-3 border">#</th>
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Email</th>
                  <th className="p-3 border">Role</th>
                  <th className="p-3 border">Change Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="p-3 border">{i + 1}</td>
                    <td className="p-3 border">{user.fullName}</td>
                    <td className="p-3 border">{user.email}</td>
                    <td className="p-3 border font-medium">{user.role}</td>
                    <td className="p-3 border">
                      <select
                        value={user.role}
                        disabled={updatingUserId === user._id}
                        onChange={(e) =>
                          handleRoleChange(user._id, e.target.value)
                        }
                        className="border px-2 py-1 rounded focus:outline-none">
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div> */}
      <div className="p-6 max-w-full mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          🛠️ Admin Dashboard – Manage Users
        </h2>

        {loading && <p>Loading users...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {users.length === 0 ? (
          <p className="text-center">No users found.</p>
        ) : (
          <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-4">
            <table className="min-w-full table-auto bg-white border border-gray-200 text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-3 border">#</th>
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Email</th>
                  <th className="p-3 border">Role</th>
                  <th className="p-3 border">Change Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 transition-colors">
                    <td className="p-3 border">{i + 1}</td>
                    <td className="p-3 border">{user.fullName}</td>
                    <td className="p-3 border">{user.email}</td>
                    <td className="p-3 border font-medium">{user.role}</td>
                    <td className="p-3 border">
                      <select
                        value={user.role}
                        disabled={updatingUserId === user._id}
                        onChange={(e) =>
                          handleRoleChange(user._id, e.target.value)
                        }
                        className="border px-2 py-1 rounded focus:outline-none w-full md:w-auto">
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900">
        📚 Manage Courses
      </h2>

      {loading && (
        <p className="text-center text-gray-600">Loading courses...</p>
      )}
      {/* {courseError && <p className="text-red-500 text-center">{courseError}</p>} */}

      {myCourses.length === 0 && !loading ? (
        <p className="text-center text-gray-600">No courses found.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-4">
          <table className="min-w-full table-auto bg-white border border-gray-200 text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3 border">#</th>
                <th className="p-3 border">Title</th>
                <th className="p-3 border">Category</th>
                <th className="p-3 border"> Instructor</th>
                <th className="p-3 border">Lectures</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {myCourses.map((course, i) => (
                <tr
                  key={course._id}
                  className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 border">{i + 1}</td>
                  <td className="p-3 border">{course.title || "Untitled"}</td>
                  <td className="p-3 border">{course.category || "General"}</td>
                  <td className="p-3 border">
                    {course.createdBy || "Unknown"}
                  </td>
                  <td className="p-3 border">
                    {course.numbersOfLectures ?? "N/A"}
                  </td>
                  <td className="p-3 border">
                    <button
                      onClick={() => onCourseDelete(course._id)}
                      className="text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-100 transition-colors"
                      aria-label={`Delete course ${
                        course.title || "Untitled"
                      }`}>
                      <BsTrash className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </LandingPage>
  );
};

export default AllUsers;
