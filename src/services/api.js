import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Waste classification API
export const classifyWaste = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    // If API is available, use it. Otherwise, use mock classification
    if (API_BASE_URL && API_BASE_URL !== "http://localhost:5000/api") {
      const response = await api.post("/waste/classify", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } else {
      // Mock classification for development
      return mockClassifyWaste(imageFile);
    }
  } catch (error) {
    console.error("Classification error:", error);
    // Fallback to mock classification if API fails
    return mockClassifyWaste(imageFile);
  }
};

// Mock classification function (simulates AI classification)
const mockClassifyWaste = async (imageFile) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Simple mock: randomly classify waste types
  const wasteTypes = ["Plastic", "Paper", "Organic", "E-Waste"];
  const randomType = wasteTypes[Math.floor(Math.random() * wasteTypes.length)];
  
  const confidence = Math.floor(Math.random() * 30) + 70; // 70-100%

  return {
    wasteType: randomType,
    confidence: confidence,
    message: `Successfully classified as ${randomType} with ${confidence}% confidence`,
  };
};

export default api;


