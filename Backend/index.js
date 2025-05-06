import app from "./app.js";
import "dotenv/config";
import cloudinary from "cloudinary"
const port = process.env.PORT || 2000;
import connectionWithDatabase from "./Database_Connection/Connections.js";
import Razorpay from 'razorpay';


cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME  ,
  api_key: process.env.CLOUDINARY_API_KEY ,
  api_secret: process.env.CLOUDINARY_API_SECRET
})
export const razorpay= new Razorpay({
  key_id:process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.RAZORPAY_SECRET
})

app.listen(port, async () => {
  await connectionWithDatabase();
  console.log(`successfully run the code on http://localhost:${port}`);
});
