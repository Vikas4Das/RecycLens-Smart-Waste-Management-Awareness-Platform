import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Mock registration - replace with actual API call
    login({ name, email, id: Date.now() });
    setSuccess(true);
    
    // Redirect after a short delay
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
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
        
        @keyframes success-bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
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
        
        .animate-success-bounce {
          animation: success-bounce 0.6s ease-in-out;
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        {/* Floating Leaves */}
        <div className="absolute top-10 left-10 text-4xl opacity-20 animate-blob">🍃</div>
        <div className="absolute bottom-20 right-20 text-4xl opacity-20 animate-blob animation-delay-2000">🍃</div>
        <div className="absolute top-1/3 right-10 text-3xl opacity-20 animate-blob animation-delay-4000">🌿</div>

        <div className="max-w-md w-full relative z-10 animate-fade-in">
          {/* Card Container */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-green-100 overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 text-center">
              <div className="inline-block p-4 bg-white/20 rounded-full mb-4">
                <span className="text-5xl animate-success-bounce">✨</span>
              </div>
              <h2 className="text-3xl font-extrabold mb-2">Join Smart Waste</h2>
              <p className="text-green-100">Start your sustainable journey today</p>
            </div>

            {/* Form Container */}
            <div className="p-8">
              {/* Success Message */}
              {success && (
                <div className="mb-6 p-4 bg-green-100 border-2 border-green-400 text-green-700 rounded-lg text-center animate-fade-in">
                  <div className="text-4xl mb-2 animate-success-bounce">🎉</div>
                  <p className="font-semibold">Account created successfully!</p>
                  <p className="text-sm mt-1">Redirecting to dashboard...</p>
                </div>
              )}

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
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    placeholder="your.email@example.com"
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
                    placeholder="At least 6 characters"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Password must be at least 6 characters
                  </p>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    placeholder="Re-enter your password"
                    required
                  />
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="mt-1 rounded"
                    required
                  />
                  <label className="text-gray-600">
                    I agree to the{" "}
                    <a href="#" className="text-green-600 hover:text-green-700 font-semibold">
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-green-600 hover:text-green-700 font-semibold">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-lg font-bold text-lg shadow-lg hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300"
                >
                  Create Account
                </button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-4 text-sm text-gray-500">or</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* Social Login (Optional) */}
              <div className="space-y-3">
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-300 font-semibold text-gray-700"
                >
                  <span>🔵</span>
                  Sign up with Google
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-300 font-semibold text-gray-700"
                >
                  <span>⚫</span>
                  Sign up with GitHub
                </button>
              </div>

              {/* Footer Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-green-600 hover:text-green-700 font-semibold"
                  >
                    Login here
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


