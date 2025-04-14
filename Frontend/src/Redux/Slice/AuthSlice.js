import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../AxiosInstance/authAxio.js";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  // data:
  //   localStorage.getItem("data") !== undefined
  //     ? JSON.parse(localStorage.getItem("data"))
  //     : {},
  // data: localStorage.getItem("data")
  //   ? JSON.parse(localStorage.getItem("data"))
  //   : {},
  data: JSON.parse(localStorage.getItem("data") || "{}"),
};
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = axiosInstance.post("/api/v1/user/register", data);
    toast.promise(res, {
      loading: "wait creating account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "failed to load todo",
    });
    return (await res).data;
  } catch (error) {
    console.log(error);
  }
});

export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    const res = axiosInstance.post("/api/v1/user/login", data);
    // console.log(res);

    toast.promise(res, {
      loading: "Wait! authentication in progress...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to log in",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const res = axiosInstance.post("/api/v1/user/logout");
    // console.log("the response is :- ", res);
    // console.log("data is :- ",(await res).data);
    // console.log("message is :", (await res).data.message);

    toast.promise(res, {
      loading: "Wait! logout in progress...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to log out",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});
export const getUserData = createAsyncThunk("/user/details", async () => {
  try {
    const res = axiosInstance.get("/api/v1/user/profile");
    console.log(res);

    toast.promise(res, {
      loading: "profile update successfully",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to update profile ",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error.message);
  }
});
export const updateProfile = createAsyncThunk(
  "/user/update/profile",
  async (data) => {
    try {
      const res = axiosInstance.put(
        `/api/v1/user/updateProfile/${data[0]}`,
        data[1]
      );
      // console.log("the response is :- ", data[0] + "and second is" + data[1]);
      // console.log("data is :- ",(await res).data);
      // console.log("message is :", (await res).data.message);

      toast.promise(res, {
        loading: "Wait! profile update in progress...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to profile update",
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);
export const deleteAccount = createAsyncThunk("/user/delete", async () => {
  try {
    const res = axiosInstance.delete("/api/v1/user/delete");
    console.log(res);
    toast.promise(res, {
      loading: "Deleting account...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to delete account",
    });

    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const contact_us = createAsyncThunk("/user/contact_Us", async (data) => {
  try {
    const res = axiosInstance.post("/api/v1/contact/contactUs", data);
    console.log(res);
    toast.promise(res, {
      loading: "sending..",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to send the mail...",
    });

    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const forgot = createAsyncThunk("/auth/forgetPassword", async (data) => {
  try {
    const res = axiosInstance.post("/api/v1/user/forgetPassword", data);
    // console.log("the response is ", res);
    toast.promise(res, {
      loading: "Wait! message sent in progress...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to send the mail",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const reset_Password = createAsyncThunk(
  "/auth/resetPassword",
  async (data) => {
    try {
      const res = axiosInstance.post(`/api/v1/user/reset/${data[0]}`, data[1]);
      console.log("the response is :- ", data[0] + "  and second is" + data[1]);
      console.log("the response of response is", res);

      toast.promise(res, {
        loading: "Wait! in progress...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to set the new password",
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "/auth/user/passwordChange",
  async (data) => {
    try {
      const res = axiosInstance.post(`/api/v1/user/changePassword`, data);
      // console.log("the response is :- ", data[0] + "and second is" + data[1]);
      // console.log("data is :- ",(await res).data);
      // console.log("message is :", (await res).data.message);

      toast.promise(res, {
        loading: "Wait! Password changing in progress...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to  update ...",
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const authSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        console.log(state);
        localStorage.setItem("data", JSON.stringify(action?.payload?.User));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.User?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.User;
        state.role = action?.payload?.User?.role;
      })
      .addCase(logout.fulfilled, (state) => {
        // console.log(state);
        localStorage.clear();
        state.data = {};
        state.isLoggedIn = false;
        state.role = "";
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        console.log(state);
        if (!action?.payload?.User) return;
        localStorage.setItem("data", JSON.stringify(action?.payload?.User));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.User?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.User;
        state.role = action?.payload?.User?.role;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        localStorage.clear();
        state.data = {};
        state.isLoggedIn = false;
        state.role = "";
        toast.success("Account deleted successfully!");
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
