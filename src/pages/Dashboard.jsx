import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { AuthContext } from "../context/AuthContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login } = useContext(AuthContext);
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [showUploadHistoryModal, setShowUploadHistoryModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [dashboardUser, setDashboardUser] = useState(user);
  const [animatedPoints, setAnimatedPoints] = useState(0);
  const [animatedStreak, setAnimatedStreak] = useState(0);
  const [animatedUploads, setAnimatedUploads] = useState(0);

  // Function to refresh user data
  const refreshUserData = () => {
    setIsRefreshing(true);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setDashboardUser(userData);
        if (userData.id === user?.id) {
          login(userData);
        }
        setLastUpdated(new Date());
      } catch (e) {
        console.error("Error refreshing user data:", e);
      }
    }
    setIsRefreshing(false);
  };

  // Auto-refresh every 5 seconds and on mount
  useEffect(() => {
    const refresh = () => {
      setIsRefreshing(true);
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setDashboardUser(userData);
          if (userData.id === user?.id) {
            login(userData);
          }
          setLastUpdated(new Date());
        } catch (e) {
          console.error("Error refreshing user data:", e);
        }
      }
      setIsRefreshing(false);
    };

    refresh();
    const interval = setInterval(refresh, 5000);

    window.addEventListener("storage", refresh);
    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", refresh);
    };
  }, [user, login]);

  // Sync dashboardUser when user context changes OR location changes (back/forward navigation)
  useEffect(() => {
    const syncUserData = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          // Always sync if data is different (handles back/forward navigation)
          setDashboardUser(prev => {
            if (!prev || prev.id !== userData.id || JSON.stringify(prev) !== JSON.stringify(userData)) {
              if (userData.id === user?.id) {
                login(userData);
              }
              setLastUpdated(new Date());
              return userData;
            }
            return prev;
          });
        } catch {
          // Ignore parse errors
        }
      }
    };

    // Sync on mount, user change, or location change (handles back/forward navigation)
    syncUserData();
  }, [user, location.pathname, location.key, login]);

  // Animate numbers
  useEffect(() => {
    const animateValue = (start, end, setter, duration = 1000) => {
      const startTime = Date.now();
      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (end - start) * progress);
        setter(current);
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    };

    if (dashboardUser) {
      animateValue(0, dashboardUser.points || 0, setAnimatedPoints);
      animateValue(0, dashboardUser.streak || 0, setAnimatedStreak);
      animateValue(0, dashboardUser.uploads || 0, setAnimatedUploads);
    }
  }, [dashboardUser]);

  const stats = {
    points: dashboardUser?.points || 0,
    streak: dashboardUser?.streak || 0,
    uploads: dashboardUser?.uploads || 0,
  };

  const wasteCounts = dashboardUser?.wasteCounts || {
    Plastic: 0,
    Paper: 0,
    Organic: 0,
    "E-Waste": 0,
  };

  const recentUploads = dashboardUser?.recentUploads || [];
  const dailyUploads = dashboardUser?.dailyUploads || {};

  // Calculate environmental impact
  const calculateImpact = () => {
    const totalWaste = Object.values(wasteCounts).reduce((a, b) => a + b, 0);
    const co2Saved = totalWaste * 2.5; // kg CO2 per item
    const treesSaved = totalWaste * 0.1; // trees per item
    const energySaved = totalWaste * 5; // kWh per item
    return { co2Saved, treesSaved, energySaved, totalWaste };
  };

  const impact = calculateImpact();

  // Calculate progress to next milestone
  const nextMilestone = Math.ceil((stats.points + 1) / 100) * 100;
  const progressToMilestone = ((stats.points % 100) / 100) * 100;

  // Get weekly upload trend
  const getWeeklyTrend = () => {
    const days = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      days.push({
        date: dateStr,
        count: dailyUploads[dateStr]?.length || 0,
        label: date.toLocaleDateString("en-US", { weekday: "short" }),
      });
    }
    return days;
  };

  const weeklyTrend = getWeeklyTrend();

  // Get achievements
  const getAchievements = () => {
    const achievements = [];
    if (stats.points >= 100) achievements.push({ icon: "🌟", name: "Centurion", desc: "100 points earned" });
    if (stats.points >= 500) achievements.push({ icon: "💎", name: "Elite", desc: "500 points earned" });
    if (stats.streak >= 7) achievements.push({ icon: "🔥", name: "Week Warrior", desc: "7-day streak" });
    if (stats.streak >= 30) achievements.push({ icon: "👑", name: "Streak Master", desc: "30-day streak" });
    if (stats.uploads >= 50) achievements.push({ icon: "♻️", name: "Eco Champion", desc: "50 uploads" });
    if (stats.uploads >= 100) achievements.push({ icon: "🌍", name: "Planet Saver", desc: "100 uploads" });
    return achievements;
  };

  const achievements = getAchievements();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER - Fully Responsive */}
        <div className="bg-white/90 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-5 md:p-6 mb-4 sm:mb-6 border border-green-100">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center gap-2 sm:gap-3 flex-wrap">
                  <span className="text-3xl sm:text-4xl md:text-5xl animate-bounce">🌱</span>
                  <span className="break-words">My Eco Dashboard</span>
                </h2>
                <p className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm flex items-center gap-2 flex-wrap">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
                  {isRefreshing && (
                    <span className="inline-flex items-center gap-1 text-green-600">
                      <span className="animate-spin text-sm">🔄</span>
                      <span className="text-xs">Refreshing...</span>
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Quick Actions - Responsive Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
              <button
                onClick={refreshUserData}
                disabled={isRefreshing}
                className="px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm shadow-lg transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 transform hover:scale-105 disabled:scale-100 active:scale-95"
              >
                <span className={isRefreshing ? "animate-spin text-sm sm:text-base" : "text-sm sm:text-base"}>🔄</span>
                <span className="hidden sm:inline">{isRefreshing ? "Refreshing..." : "Refresh"}</span>
                <span className="sm:hidden">{isRefreshing ? "..." : "Refresh"}</span>
              </button>
              <Link
                to="/upload"
                className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-1 sm:gap-2"
              >
                <span className="text-base sm:text-xl">+</span>
                <span className="hidden sm:inline">Upload Waste</span>
                <span className="sm:hidden">Upload</span>
              </Link>
              <Link
                to="/quiz"
                className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-1 sm:gap-2"
              >
                <span className="text-sm sm:text-base">🧠</span>
                <span className="hidden sm:inline">Take Quiz</span>
                <span className="sm:hidden">Quiz</span>
              </Link>
              <Link
                to="/map"
                className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-1 sm:gap-2"
              >
                <span className="text-sm sm:text-base">🗺️</span>
                <span className="hidden sm:inline">Find Centers</span>
                <span className="sm:hidden">Map</span>
              </Link>
            </div>
          </div>
        </div>

        {/* STATS CARDS - Fully Responsive */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-4 sm:mb-6">
          <StatCard
            title="Total Points"
            value={animatedPoints}
            icon="⭐"
            gradient="from-yellow-400 to-orange-500"
            clickable
            onClick={() => navigate("/rewards")}
            subtitle={`${nextMilestone - stats.points} to next milestone`}
          />
          <StatCard
            title="Current Streak"
            value={`${animatedStreak}`}
            icon="🔥"
            gradient="from-red-400 to-orange-500"
            clickable
            onClick={() => setShowStreakModal(true)}
            subtitle="Keep it going!"
          />
          <StatCard
            title="Waste Uploaded"
            value={animatedUploads}
            icon="♻️"
            gradient="from-green-400 to-emerald-500"
            clickable
            onClick={() => setShowUploadHistoryModal(true)}
            subtitle={`${impact.totalWaste} items recycled`}
          />
          <StatCard
            title="Achievements"
            value={achievements.length}
            icon="🏆"
            gradient="from-purple-400 to-pink-500"
            clickable
            onClick={() => navigate("/leaderboard")}
            subtitle={`${achievements.length} badges unlocked`}
          />
        </div>

        {/* ENVIRONMENTAL IMPACT CARDS - Responsive */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3 mb-4 sm:mb-6">
          <ImpactCard
            icon="🌍"
            title="CO₂ Saved"
            value={`${impact.co2Saved.toFixed(1)} kg`}
            color="from-blue-500 to-cyan-500"
            description="Carbon dioxide prevented"
            clickable
            onClick={() => navigate("/recycling-guide")}
          />
          <ImpactCard
            icon="🌳"
            title="Trees Saved"
            value={`${impact.treesSaved.toFixed(1)}`}
            color="from-green-500 to-emerald-500"
            description="Trees preserved"
            clickable
            onClick={() => navigate("/recycling-guide")}
          />
          <ImpactCard
            icon="⚡"
            title="Energy Saved"
            value={`${impact.energySaved.toFixed(1)} kWh`}
            color="from-yellow-500 to-orange-500"
            description="Energy conserved"
            clickable
            onClick={() => navigate("/recycling-guide")}
          />
        </div>

        {/* MAIN CONTENT GRID - Responsive */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3 mb-4 sm:mb-6">
          {/* WASTE CLASSIFICATION CHART */}
          <div 
            className="lg:col-span-2 bg-white/90 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border border-green-100 cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] relative group"
            onClick={() => navigate("/recycling-guide")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate("/recycling-guide");
              }
            }}
            aria-label="Click to view recycling guide"
          >
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2 flex-wrap">
              <span>📊</span>
              <span>Waste Classification Overview</span>
              <span className="text-xs sm:text-sm text-green-600 font-normal ml-auto group-hover:text-green-700 transition">Click to learn more →</span>
            </h3>
            <div className="h-48 sm:h-64 md:h-80">
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
                        "rgba(59, 130, 246, 0.8)",
                        "rgba(251, 191, 36, 0.8)",
                        "rgba(34, 197, 94, 0.8)",
                        "rgba(168, 85, 247, 0.8)",
                      ],
                      borderColor: [
                        "rgb(59, 130, 246)",
                        "rgb(251, 191, 36)",
                        "rgb(34, 197, 94)",
                        "rgb(168, 85, 247)",
                      ],
                      borderWidth: 2,
                      borderRadius: 12,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      padding: 12,
                      titleFont: { size: 14, weight: "bold" },
                      bodyFont: { size: 13 },
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: "rgba(0, 0, 0, 0.05)",
                      },
                      ticks: {
                        font: {
                          size: 11,
                        },
                      },
                    },
                    x: {
                      grid: {
                        display: false,
                      },
                      ticks: {
                        font: {
                          size: 11,
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* WEEKLY TREND */}
          <div 
            className="bg-white/90 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border border-green-100 cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] relative group"
            onClick={() => setShowUploadHistoryModal(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setShowUploadHistoryModal(true);
              }
            }}
            aria-label="Click to view upload history"
          >
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2 flex-wrap">
              <span>📈</span>
              <span>7-Day Trend</span>
              <span className="text-xs sm:text-sm text-green-600 font-normal ml-auto group-hover:text-green-700 transition">View details →</span>
            </h3>
            <div className="h-48 sm:h-64 md:h-80">
              <Line
                data={{
                  labels: weeklyTrend.map((d) => d.label),
                  datasets: [
                    {
                      label: "Daily Uploads",
                      data: weeklyTrend.map((d) => d.count),
                      borderColor: "rgb(34, 197, 94)",
                      backgroundColor: "rgba(34, 197, 94, 0.1)",
                      borderWidth: 3,
                      fill: true,
                      tension: 0.4,
                      pointRadius: 4,
                      pointHoverRadius: 6,
                      pointBackgroundColor: "rgb(34, 197, 94)",
                      pointBorderColor: "#fff",
                      pointBorderWidth: 2,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: "rgba(0, 0, 0, 0.05)",
                      },
                      ticks: {
                        font: {
                          size: 11,
                        },
                      },
                    },
                    x: {
                      ticks: {
                        font: {
                          size: 11,
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* SECOND ROW - Responsive */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3 mb-4 sm:mb-6">
          {/* PROGRESS TO MILESTONE */}
          <div 
            className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 text-white cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 relative group"
            onClick={() => navigate("/rewards")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate("/rewards");
              }
            }}
            aria-label="Click to view rewards"
          >
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2 flex-wrap">
              <span>🎯</span>
              <span>Next Milestone</span>
              <span className="text-xs sm:text-sm font-normal ml-auto opacity-90 group-hover:opacity-100 transition">Click to redeem →</span>
            </h3>
            <div className="mb-3 sm:mb-4">
              <div className="flex justify-between text-xs sm:text-sm mb-2">
                <span>{stats.points} / {nextMilestone} points</span>
                <span>{progressToMilestone.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 sm:h-4 overflow-hidden">
                <div
                  className="bg-white h-3 sm:h-4 rounded-full transition-all duration-1000 ease-out shadow-lg"
                  style={{ width: `${progressToMilestone}%` }}
                />
              </div>
            </div>
            <p className="text-xs sm:text-sm opacity-90">
              {nextMilestone - stats.points} more points to unlock your next reward! 🎁
            </p>
          </div>

          {/* ACHIEVEMENTS */}
          <div className="lg:col-span-2 bg-white/90 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border border-green-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 sm:gap-4">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
                <span>🏆</span>
                Your Achievements
              </h3>
              {achievements.length > 0 && (
                <button
                  onClick={() => navigate("/leaderboard")}
                  className="px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-xs sm:text-sm font-semibold w-full sm:w-auto"
                >
                  View Leaderboard →
                </button>
              )}
            </div>
            {achievements.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {achievements.map((ach, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-yellow-100 to-orange-100 p-3 sm:p-4 rounded-xl border-2 border-yellow-300 transform hover:scale-105 transition-all duration-300 cursor-pointer active:scale-95"
                    onClick={() => navigate("/leaderboard")}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        navigate("/leaderboard");
                      }
                    }}
                    aria-label={`View ${ach.name} achievement`}
                  >
                    <div className="text-3xl sm:text-4xl mb-2 text-center">{ach.icon}</div>
                    <div className="font-bold text-gray-800 text-sm sm:text-base text-center">{ach.name}</div>
                    <div className="text-xs text-gray-600 mt-1 text-center">{ach.desc}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 sm:py-8 text-gray-500">
                <div className="text-4xl sm:text-5xl mb-3">🔒</div>
                <p className="text-sm sm:text-base mb-4">Complete challenges to unlock achievements!</p>
                <button
                  onClick={() => navigate("/quiz")}
                  className="px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm sm:text-base font-semibold"
                >
                  Take Quiz to Earn Points
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RECENT UPLOADS - Responsive */}
        <div className="bg-white/90 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border border-green-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span>📋</span>
              Recent Activity
            </h3>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              {recentUploads.length > 0 && (
                <button
                  onClick={() => setShowUploadHistoryModal(true)}
                  className="px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-xs sm:text-sm font-semibold w-full sm:w-auto"
                >
                  View All →
                </button>
              )}
              <Link
                to="/upload"
                className="px-3 sm:px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-xs sm:text-sm font-semibold text-center w-full sm:w-auto"
              >
                Upload More +
              </Link>
            </div>
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {recentUploads.length > 0 ? (
              recentUploads.slice(0, 6).map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 sm:p-4 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
                  onClick={() => navigate("/upload")}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      navigate("/upload");
                    }
                  }}
                  aria-label={`View ${item.type} upload details`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-800 text-sm sm:text-base">{item.type}</span>
                    <span className="text-xl sm:text-2xl">
                      {item.type === "Plastic" && "🥤"}
                      {item.type === "Paper" && "📄"}
                      {item.type === "Organic" && "🍃"}
                      {item.type === "E-Waste" && "💻"}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">{item.date}</div>
                  <div className="mt-2 text-xs text-green-600 font-semibold">+10 points</div>
                  <div className="mt-1 text-xs text-gray-500">Click to upload more →</div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-6 sm:py-8 text-gray-500">
                <div className="text-4xl sm:text-5xl mb-3">📭</div>
                <p className="text-sm sm:text-base mb-4">No uploads yet. Start uploading waste to see your history!</p>
                <Link
                  to="/upload"
                  className="mt-4 inline-block px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm sm:text-base font-semibold"
                >
                  Upload Now
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Streak Modal */}
        {showStreakModal && (
          <StreakModal
            user={dashboardUser}
            onClose={() => setShowStreakModal(false)}
          />
        )}

        {/* Upload History Modal */}
        {showUploadHistoryModal && (
          <UploadHistoryModal
            user={dashboardUser}
            onClose={() => setShowUploadHistoryModal(false)}
          />
        )}
      </div>
    </div>
  );
}

/* ---------- ENHANCED STAT CARD COMPONENT - Responsive ---------- */
function StatCard({ title, value, icon, gradient, clickable, onClick, subtitle }) {
  return (
    <div
      onClick={clickable ? onClick : undefined}
      onKeyDown={clickable ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      } : undefined}
      tabIndex={clickable ? 0 : -1}
      role={clickable ? "button" : undefined}
      aria-label={clickable ? `Click to view ${title}` : undefined}
      className={`bg-white/90 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border border-green-100 transform transition-all duration-300 ${
        clickable ? "cursor-pointer hover:shadow-2xl hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className={`bg-gradient-to-br ${gradient} p-3 sm:p-4 rounded-xl shadow-lg`}>
          <span className="text-2xl sm:text-3xl">{icon}</span>
        </div>
        {clickable && (
          <span className="text-green-600 text-xs sm:text-sm font-semibold">View →</span>
        )}
      </div>
      <div>
        <p className="text-gray-500 text-xs sm:text-sm font-medium mb-1">{title}</p>
        <p className={`text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
          {value}
        </p>
        {subtitle && (
          <p className="text-xs text-gray-500 mt-2 line-clamp-2">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

/* ---------- IMPACT CARD COMPONENT - Responsive ---------- */
function ImpactCard({ icon, title, value, color, description, clickable, onClick }) {
  return (
    <div 
      className={`bg-gradient-to-br ${color} rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 text-white transform hover:scale-105 active:scale-95 transition-all duration-300 ${clickable ? 'cursor-pointer hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent' : ''}`}
      onClick={clickable ? onClick : undefined}
      onKeyDown={clickable ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      } : undefined}
      tabIndex={clickable ? 0 : -1}
      role={clickable ? "button" : undefined}
      aria-label={clickable ? `Click to learn more about ${title}` : undefined}
    >
      <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">{icon}</div>
      <div className="text-2xl sm:text-3xl font-extrabold mb-1">{value}</div>
      <div className="text-base sm:text-lg font-semibold mb-1">{title}</div>
      <div className="text-xs sm:text-sm opacity-90">{description}</div>
      {clickable && (
        <div className="mt-2 sm:mt-3 text-xs opacity-75 flex items-center gap-1">
          Learn more →
        </div>
      )}
    </div>
  );
}

/* ---------- ENHANCED STREAK MODAL COMPONENT - Responsive ---------- */
function StreakModal({ user, onClose }) {
  const navigate = useNavigate();
  const dailyUploads = user?.dailyUploads || {};
  
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
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 sm:p-6 rounded-t-xl sm:rounded-t-2xl flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center gap-2">
              🔥 Your 7-Day Streak
            </h2>
            <p className="text-orange-100 text-xs sm:text-sm mt-1">
              Current streak: <span className="font-bold text-base sm:text-lg">{streakCount}</span> day{streakCount !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-lg sm:text-xl"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-7 gap-2 sm:gap-3 mb-4 sm:mb-6">
            {days.map((day, index) => (
              <div
                key={index}
                className={`text-center p-2 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all transform hover:scale-105 ${
                  day.isToday
                    ? "border-orange-500 bg-gradient-to-br from-orange-50 to-red-50 shadow-lg"
                    : day.hasUpload
                    ? "border-green-400 bg-gradient-to-br from-green-50 to-emerald-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="text-xs text-gray-600 mb-1 font-semibold">{day.dayName}</div>
                <div className="text-lg sm:text-2xl font-bold text-gray-800 mb-1">
                  {day.dayNumber}
                </div>
                <div className="text-xs text-gray-500 mb-2">{day.month}</div>
                {day.hasUpload ? (
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-green-600 text-xl sm:text-2xl">✓</span>
                    <span className="text-xs text-green-700 font-bold">
                      {day.uploadCount} upload{day.uploadCount > 1 ? "s" : ""}
                    </span>
                  </div>
                ) : (
                  <div className="text-gray-400 text-xs sm:text-sm">—</div>
                )}
                {day.isToday && (
                  <div className="mt-1 text-xs font-bold text-orange-600 bg-orange-100 rounded-full px-1 sm:px-2 py-0.5">
                    Today
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-lg sm:rounded-xl p-4 sm:p-5 mb-4">
            <h3 className="font-bold text-orange-800 mb-2 text-base sm:text-lg flex items-center gap-2">
              💡 Keep Your Streak Going!
            </h3>
            <p className="text-xs sm:text-sm text-gray-700">
              Upload at least one waste item each day to maintain your streak.
              Your current streak is <span className="font-bold text-orange-600">{streakCount}</span> day{streakCount !== 1 ? "s" : ""}.
              {streakCount === 0 && (
                <span className="block mt-2 text-orange-600 font-semibold">
                  Start your streak today by uploading your first waste item! 🎯
                </span>
              )}
            </p>
          </div>

          <button
            onClick={() => {
              onClose();
              navigate("/upload");
            }}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg transform hover:scale-105 active:scale-95 text-base sm:text-lg"
          >
            Upload Waste Now ➕
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- ENHANCED UPLOAD HISTORY MODAL COMPONENT - Responsive ---------- */
function UploadHistoryModal({ user, onClose }) {
  const navigate = useNavigate();
  const dailyUploads = user?.dailyUploads || {};
  
  const getAllUploads = () => {
    const allUploads = [];
    Object.keys(dailyUploads).forEach((date) => {
      dailyUploads[date].forEach((upload) => {
        allUploads.push({
          ...upload,
          date: date,
        });
      });
    });
    
    allUploads.sort((a, b) => {
      const dateCompare = b.date.localeCompare(a.date);
      if (dateCompare !== 0) return dateCompare;
      return new Date(b.time) - new Date(a.time);
    });
    
    return allUploads;
  };

  const allUploads = getAllUploads();
  const totalUploads = user?.uploads || 0;

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

  const getWasteIcon = (type) => {
    const icons = {
      Plastic: "🥤",
      Paper: "📄",
      Organic: "🍃",
      "E-Waste": "💻",
    };
    return icons[type] || "♻️";
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 sm:p-6 rounded-t-xl sm:rounded-t-2xl flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center gap-2">
              ♻️ Upload History
            </h2>
            <p className="text-green-100 text-xs sm:text-sm mt-1">
              Total uploads: <span className="font-bold text-base sm:text-lg">{totalUploads}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-lg sm:text-xl"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {allUploads.length > 0 ? (
            <div className="space-y-4 sm:space-y-6">
              {Object.keys(groupedUploads)
                .sort((a, b) => b.localeCompare(a))
                .map((date) => (
                  <div key={date} className="border-b border-gray-200 pb-3 sm:pb-4 last:border-0">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 sticky top-0 bg-white py-1 sm:py-2 flex items-center gap-2">
                      <span className="text-lg sm:text-xl">📅</span>
                      {formatDate(date)}
                    </h3>
                    <div className="space-y-2">
                      {groupedUploads[date].map((upload, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 sm:p-4 bg-gradient-to-r from-gray-50 to-green-50 rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] active:scale-95 border border-green-100"
                        >
                          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                            <span className="text-2xl sm:text-3xl shrink-0">{getWasteIcon(upload.type)}</span>
                            <span className={`px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold border-2 ${getWasteTypeColor(upload.type)} shrink-0`}>
                              {upload.type}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-600 font-medium truncate">
                              {formatTime(upload.time)}
                            </span>
                          </div>
                          <span className="text-xs sm:text-sm font-bold text-green-600 bg-green-100 px-2 sm:px-3 py-1 rounded-full shrink-0">+10 pts</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <div className="text-5xl sm:text-7xl mb-4">📭</div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 mb-2">
                No Uploads Yet
              </h3>
              <p className="text-sm sm:text-base text-gray-500 mb-6">
                Start uploading waste to see your history here!
              </p>
              <button
                onClick={() => {
                  onClose();
                  navigate("/upload");
                }}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg transform hover:scale-105 active:scale-95 text-sm sm:text-base"
              >
                Upload Your First Waste ➕
              </button>
            </div>
          )}
        </div>

        {allUploads.length > 0 && (
          <div className="border-t border-gray-200 p-3 sm:p-5 bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
              <div>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600">{totalUploads}</p>
                <p className="text-xs sm:text-xs text-gray-600 font-semibold">Total Uploads</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600">
                  {Object.keys(groupedUploads).length}
                </p>
                <p className="text-xs sm:text-xs text-gray-600 font-semibold">Days Active</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600">
                  {user?.points || 0}
                </p>
                <p className="text-xs sm:text-xs text-gray-600 font-semibold">Points Earned</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
