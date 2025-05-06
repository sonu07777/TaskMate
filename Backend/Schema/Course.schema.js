import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required:[true,"title is required"],
    minLength:[8,"must have 8 character" ]
  },
  description: {
    type: String,
    required:[true,"title is required"],
    minLength:[8,"must have 8 character" ]
  },
  category: {
    type: String,
    required:[true,"require is required"],
  },
  thumbnail: {
    public_id: {
      type: String,
      required:true
    },
    secure_url: {
      type: String,
      required:true
    },
  },
  lectures: [
    {
      title: String,
      description: String,
      lecture: {
        public_id: {
          type: String,
          required:true

        },
        secure_url: {
          type: String,
          required:true

        },
      },
    },
  ],
  numbersOfLectures:{
    type:Number,
    default:0
  },
  createdBy:{
    type:String,
    required:true

  }
},{
    timestamps:true
});

const Course = mongoose.model("Course",courseSchema) 

export default Course