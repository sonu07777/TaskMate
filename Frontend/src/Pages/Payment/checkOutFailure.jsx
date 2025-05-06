import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";

import HomeLayout from "../../../Layout/HomeLayout.jsx";

function CheckoutFailure() {
  return (
    // <HomeLayout>
    //   <div className="min-h-[90vh] flex items-center justify-center text-white">
    //     <div className="w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg relative">
    //       <h1 className="bg-red-500 absolute text-center top-0 w-full py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">
    //         Payment failed
    //       </h1>

    //       <div className="px-4 flex flex-col items-center justify-center space-y-2">
    //         <div className="text-center space-y-2">
    //           <h2 className="text-lg font-semibold">
    //             Oops ! Your payment failed
    //           </h2>
    //           <p className="text-left">Please try again later</p>
    //         </div>
    //         <RxCrossCircled className="text-red-500 text-5xl" />
    //       </div>

    //       <Link
    //         to="/checkout"
    //         className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full py-2 text-xl font-semibold text-center rounded-br-lg rounded-bl-lg">
    //         <button>Try again</button>
    //       </Link>
    //     </div>
    //   </div>
    // </HomeLayout>
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center p-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl">
      {/* Header */}
      <div className="bg-red-600 text-white text-center py-4">
        <h1 className="text-2xl font-bold">Payment Failed</h1>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col items-center justify-center space-y-6">
        <RxCrossCircled className="text-red-500 text-6xl" aria-hidden="true" />
        <div className="text-center space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">
            Oops! Something Went Wrong
          </h2>
          <p className="text-gray-600">
            Your payment could not be processed. Please try again later or contact support if the issue persists.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 p-4">
        <Link
          to="/checkout"
          className="block w-full bg-red-500 hover:bg-red-600 text-white text-center py-3 rounded-lg font-semibold text-lg transition-colors duration-300"
          aria-label="Try payment again"
        >
          Try Again
        </Link>
      </div>
    </div>
  </div>
  );
}

export default CheckoutFailure;
