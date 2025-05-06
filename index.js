import displayLecture from "./Frontend/src/Pages/AdminDashboard/DisplayLecture";

// displayLecture
<div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-wihte mx-[5%]">
<div className="text-center text-2xl font-semibold text-yellow-500">
  Course Name: {state?.title}
</div>

{lectures && lectures.length > 0 ? (
  <div className="flex justify-center gap-10 w-full">
    {/* left section for playing videos and displaying course details to admin */}
    <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
      <video
        src={lectures && lectures[currentVideo]?.lecture?.secure_url}
        className="object-fill rounded-tl-lg rounded-tr-lg w-full"
        controls
        disablePictureInPicture
        muted
        controlsList="nodownload"></video>
      <div>
        <h1>
          <span className="text-yellow-500"> Title: </span>
          {lectures && lectures[currentVideo]?.title}
        </h1>
        <p>
          <span className="text-yellow-500 line-clamp-4">
            Description:{" "}
          </span>
          {lectures && lectures[currentVideo]?.description}
        </p>
      </div>
    </div>

    {/* right section for displaying list of lectres */}
    <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
      <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
        <p>Lectures list</p>
        {role?.toUpperCase() == "ADMIN" && (
          <button
            onClick={() =>
              navigate("/course/addlecture", { state: { ...state } })
            }
            className="btn btn-primary px-2 py-1 rounded-md font-semibold text-sm">
            Add new lecture
          </button>
        )}
      </li>
      {lectures &&
        lectures.map((lecture, idx) => {
          return (
            <li className="space-y-2" key={lecture._id}>
              <p
                className="cursor-pointer"
                onClick={() => setCurrentVideo(idx)}>
                <span> Lecture {idx + 1} : </span>
                {lecture?.title}
              </p>
              {role?.toUpperCase() == "ADMIN"  && (
                <button
                  onClick={() =>
                    onLectureDelete(state?._id, lecture?._id)
                  }
                  className="btn btn-accent px-2 py-1 rounded-md font-semibold text-sm">
                  Delete lecture
                </button>
              )}
            </li>
          );
        })}
    </ul>
  </div>
) : (
  role?.toUpperCase() == "ADMIN" && (
    <button
      onClick={() =>
        navigate("/course/addlecture", { state: { ...state } })
      }
      className="btn btn-primary px-2 py-1 rounded-md font-semibold text-sm">
      Add new lecture
    </button>
  )
)}
</div>




// Description.jsx 
<div className="min-h-[90vh] flex flex-col items-center justify-center px-4 py-10 text-white">
<div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 bg-gray-800 p-6 rounded-xl shadow-lg">
  
  {/* Thumbnail & Info */}
  <div className="space-y-6">
    <img
      className="w-full h-64 object-cover rounded-md"
      alt="Course Thumbnail"
      src={course?.thumbnail?.secure_url || "/default-thumbnail.jpg"}
    />

    <div className="space-y-3 text-center md:text-left">
      <p className="text-lg font-semibold text-black">
        <span className="text-yellow-500">Total Lectures: </span>
        {course?.numbersOfLectures ?? "N/A"}
      </p>
      <p className="text-lg font-semibold">
        <span className="text-yellow-500">Instructor: </span>
        {course?.createdBy ?? "Unknown"}
      </p>

      <button
        onClick={() =>
          isSubscribed
            ? navigate("/DisplayLecture", { state: course })
            : navigate("/checkout")
        }
        className="bg-yellow-600 hover:bg-yellow-500 transition-all text-xl font-bold px-5 py-3 w-full rounded-md"
      >
        {isSubscribed ? "Watch Lectures" : "Subscribe"}
      </button>
    </div>
  </div>

  {/* Course Description */}
  <div className="space-y-5 text-xl">
    <h1 className="text-3xl font-bold text-yellow-500 text-center md:text-left">
      {course?.title || "Untitled Course"}
    </h1>
    <p className="text-yellow-500 font-semibold">Course Description:</p>
    <p className="text-white leading-relaxed">{course?.description || "No description available."}</p>
  </div>
</div>
</div>