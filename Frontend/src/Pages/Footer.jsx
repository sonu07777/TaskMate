import { Link } from "react-router-dom";
import { FaGithub, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
   
    <footer className="bg-gray-900 text-gray-300 py-10 ">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">TaskMate</h2>
          <p className="text-sm text-gray-400">
            Your daily productivity partner. Organize. Plan. Succeed.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-md font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/todoPage" className="hover:text-white transition">
                My Todos
              </Link>
            </li>
            <li>
              <Link to="/aboutUs" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contactUs" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3 className="text-md font-semibold text-white mb-3">Connect</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-white transition">
                <FaGithub /> GitHub
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-white transition">
                <FaTwitter /> Twitter
              </a>
            </li>
            <li>
              <a
                href="mailto:support@taskmate.com"
                className="hover:text-white transition">
                support@taskmate.com
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter (Optional) */}
        <div>
          <h3 className="text-md font-semibold text-white mb-3">
            Stay Updated
          </h3>
          <p className="text-sm text-gray-400 mb-3">Join our mailing list</p>
          <form className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded-md text-sm text-black focus:outline-none bg-white"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-10 text-center text-xs text-gray-500 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} TaskMate. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
