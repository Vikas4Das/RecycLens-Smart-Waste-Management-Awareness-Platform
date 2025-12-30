import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import WasteUpload from "./pages/WasteUpload";
import Quiz from "./pages/Quiz";
import Leaderboard from "./pages/Leaderboard";
import MapPage from "./pages/Map";
import Rewards from "./pages/Rewards";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import RecyclingGuide from "./pages/RecyclingGuide";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import HowItWorks from "./pages/HowItWorks";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
        <Navbar />
          <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/recycling-guide" element={<RecyclingGuide />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<WasteUpload />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/rewards" element={<Rewards />} />
          </Route>

          {/* Admin Protected Routes */}
          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
