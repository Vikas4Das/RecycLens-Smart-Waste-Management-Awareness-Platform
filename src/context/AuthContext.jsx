import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      // Initialize points, streak, uploads if not present
      return {
        ...parsed,
        points: parsed.points || 0,
        streak: parsed.streak || 0,
        uploads: parsed.uploads || 0,
        wasteCounts: parsed.wasteCounts || { Plastic: 0, Paper: 0, Organic: 0, "E-Waste": 0 },
        recentUploads: parsed.recentUploads || [],
        dailyUploads: parsed.dailyUploads || {}, // Track uploads by date
      };
    }
    return null;
  });

  // Sync user data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const login = (data) => {
    const userData = {
      ...data,
      points: data.points || 0,
      streak: data.streak || 0,
      uploads: data.uploads || 0,
      wasteCounts: data.wasteCounts || { Plastic: 0, Paper: 0, Organic: 0, "E-Waste": 0 },
      recentUploads: data.recentUploads || [],
      dailyUploads: data.dailyUploads || {},
    };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const addPoints = (pointsToAdd) => {
    if (!user) return;
    const newPoints = (user.points || 0) + pointsToAdd;
    setUser({
      ...user,
      points: newPoints,
    });
  };

  const addUpload = (wasteType) => {
    if (!user) return;
    
    // Add points based on waste type (10 points per upload)
    const pointsToAdd = 10;
    
    // Update waste counts
    const newWasteCounts = {
      ...(user.wasteCounts || { Plastic: 0, Paper: 0, Organic: 0, "E-Waste": 0 }),
      [wasteType]: (user.wasteCounts?.[wasteType] || 0) + 1,
    };

    // Add to recent uploads (keep last 10)
    const newRecentUploads = [
      { type: wasteType, date: new Date().toISOString().split("T")[0] },
      ...(user.recentUploads || []).slice(0, 9),
    ];

    // Update streak and daily uploads
    const lastUploadDate = user.lastUploadDate;
    const today = new Date().toISOString().split("T")[0];
    let newStreak = user.streak || 0;
    
    // Update daily uploads tracking
    const dailyUploads = user.dailyUploads || {};
    if (!dailyUploads[today]) {
      dailyUploads[today] = [];
    }
    dailyUploads[today].push({
      type: wasteType,
      time: new Date().toISOString(),
    });
    
    if (lastUploadDate === today) {
      // Already uploaded today, don't change streak
    } else if (!lastUploadDate || getDaysDifference(lastUploadDate, today) === 1) {
      // Consecutive day or first upload
      newStreak = (user.streak || 0) + 1;
    } else {
      // Streak broken
      newStreak = 1;
    }

    // Calculate current streak from daily uploads
    const calculatedStreak = calculateStreak(dailyUploads);

    setUser({
      ...user,
      points: (user.points || 0) + pointsToAdd,
      uploads: (user.uploads || 0) + 1,
      wasteCounts: newWasteCounts,
      recentUploads: newRecentUploads,
      streak: calculatedStreak,
      lastUploadDate: today,
      dailyUploads: dailyUploads,
    });
  };

  const getDaysDifference = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2 - d1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateStreak = (dailyUploads) => {
    const today = new Date();
    let streak = 0;
    let startFrom = 0;
    
    // Check if today has upload, if not start from yesterday
    const todayStr = today.toISOString().split("T")[0];
    if (!dailyUploads[todayStr] || dailyUploads[todayStr].length === 0) {
      startFrom = 1; // Start from yesterday
    }
    
    // Count consecutive days backwards from startFrom
    for (let i = startFrom; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      
      const hasUpload = dailyUploads[dateStr] && dailyUploads[dateStr].length > 0;
      
      if (hasUpload) {
        streak++;
      } else {
        // Found a day without upload, streak is broken
        break;
      }
    }
    
    return streak;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, addPoints, addUpload }}>
      {children}
    </AuthContext.Provider>
  );
};
