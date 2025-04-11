import React from "react";
import HomeLayout from "../../Layout/HomeLayout.jsx";
// import imgs from "../assets/Images/apj.png"
import nelsonMandela from "../../public/mohitbaheti.svg";
import apj from "../../public/davejangid.svg";
import einstein from "../../public/satyajangid.jpg";
import steveJobs from "../../public/mukeshjangid.svg";
import billGates from "../../public/anandsoni.svg";
import Footer from "./Footer.jsx";

const teamMembers = [
  {
    name: "Dave Jangid",
    role: "Founder & CEO",
    description:
      "Failure will never overtake me if my determination to succeed is strong enough.",
    image: apj, // Replace with actual image URL
  },
  {
    name: "Mohit Baheti",
    role: "Chief Operating Officer",
    description:
      "Education is the most powerful tool you can use to change the world.",
    image: nelsonMandela,
  },
  {
    name: "Satya Narayan Jangid",
    role: "Managing Director",
    description: "A person who never made a mistake never tried anything new.",
    image: einstein,
  },
  {
    name: "Mukesh Jangid",
    role: "Chief Technical Officer",
    description:
      "We don't get a chance to do that many things, and every one should be really excellent.",
    image: steveJobs,
  },
  {
    name: "Anand Vardhan Soni",
    role: "Associate Director",
    description:
      "Success is a lousy teacher. It seduces smart people into thinking they can't lose.",
    image: billGates,
  },
  // Add more team members as needed
];

const TeamSection = () => {
  return (
    <HomeLayout>
      {/* <section className="bg-gray-100 py-16 px-6 md:px-12 lg:px-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 italic">
            Meet our fully remote team
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            To be the company our customers want us to be, it takes an eclectic
            group of passionate operators from all around the world. Get to know
            the people leading the way.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer text-center">
              <img
                src= {member.image}
                alt={member.name}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-gray-300"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                {member.name}
              </h3>
              <p className="text-gray-500 text-sm font-medium">{member.role}</p>
              <p className="text-gray-600 mt-2 text-sm">{member.description}</p>
            </div>
          ))}
        </div>
      </section> */}
      {/* <section className="relative bg-gradient-to-br from-indigo-50 to-white py-20 px-6 md:px-12 lg:px-24 min-w-[320px] max-w-screen-xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-4">
            Meet the Team ✨
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our remote team is built from diverse, passionate minds across the
            world. We’re united by a mission to build something meaningful.
          </p>
        </div>

        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 text-center border border-gray-100">
              <div className="relative w-28 h-28 mx-auto mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full border-4 border-indigo-100 group-hover:border-indigo-300 transition"
                />
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {member.name}
              </h3>
              <p className="text-indigo-500 text-sm font-medium">
                {member.role}
              </p>
              <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                {member.description}
              </p>
            </div>
          ))}
        </div>

        <div className="absolute inset-0 pointer-events-none z-[-1]">
          <div className="absolute -top-32 -left-20 w-72 h-72 bg-indigo-200 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-100 rounded-full opacity-30 blur-2xl"></div>
        </div>
      </section> */}
      <div className="bg-white text-gray-800">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">About TaskMate</h1>
          <p className="max-w-2xl mx-auto text-lg">
            TaskMate is your ultimate productivity partner — built to help you
            organize tasks, collaborate efficiently, and stay focused.
          </p>
        </section>

        {/* Our Team Section */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-10">
            Meet the Team
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gray-50 shadow-md rounded-xl p-6 text-center hover:shadow-xl transition duration-300">
                <div className="w-20 h-20 mx-auto mb-4 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xl font-bold">
                  <img
                    className="w-20 h-20 mx-auto bg-indigo-100  rounded-full flex items-center justify-center "
                    src={member.image}
                    alt="images"
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="bg-gray-100 py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6">
              We're on a mission to help individuals and teams unlock their
              potential by making task management simple, visual, and effective.
            </p>
            <button className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
              Join Us
            </button>
          </div>
        </section>
      </div>

      <Footer />
    </HomeLayout>
  );
};

export default TeamSection;
