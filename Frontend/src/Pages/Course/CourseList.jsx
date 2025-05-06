import React, { useEffect } from "react";
import Homelayout from "../../../Layout/HomeLayout.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourse } from "../../Redux/Slice/CourseSlice.js";
import CourseCard from "../../Component/courseCard.jsx";

function courseList() {
  const dispatch = useDispatch();
  const { courseData } = useSelector((state) => state.course);
  console.log(courseData);

  async function loaderCourse() {
    await dispatch(getAllCourse());
  }
  useEffect(() => {
    loaderCourse();
  }, []);

  return (
    <Homelayout>
      {/* <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-black ">
        <h1 className="text-center text-3xl font-semibold mb-5">
          Explore the courses made by
          <span className="font-bold text-yellow-500">Industry experts</span>
        </h1>
        <div className="mb-10 flex flex-wrap gap-14">
          {courseData?.map((element) => {
            return <CourseCard key={element._id} data={element} />;
          })}
        </div>
      </div> */}
      {/* <div className="min-h-screen px-6 md:px-20 py-12 flex flex-col gap-10 bg-gray-100 text-black">
        <h1 className="text-center text-3xl md:text-4xl font-semibold">
          Explore the courses made by{" "}
          <span className="text-yellow-500 font-bold">Industry Experts</span>
        </h1>

        <div className="flex flex-wrap justify-center gap-8">
          {courseData?.length > 0 ? (
            courseData.map((element) => (
              <CourseCard key={element._id} data={element} />
            ))
          ) : (
            <p className="text-lg text-gray-600">No courses available.</p>
          )}
        </div>
      </div> */}
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12">
          Discover Courses by{' '}
          <span className="text-yellow-500">Industry Experts</span>
        </h1>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courseData?.length > 0 ? (
            courseData.map((course) => (
              <CourseCard key={course._id} data={course} />
            ))
          ) : (
            <p className="col-span-full text-center text-lg text-gray-500">
              No courses available at the moment.
            </p>
          )}
        </div>
      </div>
    </div>
    </Homelayout>
  );
}

export default courseList;
