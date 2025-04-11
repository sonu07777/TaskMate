import { useState } from "react";
import HomeLayout from "../../Layout/HomeLayout.jsx";
import { useDispatch } from "react-redux";
import { contact_us } from "../Redux/Slice/AuthSlice.js";
import toast from "react-hot-toast";
import Footer from "./Footer.jsx";

const ContactPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all the details");
      return;
    }
    const response = await dispatch(contact_us(formData));
    if (response?.payload?.success) {
      toast.success("message wes send..");
    }

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  }

  return (
    <HomeLayout>
      <div className=" flex items-center justify-center p-4 ">
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
            Contact Us
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Message</label>
              <textarea
                type="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                required></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition">
              Send Message
            </button>
          </form>
        </div>
      </div>
      <div className="mt-12">
        <Footer />
      </div>
    </HomeLayout>
  );
};

export default ContactPage;
