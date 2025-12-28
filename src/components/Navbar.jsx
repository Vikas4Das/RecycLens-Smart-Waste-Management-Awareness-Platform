import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Helper function to get display name
  const getDisplayName = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase() + user.name.slice(1);
    }
    if (user?.email) {
      const nameFromEmail = user.email.split("@")[0];
      return nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
    }
    return "User";
  };

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-down {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white shadow-xl backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group hover:scale-105 transition-transform duration-300"
            >
              <span className="text-3xl md:text-4xl transform group-hover:rotate-12 transition-transform duration-300">
                ♻
              </span>
              <h1 className="text-xl md:text-2xl font-extrabold drop-shadow-lg">
                Smart Waste
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 font-medium hover:scale-105"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 font-medium hover:scale-105"
              >
                About Us
              </Link>
              <Link
                to="/recycling-guide"
                className="px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 font-medium hover:scale-105"
              >
                Tutorial & Videos
              </Link>
              <Link
                to="/contact"
                className="px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 font-medium hover:scale-105"
              >
                Contact Us
              </Link>
              
              {user ? (
                <>
                  {user.role === "admin" && (
                    <Link
                      to="/admin"
                      className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 font-semibold hover:scale-105 shadow-lg flex items-center gap-2"
                    >
                      <span>⚙️</span>
                      Admin Panel
                    </Link>
                  )}
                  <Link
                    to="/dashboard"
                    className="px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 font-medium hover:scale-105"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/upload"
                    className="px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 font-medium hover:scale-105"
                  >
                    Upload
                  </Link>
                  <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white/30">
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-semibold">{getDisplayName()}</span>
                      {user.role === "admin" && (
                        <span className="text-xs text-yellow-200">Admin</span>
                      )}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-300 font-medium hover:scale-105"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 font-semibold hover:scale-105 shadow-lg flex items-center gap-2"
                  >
                    <span>👤</span>
                    User Login
                  </Link>
                  <Link
                    to="/admin/login"
                    className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-full transition-all duration-300 font-semibold hover:scale-105 shadow-lg flex items-center gap-2"
                  >
                    <span>⚙️</span>
                    Admin Login
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-all duration-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 animate-slide-down border-t border-white/20">
              <div className="flex flex-col gap-3">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 font-medium"
                >
                  About Us
                </Link>
                <Link
                  to="/recycling-guide"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 font-medium"
                >
                  Tutorial & Videos
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 font-medium"
                >
                  Contact Us
                </Link>
                
                {user ? (
                  <>
                    {user.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setIsMenuOpen(false)}
                        className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 font-semibold"
                      >
                        ⚙️ Admin Panel
                      </Link>
                    )}
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 font-medium"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/upload"
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 font-medium"
                    >
                      Upload
                    </Link>
                    <div className="px-4 py-2 border-t border-white/20 mt-2 pt-2">
                      <div className="text-sm font-semibold mb-2">
                        {getDisplayName()}
                        {user.role === "admin" && (
                          <span className="block text-xs text-yellow-200 mt-1">Admin</span>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-300 font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-300 font-semibold text-center"
                    >
                      👤 User Login
                    </Link>
                    <Link
                      to="/admin/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-all duration-300 font-semibold text-center"
                    >
                      ⚙️ Admin Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
