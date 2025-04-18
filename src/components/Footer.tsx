
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="font-playfair text-xl font-bold">
              Ankush Blog
            </Link>
            <p className="mt-2 text-gray-600">
              Share your thoughts and ideas with the world through our platform.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/create" className="text-gray-600 hover:text-primary">
                  Write a post
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 hover:text-primary">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-600 hover:text-primary">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-primary">
                Twitter
              </a>
              <a href="#" className="text-gray-600 hover:text-primary">
                GitHub
              </a>
              <a href="#" className="text-gray-600 hover:text-primary">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4 mt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Ankush Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
