// import { useEffect } from "react";
// import toast from "react-hot-toast";
// import { BiRupee } from "react-icons/bi";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import HomeLayout from "../../../Layout/HomeLayout.jsx";
// import {
//   getRazorPayID,
//   purchaseCourseBundle,
//   verifyUserPayment,
// } from "../../Redux/Slice/PaymentSlice.js";

// function Checkout() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const razorpayKey = useSelector((state) => state?.razorpay?.key);
//   const subscription_id = useSelector(
//     (state) => state?.razorpay?.subscription_id
//   );

//   const userData = useSelector((state) => state?.auth?.data);
//   const paymentDetails = {
//     razorpay_payment_id: "",
//     razorpay_signature: "",
//     razorpay_subscription_id: "",
//   };
//   console.log("paymentDetails",paymentDetails);
//   console.log(razorpayKey);
//   console.log(subscription_id);

//   async function handleSubscription(e) {
//     e.preventDefault();

//     if (!razorpayKey || !subscription_id) {
//       toast.error("Something went wrong");
//       return;
//     }
//     console.log(razorpayKey);
//     console.log(subscription_id);
//     const options = {
//       key: razorpayKey,
//       subscription_id: subscription_id,
//       name: "Coursify Pvt. Ltd.",
//       description: "Subscription",
//       theme: {
//         color: "#3399cc",
//       },
//       prefill: {
//         email: userData.email,
//         name: userData.fullName,
//         contact: userData.phoneNumber || "9090409859"
//       },

//       handler: async function (response) {
//         console.log("the response is 55",response);
//         paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
//         paymentDetails.razorpay_signature = response.razorpay_signature;
//         paymentDetails.razorpay_subscription_id =
//           response.razorpay_subscription_id;
//         console.log("the set response is ", response);
//         toast.success("Payment successful");
//         const res = await dispatch(verifyUserPayment(paymentDetails));
//         if (res) {
//           toast.success("res is present");
//         } else {
//           toast.error("having some error");
//         }
//         console.log("the response is ", res);
//         res?.payload?.success
//           ? navigate("/checkout/success")
//           : navigate("/checkout/fail");
//       },
//     };
//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//     // const rzp = new window.Razorpay(options);
//     // rzp.open();
//   }

//   async function load() {
//     await dispatch(getRazorPayID());
//     await dispatch(purchaseCourseBundle());
//   }

//   useEffect(() => {
//     load();
//   }, []);

//   return (
//     <HomeLayout>
//       <form
//         onSubmit={handleSubscription}
//         className="min-h-[90vh] flex items-center justify-center text-white">
//         <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
//           <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl0lg rounded-tr-lg">
//             Subscription Bundle
//           </h1>
//           <div className="px-4 space-y-5 text-center">
//             <p className="text-[17px]">
//               This purchase will allow you to access all available course of our
//               platform for{" "}
//               <span className="text-yellow-500 font-bold">
//                 <br />1 Year duration
//               </span>{" "}
//               All the existing and new launched courses will be also available
//             </p>

//             <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
//               <BiRupee />
//               <span>499</span> only
//             </p>
//             <div className="text-gray-200">
//               <p>100% refund on cancellation</p>
//               <p>* Terms and conditions applied *</p>
//             </div>
//             <button
//               type="submit"
//               className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full left-0 text-xl font-bold rounded-bl-lg rounded-br-lg py-2">
//               Buy now
//             </button>
//           </div>
//         </div>
//       </form>
//     </HomeLayout>
//   );
// }

// export default Checkout;



import { useEffect } from "react";
import toast from "react-hot-toast";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../../Layout/HomeLayout.jsx";
import {
  getRazorPayID,
  purchaseCourseBundle,
  verifyUserPayment,
} from "../../Redux/Slice/PaymentSlice.js";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const razorpayKey = useSelector((state) => state?.razorpay?.key);
  const subscription_id = useSelector((state) => state?.razorpay?.subscription_id);
  const userData = useSelector((state) => state?.auth?.data);

  useEffect(() => {
    dispatch(getRazorPayID());
    dispatch(purchaseCourseBundle());
  }, [dispatch]);
  console.log(subscription_id);
  console.log(razorpayKey);
  const handleSubscription = async (e) => {
    e.preventDefault();

    if (!razorpayKey || !subscription_id) {
      toast.error("Missing payment credentials");
      return;
    }

    const options = {
      key: razorpayKey,
      subscription_id,
      name: "Coursify Pvt. Ltd.",
      description: "Access to all courses for 1 year",
      theme: { color: "#facc15" },
      prefill: {
        email: userData?.email || "",
        name: userData?.fullName || "",
      },
      handler: async (response) => {
        console.log("Payment ID:", response.razorpay_payment_id);
        console.log("Subscription ID:", response.razorpay_subscription_id);
        console.log("Signature:", response.razorpay_signature);
        const paymentDetails = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          razorpay_subscription_id: response.razorpay_subscription_id,
        };

        const res = await dispatch(verifyUserPayment(paymentDetails));
        if (res?.payload?.success) {
          toast.success("Payment verified");
          navigate("/checkout/success");
        } else {
          toast.error("Payment verification failed");
          navigate("/checkout/fail");
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <HomeLayout>
      <form onSubmit={handleSubscription} className="min-h-screen flex justify-center items-center">
        <div className="w-[350px] bg-gray-900 text-white rounded-xl shadow-lg p-6 relative">
          <h1 className="bg-yellow-500 text-black font-bold text-center py-3 rounded-t-xl text-2xl">
            Subscription Bundle
          </h1>
          <div className="my-4 text-center space-y-4">
            <p>
              Get access to <span className="text-yellow-400 font-bold">all courses</span> for
              <span className="block mt-1">1 year</span>
            </p>
            <p className="text-yellow-400 text-2xl font-bold flex items-center justify-center gap-1">
              <BiRupee /> 499 only
            </p>
            <p className="text-gray-400 text-sm">
              100% refund on cancellation <br />
              <em>*Terms and conditions apply</em>
            </p>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-b-xl transition">
            Buy Now
          </button>
        </div>
      </form>
    </HomeLayout>
  );
}

export default Checkout;
