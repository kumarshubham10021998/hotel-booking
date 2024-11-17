import React from "react";
import { Link } from "react-router-dom"; // Import Link component from react-router-dom

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 mt-8 p-5">
      <div className="container mx-auto px-4">
        <div className="row">
          {/* Column 1 */}
          <div className="col-md-4 mb-4 md:mb-0">
            <h5 className="font-bold text-lg mb-3">Company</h5>
            <ul className="list-none space-y-2">
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/careers" className="hover:underline">Careers</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="col-md-4 mb-4 md:mb-0">
            <h5 className="font-bold text-lg mb-3">Support</h5>
            <ul className="list-none space-y-2">
              <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
              <li><Link to="/terms" className="hover:underline">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="col-md-4">
            <h5 className="font-bold text-lg mb-3">Follow Us</h5>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                <i className="fab fa-linkedin fa-lg"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-6 text-sm text-gray-400">
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
