import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../AxiosInstance/authAxio.js"

const initialState = {
    courseData:[]
}

export const getAllCourse = createAsyncThunk("/course/getAllCourse",async()=>{
    try {
        const response = axiosInstance.get("/api/v1/course")
        console.log("The response is :-",response);
        
        toast.promise(response,{
            loading:"loading the courses from the database",
            success:"courses are lode successfully",
            error:"something went wrong"
        });
        return (await response).data.courses;
    } catch (error) {
        toast.error("something error",error)
    }
})
export const createNewCourse = createAsyncThunk("/course/create",async(data)=>{
    try {
        let formData = new FormData();
        formData.append("title", data?.title);
        formData.append("description", data?.description);
        formData.append("category", data?.category);
        formData.append("createdBy", data?.createdBy);
        formData.append("thumbnail", data?.thumbnail);

        const response = axiosInstance.post("/api/v1/course", formData);
        toast.promise(response, {
            loading: "Creating new course",
            success: "Course created successfully",
            error: "Failed to create course"
        });

        return (await response).data

    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})
export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
    try {
        const response = axiosInstance.delete(`/api/v1/course/${id}`);
        toast.promise(response, {
            loading: "deleting course ...",
            success: "Courses deleted successfully",
            error: "Failed to delete the courses",
        });

        return (await response).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
}); 
const SliceCreating = createSlice({
    name:"courses",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllCourse.fulfilled,(state,action)=>{
            // console.log(action.payload);
            
            if (action.payload) {
                state.courseData = [...action.payload]
            }
        })
        
    }
    
})

export default SliceCreating.reducer;