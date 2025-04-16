import { configureStore } from "@reduxjs/toolkit";
import Authslice from "../Redux/Slice/AuthSlice.js"
import TodoSlice from "../Redux/Slice/TodoSlice.js"
import AdminSlice from "../Redux/Slice/AdminSlice.js"

const store = configureStore({
    reducer:{
        auth:Authslice,
        todo:TodoSlice,
        admin:AdminSlice
    },
    devTools:true,
})

export default store;