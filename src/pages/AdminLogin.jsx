import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Mock admin login - replace with actual API call
    login({ email, id: Date.now(), role: "admin" });
    navigate("/admin");
  };

  return (
    <>
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-blob {
          animation: blob 20s ease-in-out infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-50 to-green-50 flex items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        {/* Floating Icons */}
        <div className="absolute top-10 left-10 text-4xl opacity-20 animate-blob">⚙️</div>
        <div className="absolute bottom-20 right-20 text-4xl opacity-20 animate-blob animation-delay-2000">🔧</div>
        <div className="absolute top-1/3 right-10 text-3xl opacity-20 animate-blob animation-delay-4000">🛠️</div>

        <div className="max-w-md w-full relative z-10 animate-fade-in">
          {/* Card Container */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-blue-100 overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 text-center">
              <div className="inline-block p-4 bg-white/20 rounded-full mb-4">
                <span className="text-5xl">🔑</span>
              </div>
              <h2 className="text-3xl font-extrabold mb-2">Admin Login</h2>
              <p className="text-blue-100">Access the admin panel</p>
            </div>

            {/* Form Container */}
            <div className="p-8">
              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm animate-fade-in">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Admin Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="admin@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    placeholder="Enter admin password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-lg font-bold text-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300"
                >
                  Login as Admin
                </button>
              </form>

              {/* Footer Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Not an admin?{" "}
                  <Link
                    to="/login"
                    className="text-green-600 hover:text-yellow-700 font-semibold"
                  >
                    User Login
                  </Link>
                </p>
              </div>

              {/* Back to Home */}
              <div className="mt-4 text-center">
                <Link
                  to="/"
                  className="text-sm text-gray-500 hover:text-green-600 transition-colors"
                >
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
