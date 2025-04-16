// src/pages/AllUsers.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchAllUsers } from "../redux/userSlice";
// import axiosInstance from "../utils/axios"; // make sure withCredentials is set
import toast from "react-hot-toast";
import { fetchAllUsers } from "../../Redux/Slice/AdminSlice.js";
import axiosInstance from "../../AxiosInstance/authAxio.js";
import LandingPage from "../../../Layout/HomeLayout.jsx";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.admin);

  const [updatingUserId, setUpdatingUserId] = useState(null);

  useEffect(() => {
    dispatch(fetchAllUsers());
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
      <div className="p-6">
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
      </div>
    </LandingPage>
  );
};

export default AllUsers;
