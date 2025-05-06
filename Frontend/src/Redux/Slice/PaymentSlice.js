import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance/authAxio.js";
import toast from "react-hot-toast";
const initialState = {
  key: "",
  subscription_id: "",
  isPaymentVerified: false,
  allPayments: {},
  finalMonths: {},
  monthlySalesRecord: [],
};

export const getRazorPayID = createAsyncThunk("rszorpay/getId", async () => {
  try {
    const response = await axiosInstance.get("/api/v1/payment/razorpay-key");
    console.log("16",response);
    
    return response.data;
  } catch (error) {
    toast.error("Failed to load data",error);
  }
});
export const purchaseCourseBundle = createAsyncThunk(
  "/purchaseCourse",
  async () => {
    try {
      const response = await axiosInstance.post("/api/v1/payment/subscribe");
      console.log("28",response);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);
export const verifyUserPayment = createAsyncThunk(
  "/payments/verifySubscription",
  async (data) => {
    console.log(data);
    try {
      const res = await axiosInstance.post("/api/v1/payment/verify", {
        razorpay_payment_id: data.razorpay_payment_id,
        razorpay_signature: data.razorpay_signature,
        razorpay_subscription_id: data.razorpay_subscription_id,
      });
      console.log("the slice response is ", res.data);
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);
export const getPaymentRecord = createAsyncThunk(
  "/payments/record",
  async () => {
    try {
      const response = axiosInstance.get("/api/v1/payment?count=100");
      console.log("the payment record", response);

      toast.promise(response, {
        loading: "Getting the payment records",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to get payment records",
      });
      return (await response).data;
    } catch (error) {
      toast.error("Operation failed",error);
    }
  }
);
export const cancelCourseBundle = createAsyncThunk(
  "/payments/cancel",
  async () => {
    try {
      const response = axiosInstance.post("/api/v1/payment/unsubscribe");
      toast.promise(response, {
        loading: "unsubscribing the bundle",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to unsubscribe",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const razorPaySlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRazorPayID.fulfilled, (state, action) => {
        state.key = action?.payload?.key;
      })
      .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
        state.subscription_id = action?.payload?.subscription_id;
        // console.log(subscription_id);
      })
      .addCase(verifyUserPayment.fulfilled, (state, action) => {
        // console.log(action);
        toast.success(action?.payload?.message);
        state.isPaymentVerified = action?.payload?.success;
      })
      .addCase(verifyUserPayment.rejected, (state, action) => {
        console.log(action);
        toast.success(action?.payload?.message);
        state.isPaymentVerified = action?.payload?.success;
        // Log and show error if verification fails
        // toast.error(action.error.message || "Verification failed");
        // state.isPaymentVerified = false; // Explicitly set to false on rejection
      })
      .addCase(getPaymentRecord.fulfilled, (state, action) => {
        state.allPayments = action?.payload?.allPayments;
        state.finalMonths = action?.payload?.finalMonths;
        state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
      });
  },
});

export default razorPaySlice.reducer;
