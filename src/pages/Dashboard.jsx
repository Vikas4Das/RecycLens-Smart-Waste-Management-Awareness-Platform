import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { AuthContext } from "../context/AuthContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [showUploadHistoryModal, setShowUploadHistoryModal] = useState(false);

  // Get dynamic stats from user context
  const stats = {
    points: user?.points || 0,
    streak: user?.streak || 0,
    uploads: user?.uploads || 0,
  };

  const wasteCounts = user?.wasteCounts || {
    Plastic: 0,
    Paper: 0,
    Organic: 0,
    "E-Waste": 0,
  };

  const recentUploads = user?.recentUploads || [];

  return (
    <div className="min-h-screen bg-green-50 p-6 md:p-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-green-700">
          Dashboard 🌱
        </h2>

        <Link
          to="/upload"
          className="mt-4 md:mt-0 px-6 py-3 bg-green-600 text-white rounded-full font-semibold shadow hover:bg-green-700 transition"
        >
          + Upload Waste
        </Link>
      </div>

      {/* STATS CARDS */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        <StatCard
          title="Total Points"
          value={stats.points}
          icon="⭐"
          clickable
          onClick={() => navigate("/rewards")}
        />
        <StatCard
          title="Current Streak"
          value={`${stats.streak} days`}
          icon="🔥"
          clickable
          onClick={() => setShowStreakModal(true)}
        />
        <StatCard
          title="Waste Uploaded"
          value={stats.uploads}
          icon="♻️"
          clickable
          onClick={() => setShowUploadHistoryModal(true)}
        />
      </div>

      {/* CHART + RECENT UPLOADS */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* CHART */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-green-700 mb-4">
            Waste Classification Overview
          </h3>

          <Bar
            data={{
              labels: ["Plastic", "Paper", "Organic", "E-Waste"],
              datasets: [
                {
                  label: "Waste Count",
                  data: [
                    wasteCounts.Plastic || 0,
                    wasteCounts.Paper || 0,
                    wasteCounts.Organic || 0,
                    wasteCounts["E-Waste"] || 0,
                  ],
                  backgroundColor: [
                    "#22c55e",
                    "#86efac",
                    "#4ade80",
                    "#16a34a",
                  ],
                  borderRadius: 6,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
              },
            }}
          />
        </div>

        {/* RECENT UPLOADS */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-green-700 mb-4">
            Recent Uploads
          </h3>

          <ul className="space-y-4">
            {recentUploads.length > 0 ? (
              recentUploads.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-green-50 px-4 py-2 rounded"
                >
                  <span className="font-medium">{item.type}</span>
                  <span className="text-sm text-gray-600">
                    {item.date}
                  </span>
                </li>
              ))
            ) : (
              <li className="text-center text-gray-500 py-4">
                No uploads yet. Start uploading waste to see your history!
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* PROGRESS SECTION */}
      <div className="mt-12 bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold text-green-700 mb-4">
          Your Eco Progress
        </h3>

        <div className="w-full bg-green-100 rounded-full h-4">
          <div
            className="bg-green-600 h-4 rounded-full"
            style={{ width: "65%" }}
          />
        </div>

        <p className="mt-2 text-sm text-gray-600">
          65% towards next reward milestone 🎁
        </p>
      </div>

      {/* Streak Modal */}
      {showStreakModal && (
        <StreakModal
          user={user}
          onClose={() => setShowStreakModal(false)}
        />
      )}

      {/* Upload History Modal */}
      {showUploadHistoryModal && (
        <UploadHistoryModal
          user={user}
          onClose={() => setShowUploadHistoryModal(false)}
        />
      )}
    </div>
  );
}

/* ---------- STREAK MODAL COMPONENT ---------- */

function StreakModal({ user, onClose }) {
  const dailyUploads = user?.dailyUploads || {};
  
  // Get last 7 days
  const getLast7Days = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
      const dayNumber = date.getDate();
      const month = date.toLocaleDateString("en-US", { month: "short" });
      
      const hasUpload = dailyUploads[dateStr] && dailyUploads[dateStr].length > 0;
      const uploadCount = dailyUploads[dateStr]?.length || 0;
      const isToday = i === 0;
      
      days.push({
        date: dateStr,
        dayName,
        dayNumber,
        month,
        hasUpload,
        uploadCount,
        isToday,
        uploads: dailyUploads[dateStr] || [],
      });
    }
    
    return days;
  };

  const days = getLast7Days();
  const streakCount = user?.streak || 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-green-600 text-white p-6 rounded-t-xl flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              🔥 Your 7-Day Streak
            </h2>
            <p className="text-green-100 text-sm mt-1">
              Current streak: {streakCount} day{streakCount !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-green-700 rounded-full p-2 transition"
          >
            ✕
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="p-6">
          <div className="grid grid-cols-7 gap-3 mb-6">
            {days.map((day, index) => (
              <div
                key={index}
                className={`text-center p-4 rounded-lg border-2 transition ${
                  day.isToday
                    ? "border-green-500 bg-green-50"
                    : day.hasUpload
                    ? "border-green-400 bg-green-100"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="text-xs text-gray-600 mb-1">{day.dayName}</div>
                <div className="text-lg font-bold text-gray-800 mb-1">
                  {day.dayNumber}
                </div>
                <div className="text-xs text-gray-500 mb-2">{day.month}</div>
                {day.hasUpload ? (
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-green-600 text-lg">✓</span>
                    <span className="text-xs text-green-700 font-semibold">
                      {day.uploadCount} upload{day.uploadCount > 1 ? "s" : ""}
                    </span>
                    {day.uploads.length > 0 && (
                      <div className="text-xs text-gray-600 mt-1">
                        {day.uploads.map((upload, idx) => (
                          <span key={idx} className="block">
                            {upload.type}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-gray-400 text-sm">No upload</div>
                )}
                {day.isToday && (
                  <div className="mt-1 text-xs font-semibold text-green-600">
                    Today
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Streak Info */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-700 mb-2">
              💡 Keep Your Streak Going!
            </h3>
            <p className="text-sm text-gray-700">
              Upload at least one waste item each day to maintain your streak.
              Your current streak is {streakCount} day{streakCount !== 1 ? "s" : ""}.
              {streakCount === 0 && (
                <span className="block mt-2 text-green-600 font-semibold">
                  Start your streak today by uploading your first waste item! 🎯
                </span>
              )}
            </p>
          </div>

          {/* Action Button */}
          <div className="mt-6">
            <button
              onClick={() => {
                onClose();
                window.location.href = "/upload";
              }}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition shadow"
            >
              Upload Waste Now ➕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- UPLOAD HISTORY MODAL COMPONENT ---------- */

function UploadHistoryModal({ user, onClose }) {
  const dailyUploads = user?.dailyUploads || {};
  
  // Get all uploads sorted by date (newest first)
  const getAllUploads = () => {
    const allUploads = [];
    
    // Iterate through dailyUploads
    Object.keys(dailyUploads).forEach((date) => {
      dailyUploads[date].forEach((upload) => {
        allUploads.push({
          ...upload,
          date: date,
        });
      });
    });
    
    // Sort by date and time (newest first)
    allUploads.sort((a, b) => {
      const dateCompare = b.date.localeCompare(a.date);
      if (dateCompare !== 0) return dateCompare;
      return new Date(b.time) - new Date(a.time);
    });
    
    return allUploads;
  };

  const allUploads = getAllUploads();
  const totalUploads = user?.uploads || 0;

  // Group uploads by date
  const groupedUploads = allUploads.reduce((acc, upload) => {
    if (!acc[upload.date]) {
      acc[upload.date] = [];
    }
    acc[upload.date].push(upload);
    return acc;
  }, {});

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + "T00:00:00");
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (dateStr === today.toISOString().split("T")[0]) {
      return "Today";
    } else if (dateStr === yesterday.toISOString().split("T")[0]) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
      });
    }
  };

  const formatTime = (timeStr) => {
    const time = new Date(timeStr);
    return time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getWasteTypeColor = (type) => {
    const colors = {
      Plastic: "bg-blue-100 text-blue-700 border-blue-300",
      Paper: "bg-yellow-100 text-yellow-700 border-yellow-300",
      Organic: "bg-green-100 text-green-700 border-green-300",
      "E-Waste": "bg-purple-100 text-purple-700 border-purple-300",
    };
    return colors[type] || "bg-gray-100 text-gray-700 border-gray-300";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-green-600 text-white p-6 rounded-t-xl flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              ♻️ Upload History
            </h2>
            <p className="text-green-100 text-sm mt-1">
              Total uploads: {totalUploads}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-green-700 rounded-full p-2 transition"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {allUploads.length > 0 ? (
            <div className="space-y-6">
              {Object.keys(groupedUploads)
                .sort((a, b) => b.localeCompare(a))
                .map((date) => (
                  <div key={date} className="border-b border-gray-200 pb-4 last:border-0">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 sticky top-0 bg-white py-2">
                      {formatDate(date)}
                    </h3>
                    <div className="space-y-2">
                      {groupedUploads[date].map((upload, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                        >
                          <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getWasteTypeColor(upload.type)}`}>
                              {upload.type}
                            </span>
                            <span className="text-sm text-gray-600">
                              {formatTime(upload.time)}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">+10 pts</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Uploads Yet
              </h3>
              <p className="text-gray-500 mb-6">
                Start uploading waste to see your history here!
              </p>
              <button
                onClick={() => {
                  onClose();
                  window.location.href = "/upload";
                }}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition shadow"
              >
                Upload Your First Waste ➕
              </button>
            </div>
          )}
        </div>

        {/* Footer Stats */}
        {allUploads.length > 0 && (
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600">{totalUploads}</p>
                <p className="text-xs text-gray-600">Total Uploads</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {Object.keys(groupedUploads).length}
                </p>
                <p className="text-xs text-gray-600">Days Active</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {user?.points || 0}
                </p>
                <p className="text-xs text-gray-600">Points Earned</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- REUSABLE COMPONENT ---------- */

function StatCard({ title, value, icon, clickable, onClick }) {
  return (
    <div
      onClick={clickable ? onClick : undefined}
      className={`bg-white p-6 rounded-xl shadow flex items-center gap-4 
      ${clickable ? "cursor-pointer hover:shadow-lg hover:scale-[1.02] transition" : ""}`}
    >
      <div className="text-4xl">{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold text-green-700">{value}</p>
        {clickable && (
          <p className="text-xs text-green-600 mt-1">
            {title === "Current Streak" 
              ? "Click to view 7-day streak →" 
              : title === "Waste Uploaded"
              ? "Click to view upload history →"
              : "Click to redeem rewards →"}
          </p>
        )}
      </div>
    </div>
  );
}
