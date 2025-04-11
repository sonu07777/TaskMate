import { Link } from "react-router-dom";
import { FaGithub, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    // <footer className="bg-gray-100 text-gray-700 mt-16">
    //   <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
    //     {/* Brand Info */}
    //     <div>
    //       <h2 className="text-xl font-semibold mb-2">TaskMate</h2>
    //       <p className="text-sm text-gray-600">
    //         Your daily productivity partner. Organize. Plan. Succeed.
    //       </p>
    //     </div>

    //     {/* Navigation Links */}
    //     <div>
    //       <h3 className="font-semibold mb-2">Quick Links</h3>
    //       <ul className="space-y-2 text-sm">
    //         <li><Link to="/" className="hover:underline">Home</Link></li>
    //         <li><Link to="/todoPage" className="hover:underline">My Todos</Link></li>
    //         <li><Link to="/aboutUs" className="hover:underline">About Us</Link></li>
    //         <li><Link to="/contactUs" className="hover:underline">Contact</Link></li>
    //       </ul>
    //     </div>

    //     {/* Contact / Social */}
    //     <div>
    //       <h3 className="font-semibold mb-2">Follow Us</h3>
    //       <ul className="space-y-2 text-sm">
    //         <li><a href="https://github.com" target="_blank" className="hover:underline">GitHub</a></li>
    //         <li><a href="https://twitter.com" target="_blank" className="hover:underline">Twitter</a></li>
    //         <li><a href="mailto:support@taskmate.com" className="hover:underline">support@taskmate.com</a></li>
    //       </ul>
    //     </div>
    //   </div>

    //   <div className="border-t border-gray-200 text-center py-4 text-sm text-gray-500">
    //     © {new Date().getFullYear()} TaskMate. All rights reserved.
    //   </div>
    // </footer>
    // <footer className="bg-gray-50 text-gray-700 pt-10 pb-6 border-t border-gray-200">
    //   <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
    //     {/* Brand Info */}
    //     <div>
    //       <h2 className="text-xl font-bold text-indigo-600 mb-2">TaskMate</h2>
    //       <p className="text-sm text-gray-500">
    //         Your daily productivity partner. Organize. Plan. Succeed.
    //       </p>
    //     </div>

    //     {/* Navigation Links */}
    //     <div>
    //       <h3 className="text-md font-semibold mb-3 text-gray-700">
    //         Quick Links
    //       </h3>
    //       <ul className="space-y-2 text-sm text-gray-600">
    //         <li>
    //           <Link to="/" className="hover:text-indigo-600 transition">
    //             Home
    //           </Link>
    //         </li>
    //         <li>
    //           <Link to="/todoPage" className="hover:text-indigo-600 transition">
    //             My Todos
    //           </Link>
    //         </li>
    //         <li>
    //           <Link to="/aboutUs" className="hover:text-indigo-600 transition">
    //             About Us
    //           </Link>
    //         </li>
    //         <li>
    //           <Link
    //             to="/contactUs"
    //             className="hover:text-indigo-600 transition">
    //             Contact
    //           </Link>
    //         </li>
    //       </ul>
    //     </div>

    //     {/* Social & Contact */}
    //     <div>
    //       <h3 className="text-md font-semibold mb-3 text-gray-700">Connect</h3>
    //       <ul className="space-y-2 text-sm text-gray-600">
    //         <li>
    //           <a
    //             href="https://github.com"
    //             target="_blank"
    //             rel="noreferrer"
    //             className="flex items-center justify-center md:justify-start gap-2 hover:text-indigo-600 transition">
    //             <FaGithub /> GitHub
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             href="https://twitter.com"
    //             target="_blank"
    //             rel="noreferrer"
    //             className="flex items-center justify-center md:justify-start gap-2 hover:text-indigo-600 transition">
    //             <FaTwitter /> Twitter
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             href="mailto:support@taskmate.com"
    //             className="hover:text-indigo-600 transition">
    //             support@taskmate.com
    //           </a>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>

    //   {/* Bottom Text */}
    //   <div className="mt-8 text-center text-xs text-gray-500">
    //     © {new Date().getFullYear()} TaskMate. All rights reserved.
    //   </div>
    // </footer>
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
              className="w-full px-3 py-2 rounded-md text-sm text-black focus:outline-none"
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
