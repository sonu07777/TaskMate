import React from "react";
import LandingPage from "../../Layout/HomeLayout";
import { Link } from "react-router-dom";
import imges from "../../public/Screenshot 2025-04-08 100024.png";
import Footer from "./Footer";


function HomePage() {
  
  return (
    <LandingPage>
      {/* Hero Section */}
      {/* <section className="text-center flex flex-col items-center px-4 py-12 md:py-20">
      <a
            href="https://www.capsitech.com/services/"
            target="_blank"
            rel="noopener noreferrer">
        <span className="bg-gray-100 px-3 py-1 text-sm rounded-full">
          We're providing services like... <b>Click Me</b> &rarr;
        </span>
        </a>
        <h1 className="text-4xl md:text-6xl font-bold mt-4">
          Customer <br className="hidden md:block" /> relationship magic.
        </h1>
        <p className="text-gray-600 mt-4 text-lg max-w-xl">
          Attio is the AI-native CRM that builds, scales, and grows your company
          to the next level.
        </p>

        <div className="flex gap-4 mt-6">
          <a
            href="https://www.capsitech.com/"
            target="_blank"
            rel="noopener noreferrer">
            <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800">
              Start for free
            </button>
          </a>
          <Link
            to="/contactUs"
            className="border border-gray-500 px-6 py-3 rounded-md text-gray-700 hover:bg-gray-100">
            Contact Us
          </Link>
        </div>
      </section> */}
      <section className="flex flex-col items-center text-center px-6 py-16 md:py-24 bg-gradient-to-br from-white to-gray-50">
        <div className="mb-4 bg-white/30 backdrop-blur-md text-sm text-gray-700 px-4 py-1 rounded-full shadow-sm border border-white/20">
          🚀 New to productivity?{" "}
          <a
            href="https://www.capsitech.com/services/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-semibold">
            Explore our services
          </a>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Organize Your <span className="text-blue-600">Day</span>
          <br />
          with <span className="text-black">TodoFlow</span>
        </h1>

        <p className="text-gray-600 mt-4 text-lg max-w-2xl">
          The ultimate task manager to help you plan, track, and complete your
          daily goals. Built for speed, simplicity, and success.
        </p>

        <div className="flex flex-wrap gap-4 mt-8">
          <Link to="/todoPage">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              Get Started Free
            </button>
          </Link>
          <Link
            to="/contactUs"
            className="border border-gray-400 px-6 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition">
            Contact Support
          </Link>
        </div>

        <img
          src={imges}
          alt="Todo App Preview"
          className="mt-12 w-full max-w-4xl rounded-xl shadow-lg"
        />
      </section>
      <Footer />

    </LandingPage>
  );
}

export default HomePage;
