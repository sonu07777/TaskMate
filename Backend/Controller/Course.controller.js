import Course from "../Schema/Course.schema.js";
import AppError from "../Utils/All_error.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";

const getAllCourse = async (req, res, next) => {
  try {
    const courses = await Course.find({}).select("-lectures");

    res.status(200).json({
      success: true,
      message: "all courses",
      courses,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "fail to load",
      courses,
    });
  }
};
const getLectureByCourseId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    console.log("the course is ", course);
    if (!course) {
      return res.status(400).json({
        success: false,
        message: "the course is not available",
      });
    }
    res.status(200).json({
      success: true,
      message: "course lecture successfully fetched ",
      lectures: course.lectures,
    });
  } catch (error) {
    return next(new AppError("may be the course is not available ", 400));
  }
};
const createCourse = async (req, res, next) => {
  try {
    const { title, description, category, createdBy, thumbnail } = req.body;
    if (!title || !description || !category || !createdBy) {
      return next(new AppError("all fields ae required", 400));
    }

    const course = await Course.create({
      title,
      description,
      category,
      createdBy,
      thumbnail: {
        public_id: "demo",
        secure_url: "demo",
      },
    });
    if (!course) {
      return next(
        new AppError("course couldn't be created due to some error", 400)
      );
    }

    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms",
      });
      console.log(result);

      if (result) {
        course.thumbnail.public_id = result.public_id;
        course.thumbnail.secure_url = result.secure_url;
      }
      // fs.rm(`uploads/${req.file.filename}`);
    }
    await course.save();
    res.status(200).json({
      success: true,
      message: "successfully done the project",
      course,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};
const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        runValidators: true, //this runValidators check weather you do any update is this match to the database is or not
      }
    );
    if (!course) {
      return next(new AppError("the course is not available  by the way", 400));
    }
    res.status(200).json({
      success: true,
      message: "successfully done the update",
    });
  } catch (error) {
    return next(new AppError("in update having some error" + error, 400));
  }
};
const removeCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) {
      return next(new AppError("this course is not available", 400));
    }
    await course.deleteOne(course);
    res.status(200).json({
      success: true,
      message: "successfully done the delete",
    });
  } catch (error) {
    return next(new AppError("something went wrong >" + error, 400));
  }
};
const addLectureToCourseById = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!title || !description) {
      return next(new AppError("all fields ae required", 400));
    }
    if (!course) {
      return next(new AppError("this course is not available", 400));
    }
    const lectureData = {
      title,
      description,
      lecture: {
        public_id: "demo",
        secure_url: "demo",
      },
    };
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms",
        chunk_size: 50000000, // 50 mb size
        resource_type: "video",
      });
      if (result) {
        lectureData.lecture.public_id = result.public_id;
        lectureData.lecture.secure_url = result.secure_url;
      }
      console.log(lectureData.lecture);

      fs.rm(`uploads/${req.file.filename}`);
    }

    course.lectures.push(lectureData);

    course.numbersOfLectures = course.lectures.length;

    await course.save();
    res.status(200).json({
      success: true,
      message: "successfully Add the lecture",
      course,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "error is " + error,
    });
  }
};
const removeLectureFromCourse = async (req, res, next) => {
  // ----------------------------
  const { courseId, lectureId } = req.query;

  console.log(courseId);
  if (!courseId) {
    return next(new AppError("Course ID is required", 400));
  }
  if (!lectureId) {
    return next(new AppError("Lecture ID is required", 400));
  }

  const course = await Course.findById(courseId);

  // If no course send custom message
  if (!course) {
    return next(new AppError("Invalid ID or Course does not exist.", 404));
  }

  // Find the index of the lecture using the lectureId
  const lectureIndex = course.lectures.findIndex(
    (lecture) => lecture._id.toString() === lectureId.toString()
  );

  // If returned index is -1 then send error as mentioned below
  if (lectureIndex === -1) {
    return next(new AppError("Lecture does not exist.", 404));
  }

  // Delete the lecture from cloudinary
  await cloudinary.v2.uploader.destroy(
    course.lectures[lectureIndex].lecture.public_id,
    {
      resource_type: "video",
    }
  );

  // Remove the lecture from the array
  course.lectures.splice(lectureIndex, 1);

  // update the number of lectures based on lectures array length
  course.numberOfLectures = course.lectures.length;

  // Save the course object
  await course.save();

  // Return response
  res.status(200).json({
    success: true,
    message: "Course lecture removed successfully",
  });
  // ----------------------------------
};

export {
  getAllCourse,
  getLectureByCourseId,
  createCourse,
  updateCourse,
  removeCourse,
  addLectureToCourseById,
  removeLectureFromCourse,
};
