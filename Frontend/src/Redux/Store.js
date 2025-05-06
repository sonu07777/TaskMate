import { configureStore } from "@reduxjs/toolkit";
import Authslice from "../Redux/Slice/AuthSlice.js"
import TodoSlice from "../Redux/Slice/TodoSlice.js"
import AdminSlice from "../Redux/Slice/AdminSlice.js"
import CourseSlice from "../Redux/Slice/CourseSlice.js"
import PaymentSlice from "../Redux/Slice/PaymentSlice.js"
import LectureSlice from "../Redux/Slice/LecturesSlice.js"

const store = configureStore({
    reducer:{
        auth:Authslice,
        todo:TodoSlice,
        admin:AdminSlice,
        course:CourseSlice,
        razorpay:PaymentSlice,
        lecture:LectureSlice
    },
    devTools:true,
})

export default store;