import React from "react";
import { useNavigate } from "react-router-dom";

function NotFoundpage() {
    const navigate = useNavigate();
  return (
    <div className=" w-full h-[100vh] bg-[#1c2229] flex flex-col justify-center items-center">
      <h1 className=" text-9xl font-extrabold text-white tracking-widest">
        404
      </h1>
      <div className="bg-black text-white px-2 text-sm rounded rotate-12 absolute">
        Page not found ...
      </div>
      <button className="mt-5">
        <a className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-yellow-500 focus:outline-none focus:ring">
          <span
            onClick={() => navigate(-1)}
            className="relative block px-8 py-3 bg-[#1A2238] border border-current">
            Go Back
          </span>
        </a>
      </button>
    </div>
  );
}

export default NotFoundpage;
