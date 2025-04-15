import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../AxiosInstance/authAxio.js";

const initialState = {
  // allTodo: JSON.parse(localStorage.getItem("allTodo")) || [],
  // allTask:
  //   // localStorage.getItem("allTask") !== undefined
  //   //   ? JSON.parse(localStorage.getItem("allTask"))
  //   //   : {},
  //   JSON.parse(localStorage.getItem("allTask")) || [],
  allTodo: JSON.parse(localStorage.getItem("allTodo") || "[]"),
  allTask: JSON.parse(localStorage.getItem("allTask") || "[]"),
};

export const fetchTodo = createAsyncThunk("/fetchAllTodo", async () => {
  try {
    const res = axiosInstance.get("/api/v1/todo/getAllTodo", {
      withCredentials: true,
    });
    console.log(res);

    toast.promise(res, {
      loading: "Loading..",
      success: (data) => {
        return data?.data?.message;
      },
      error: "failed to load todo...",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});
export const addingTodo = createAsyncThunk("/addTodo", async (data) => {
  try {
    // console.log(data);

    const res = axiosInstance.post("/api/v1/todo/addTodo", data, {
      withCredentials: true,
    });
    // console.log(res);
    toast.promise(res, {
      loading: "Loading...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "failed to add",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});
export const fetchTask = createAsyncThunk("/fetchTodo", async (data) => {
  try {
    const res = axiosInstance.get(`/api/v1/todo/fetchTask/${data}`, {
      withCredentials: true,
    });
    toast.promise(res, {
      loading: "Loading",
      success: (data) => {
        return data?.data?.message;
      },
      error: "failed to get all Task",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});
export const addingTask = createAsyncThunk(
  "/addTasks",
  async ([taskListId, newTask]) => {
    try {
      // console.log(taskListId);
      // console.log(newTask);

      const res = axiosInstance.post(
        `/api/v1/todo/addTask/${taskListId}`,
        newTask,
        {
          withCredentials: true,
        }
      );
      // console.log(data[0]+ "   " + {...data[1]});

      // console.log(res);

      toast.promise(res, {
        loading: "Adding Task....",
        success: (data) => {
          return data?.data?.message;
        },
        error: "failed to get all course",
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);
export const editingTask = createAsyncThunk(
  "/editTask",
  async ([taskListId, newTask]) => {
    try {
      const response = axiosInstance.put(
        `/api/v1/todo/editTask/${taskListId}`,
        newTask,
        {
          withCredentials: true,
        }
      );
      // console.log(newTask);
      // console.log(response);
      toast.promise(response, {
        loading: "wait changing the task..",
        success: (data) => {
          return data?.data?.message;
        },
        error: "we are unable change the task due to some problem",
      });
      return (await response).data;
    } catch (error) {
      // console.log(error);
      toast.error(error?.response?.data?.message);
    }
  }
);
export const editingTodo = createAsyncThunk("/editingTodo", async (data) => {
  try {
    const response = axiosInstance.post(`/api/v1/todo/editTodo`, data, {
      withCredentials: true,
    });
    // console.log(newTask);
    console.log(response);
    toast.promise(response, {
      loading: "wait changing the Todo..",
      success: (data) => {
        return data?.data?.message;
      },
      error: "we are unable change the task due to some problem",
    });
    return (await response).data;
  } catch (error) {
    // console.log(error);
    toast.error(error?.response?.data?.message);
  }
});
export const todoDelete = createAsyncThunk(
  "/deleteingTodo",
  async (taskListId) => {
    try {
      console.log(taskListId);
      const response = axiosInstance.delete(
        `/api/v1/todo/deleteTodo/${taskListId}`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      toast.promise(response, {
        loading: "wait delete on the process..",
        success: (data) => {
          return data?.data?.message;
        },
        error: "we are unable delete the todo due to some problem",
      });
      return (await response).data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  }
);
export const taskDelete = createAsyncThunk(
  "/deleteTask",
  async ([taskListId, taskId]) => {
    try {
      // console.log(taskListId, taskId);
      const response = axiosInstance.delete(
        `/api/v1/todo/deleteTask/${taskListId}/${taskId}`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      toast.promise(response, {
        loading: "wait delete on the process..",
        success: (data) => {
          return data?.data?.message;
        },
        error: "we are unable delete the todo due to some problem",
      });
      return (await response).data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  }
);

export const isFinished = createAsyncThunk(
  "/editFinished",
  async ([taskListId, taskId, finished]) => {
    try {
      console.log(taskListId, taskId);
      const response = axiosInstance.put(
        `/api/v1/todo/updateTaskStatus/${taskListId}/${taskId}`,
        { finished },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      toast.promise(response, {
        loading: "Task is Changing...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "we are unable delete the todo due to some problem",
      });
      return (await response).data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  }
);

export const selectAllTask = createAsyncThunk(
  "/allSelect",
  async (taskListId) => {
    try {
      console.log(taskListId);
      const response = axiosInstance.patch(
        `/api/v1/todo/selectAll_Task/${taskListId}`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      toast.promise(response, {
        loading: "selecting all task..",
        success: (data) => {
          return data?.data?.message;
        },
        error: "we are unable to do all select due to some problem",
      });
      return (await response).data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  }
);

export const unselectAllTask = createAsyncThunk(
  "/allUnSelect",
  async (taskListId) => {
    try {
      console.log(taskListId);
      const response = axiosInstance.patch(
        `/api/v1/todo/unselectAll_Task/${taskListId}`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      toast.promise(response, {
        loading: "unCheck all...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "we are unable to do all select due to some problem",
      });
      return (await response).data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  }
);

const authSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {
    resetTodoState: (state) => {
      state.allTodo = [];
      state.allTask = [];
      localStorage.removeItem("allTodo");
      localStorage.removeItem("allTask");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.fulfilled, (state, action) => {
        // console.log(action.payload);
        // localStorage.setItem("allTodo", JSON.stringify(action?.payload?.data));
        // if (action.payload) {
        //   state.allTodo = [...action.payload.data];
        // }
        const todos = action?.payload?.data;

        if (todos) {
          localStorage.setItem("allTodo", JSON.stringify(todos));
          state.allTodo = [...todos];
        } else {
          localStorage.removeItem("allTodo");
          state.allTodo = [];
        }
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        // console.log(action.payload);
        // localStorage.setItem(
        //   "allTask",
        //   JSON.stringify(action?.payload?.data?.title?.tasks)
        // );
        // if (action.payload) {
        //   state.allTask = action.payload?.data?.title?.tasks;
        // }
        const tasks = action?.payload?.data?.title?.tasks;

        if (tasks) {
          localStorage.setItem("allTask", JSON.stringify(tasks));
          state.allTask = tasks;
        } else {
          localStorage.removeItem("allTask");
          state.allTask = [];
        }
      });
  },
});

export default authSlice.reducer;
export const { resetTodoState } = authSlice.actions;
