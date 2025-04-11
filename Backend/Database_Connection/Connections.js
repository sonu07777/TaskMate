import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const connectionWithDatabase = async () => {
  try {
    const { connection } = await mongoose.connect(
      process.env.MONGO_URL || `mongodb://localhost:27017/`
    );
    if (connection) {
      console.log("database is connected successfully");
    }
  } catch (error) {
    console.log("the error is "+error);
    process.exit(1);
  }
};

export default connectionWithDatabase; 