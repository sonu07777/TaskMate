import User from "../Schema/User.schema.js";

const getAllUsers = async (req, res) => {
  try {
    // Optional: Only allow admins to access this
    if (req.user?.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }

    // Fetch all users, exclude sensitive fields
    const users = await User.find().select("-password -__v");
    console.log(users);

    res.status(200).json({
      success: true,
      message: "All users fetched successfully",
      total: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
};
// PUT /api/v1/user/updateRole/:id
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const { id } = req.params;

    if (!["admin", "user"].includes(role)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid role value" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: `User role updated to ${role}`,
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating user role",
      error: error.message,
    });
  }
};

export { updateUserRole, getAllUsers };
