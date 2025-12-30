import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Admin() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-2 border-yellow-300">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-extrabold text-yellow-700 mb-2 flex items-center gap-3">
                ⚙️ Admin Panel
              </h1>
              <p className="text-gray-600">
                Welcome, {user?.name || user?.email || "Admin"}
              </p>
            </div>
            <div className="text-6xl">👑</div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-200">
            <div className="text-3xl mb-2">👥</div>
            <div className="text-3xl font-bold text-blue-700 mb-1">0</div>
            <div className="text-gray-600">Total Users</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-200">
            <div className="text-3xl mb-2">♻️</div>
            <div className="text-3xl font-bold text-green-700 mb-1">0</div>
            <div className="text-gray-600">Total Uploads</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-200">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-3xl font-bold text-purple-700 mb-1">0</div>
            <div className="text-gray-600">Total Points</div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h3 className="font-semibold text-lg mb-2">📊 Analytics Dashboard</h3>
              <p className="text-gray-600 text-sm">View detailed statistics and analytics (Coming Soon)</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-lg mb-2">👥 User Management</h3>
              <p className="text-gray-600 text-sm">Manage users and their accounts (Coming Soon)</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-lg mb-2">♻️ Content Moderation</h3>
              <p className="text-gray-600 text-sm">Review and moderate uploads (Coming Soon)</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-lg mb-2">⚙️ System Settings</h3>
              <p className="text-gray-600 text-sm">Configure system settings (Coming Soon)</p>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
          <p className="text-blue-800 text-center">
            <strong>Note:</strong> Full admin features will be available after backend integration.
          </p>
        </div>
      </div>
    </div>
  );
}
