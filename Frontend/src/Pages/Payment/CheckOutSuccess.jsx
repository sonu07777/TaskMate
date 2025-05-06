import { useEffect } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import HomeLayout from "../../../Layout/HomeLayout.jsx";
import { getUserData } from "../../Redux/Slice/AuthSlice.js";

function CheckoutSuccess() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  });

  return (
    // <HomeLayout>
    //     <div className="min-h-[90vh] flex items-center justify-center text-white">
    //         <div className="w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg relative">
    //             <h1 className="bg-green-500 absolute text-center top-0 w-full py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">Payment Successful</h1>

    //             <div className="px-4 flex flex-col items-center justify-center space-y-2">
    //                 <div className="text-center space-y-2">
    //                     <h2 className="text-lg font-semibold">
    //                         Welcome to the pro bundle
    //                     </h2>
    //                     <p className="text-left">
    //                         Now you can enjoy all the courses.
    //                     </p>

    //                 </div>
    //                 <AiFillCheckCircle className="text-green-500 text-5xl" />
    //             </div>

    //             <Link to="/" className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full py-2 text-xl font-semibold text-center rounded-br-lg rounded-bl-lg">
    //                 <button>Go to dashboard</button>
    //             </Link>

    //         </div>

    //     </div>
    // </HomeLayout>
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl">
        {/* Header */}
        <div className="bg-green-600 text-white text-center py-4">
          <h1 className="text-2xl font-bold">Payment Successful</h1>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col items-center justify-center space-y-6">
          <AiFillCheckCircle
            className="text-green-500 text-6xl"
            aria-hidden="true"
          />
          <div className="text-center space-y-3">
            <h2 className="text-xl font-semibold text-gray-900">
              Welcome to the Pro Bundle!
            </h2>
            <p className="text-gray-600">
              Your payment was successful. You now have full access to all
              courses. Start learning today!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4">
          <Link
            to="/"
            className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-lg font-semibold text-lg transition-colors duration-300"
            aria-label="Go to dashboard">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSuccess;
