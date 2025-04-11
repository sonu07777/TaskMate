import { configureStore } from "@reduxjs/toolkit";
import Authslice from "../Redux/Slice/AuthSlice.js"
import TodoSlice from "../Redux/Slice/TodoSlice.js"

const store = configureStore({
    reducer:{
        auth:Authslice,
        todo:TodoSlice,
    },
    devTools:true,
})

export default store;