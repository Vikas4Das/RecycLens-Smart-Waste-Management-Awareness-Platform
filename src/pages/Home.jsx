import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-green-50 min-h-screen">
      {/* Add custom styles for animations */}
      <style>{`
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-25px, -40px) rotate(180deg); }
        }
        
        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(40px, -20px) rotate(90deg); }
          75% { transform: translate(-30px, 30px) rotate(270deg); }
        }
        
        @keyframes float-4 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, -35px) rotate(150deg); }
        }
        
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes sway-1 {
          0%, 100% { transform: rotate(-2deg) translateY(0); }
          50% { transform: rotate(2deg) translateY(-5px); }
        }
        
        @keyframes sway-2 {
          0%, 100% { transform: rotate(2deg) translateY(0); }
          50% { transform: rotate(-2deg) translateY(-5px); }
        }
        
        @keyframes sway-3 {
          0%, 100% { transform: rotate(-1.5deg) translateY(0); }
          50% { transform: rotate(1.5deg) translateY(-3px); }
        }
        
        @keyframes left-tree-sway {
          0%, 100% { transform: rotate(-3deg) translateX(0) translateY(0) scale(1); }
          25% { transform: rotate(-1deg) translateX(5px) translateY(-8px) scale(1.05); }
          50% { transform: rotate(2deg) translateX(-3px) translateY(-12px) scale(1.1); }
          75% { transform: rotate(-2deg) translateX(4px) translateY(-6px) scale(1.05); }
        }
        
        @keyframes right-tree-sway {
          0%, 100% { transform: rotate(3deg) translateX(0) translateY(0) scale(1); }
          25% { transform: rotate(1deg) translateX(-5px) translateY(-8px) scale(1.05); }
          50% { transform: rotate(-2deg) translateX(3px) translateY(-12px) scale(1.1); }
          75% { transform: rotate(2deg) translateX(-4px) translateY(-6px) scale(1.05); }
        }
        
        @keyframes left-tree-grow {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.15) translateY(-15px); }
        }
        
        @keyframes right-tree-grow {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.15) translateY(-15px); }
        }
        
        @keyframes tree-pulse {
          0%, 100% { opacity: 0.8; filter: brightness(1); }
          50% { opacity: 1; filter: brightness(1.2); }
        }
        
        @keyframes title-3d {
          0%, 100% { transform: perspective(1000px) rotateX(0deg) rotateY(0deg); }
          50% { transform: perspective(1000px) rotateX(2deg) rotateY(2deg); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float-1 {
          animation: float-1 8s ease-in-out infinite;
        }
        
        .animate-float-2 {
          animation: float-2 6s ease-in-out infinite;
        }
        
        .animate-float-3 {
          animation: float-3 10s ease-in-out infinite;
        }
        
        .animate-float-4 {
          animation: float-4 7s ease-in-out infinite;
        }
        
        .animate-blob {
          animation: blob 20s ease-in-out infinite;
        }
        
        .animate-sway-1 {
          animation: sway-1 4s ease-in-out infinite;
        }
        
        .animate-sway-2 {
          animation: sway-2 5s ease-in-out infinite;
        }
        
        .animate-sway-3 {
          animation: sway-3 4.5s ease-in-out infinite;
        }
        
        .animate-left-tree-sway {
          animation: left-tree-sway 6s ease-in-out infinite;
        }
        
        .animate-right-tree-sway {
          animation: right-tree-sway 6s ease-in-out infinite;
        }
        
        .animate-left-tree-grow {
          animation: left-tree-grow 5s ease-in-out infinite;
        }
        
        .animate-right-tree-grow {
          animation: right-tree-grow 5s ease-in-out infinite;
        }
        
        .animate-tree-pulse {
          animation: tree-pulse 3s ease-in-out infinite;
        }
        
        .animate-title-3d {
          animation: title-3d 6s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        
        .animate-fade-in-up-delay {
          animation: fade-in-up 1s ease-out 0.3s both;
        }
        
        .animate-fade-in-up-delay-2 {
          animation: fade-in-up 1s ease-out 0.6s both;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-gpu {
          transform: translateZ(0);
          will-change: transform;
        }
        
        .tree-container {
          transform-style: preserve-3d;
        }
        
        .tree {
          transform-style: preserve-3d;
        }
        
        .stat-card {
          transform-style: preserve-3d;
        }
      `}</style>
      {/* HERO SECTION */}
      <section className="relative text-center px-6 py-20 md:py-32 overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Leaves */}
          <div className="absolute top-10 left-10 animate-float-1">🍃</div>
          <div className="absolute top-32 right-20 animate-float-2">🍃</div>
          <div className="absolute bottom-20 left-1/4 animate-float-3">🍃</div>
          <div className="absolute bottom-40 right-1/3 animate-float-4">🍃</div>
          <div className="absolute top-1/2 left-1/3 animate-float-1">🍃</div>
          
          {/* Animated Circles */}
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-1/4 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        {/* Left Side Trees with Unique Animations */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-40 flex flex-col justify-center items-start gap-6 md:gap-8 pointer-events-none z-0">
          <div className="tree-container transform perspective-1000">
            <div className="tree animate-left-tree-sway animate-tree-pulse text-5xl md:text-7xl lg:text-8xl" style={{ filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.3))' }}>🌳</div>
          </div>
          <div className="tree-container transform perspective-1000 animation-delay-200">
            <div className="tree animate-left-tree-grow text-4xl md:text-6xl lg:text-7xl" style={{ filter: 'drop-shadow(2px 2px 5px rgba(0,0,0,0.25))' }}>🌲</div>
          </div>
          <div className="tree-container transform perspective-1000 animation-delay-400">
            <div className="tree animate-left-tree-sway animate-tree-pulse text-6xl md:text-8xl lg:text-9xl" style={{ filter: 'drop-shadow(4px 4px 8px rgba(0,0,0,0.3))' }}>🌴</div>
          </div>
          <div className="tree-container transform perspective-1000 animation-delay-2000">
            <div className="tree animate-left-tree-grow text-4xl md:text-5xl lg:text-6xl" style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))' }}>🌲</div>
          </div>
        </div>

        {/* Right Side Trees with Unique Animations */}
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-40 flex flex-col justify-center items-end gap-6 md:gap-8 pointer-events-none z-0">
          <div className="tree-container transform perspective-1000">
            <div className="tree animate-right-tree-sway animate-tree-pulse text-5xl md:text-7xl lg:text-8xl" style={{ filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.3))' }}>🌴</div>
          </div>
          <div className="tree-container transform perspective-1000 animation-delay-200">
            <div className="tree animate-right-tree-grow text-4xl md:text-6xl lg:text-7xl" style={{ filter: 'drop-shadow(2px 2px 5px rgba(0,0,0,0.25))' }}>🌳</div>
          </div>
          <div className="tree-container transform perspective-1000 animation-delay-400">
            <div className="tree animate-right-tree-sway animate-tree-pulse text-6xl md:text-8xl lg:text-9xl" style={{ filter: 'drop-shadow(4px 4px 8px rgba(0,0,0,0.3))' }}>🌲</div>
          </div>
          <div className="tree-container transform perspective-1000 animation-delay-2000">
            <div className="tree animate-right-tree-grow text-4xl md:text-5xl lg:text-6xl" style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))' }}>🌳</div>
          </div>
        </div>

        {/* 3D Trees */}
        <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 flex items-end justify-center gap-4 md:gap-8 pointer-events-none">
          <div className="tree-container transform perspective-1000">
            <div className="tree animate-sway-1 text-4xl md:text-6xl" style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))' }}>🌲</div>
          </div>
          <div className="tree-container transform perspective-1000">
            <div className="tree animate-sway-2 text-5xl md:text-7xl" style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))' }}>🌳</div>
          </div>
          <div className="tree-container transform perspective-1000">
            <div className="tree animate-sway-3 text-4xl md:text-6xl" style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))' }}>🌲</div>
          </div>
          <div className="tree-container transform perspective-1000">
            <div className="tree animate-sway-2 text-5xl md:text-7xl" style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))' }}>🌴</div>
          </div>
          <div className="tree-container transform perspective-1000">
            <div className="tree animate-sway-1 text-4xl md:text-6xl" style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))' }}>🌲</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-6xl mx-auto">
          {/* 3D Title with Animation */}
          <div className="transform-gpu perspective-1000 mb-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-green-700 mb-4 animate-title-3d drop-shadow-2xl">
              <span className="inline-block transform hover:scale-110 transition-transform duration-300">
                Smart
              </span>
              <span className="inline-block mx-2 transform hover:scale-110 transition-transform duration-300">
                Waste
              </span>
              <br />
              <span className="inline-block transform hover:scale-110 transition-transform duration-300">
                Management
              </span>
              <span className="inline-block ml-4 text-6xl md:text-7xl animate-spin-slow">
                🌍
              </span>
            </h1>
          </div>

          {/* Animated Subtitle */}
          <p className="mt-6 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto text-gray-700 font-medium animate-fade-in-up leading-relaxed">
            An <span className="text-green-600 font-bold">AI-powered</span> platform that helps you classify waste, track recycling
            habits, earn rewards, and build a <span className="text-emerald-600 font-bold">cleaner, greener future</span>.
          </p>

          {/* Stats Cards */}
          <div className="mt-12 flex flex-wrap justify-center gap-4 md:gap-6 animate-fade-in-up-delay">
            <div className="stat-card bg-white/80 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg transform hover:scale-110 hover:rotate-1 transition-all duration-300">
              <div className="text-3xl font-bold text-green-600">10K+</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
            <div className="stat-card bg-white/80 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg transform hover:scale-110 hover:-rotate-1 transition-all duration-300">
              <div className="text-3xl font-bold text-emerald-600">50K+</div>
              <div className="text-sm text-gray-600">Waste Items Classified</div>
            </div>
            <div className="stat-card bg-white/80 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg transform hover:scale-110 hover:rotate-1 transition-all duration-300">
              <div className="text-3xl font-bold text-teal-600">100+</div>
              <div className="text-sm text-gray-600">Collection Centers</div>
            </div>
          </div>

          {/* Action Buttons with 3D Effect */}
          <div className="mt-12 flex justify-center gap-6 flex-wrap animate-fade-in-up-delay-2">
            <Link
              to="/register"
              className="group relative px-10 py-4 bg-green-600 text-white rounded-full font-bold text-lg shadow-2xl transform hover:scale-110 hover:-translate-y-2 transition-all duration-300 overflow-hidden"
              style={{
                boxShadow: '0 10px 30px rgba(34, 197, 94, 0.4)',
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <span className="group-hover:translate-x-2 transition-transform duration-300">🚀</span>
              </span>
              <div className="absolute inset-0 bg-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            </Link>

            <Link
              to="/login"
              className="group relative px-10 py-4 border-3 border-green-600 text-green-700 rounded-full font-bold text-lg bg-white/90 backdrop-blur-sm shadow-xl transform hover:scale-110 hover:-translate-y-2 hover:bg-green-50 transition-all duration-300"
              style={{
                borderWidth: '3px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Login
                <span className="group-hover:rotate-12 transition-transform duration-300">→</span>
              </span>
            </Link>
          </div>

          {/* Floating Elements */}
          <div className="mt-16 flex justify-center gap-4 animate-bounce-slow">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <div className="w-3 h-3 bg-emerald-400 rounded-full animation-delay-200"></div>
            <div className="w-3 h-3 bg-teal-400 rounded-full animation-delay-400"></div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 py-20 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10">
          {/* Enhanced Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-4 animate-fade-in-up">
              Why Choose <span className="text-emerald-600">Smart Waste?</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 mx-auto rounded-full"></div>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              Discover powerful features designed to make waste management simple, rewarding, and impactful
            </p>
          </div>

          <div className="grid gap-8 mt-14 sm:grid-cols-2 lg:grid-cols-4">
            <Feature
              title="AI Waste Detection"
              icon="🤖"
              desc="Upload a waste image and let AI classify it as Plastic, Paper, Organic, or E-Waste."
              link="/upload"
              buttonText="Try Now"
              delay="0s"
            />

            <Feature
              title="Gamified Streaks"
              icon="🔥"
              desc="Build daily eco-friendly habits with streaks and reward points."
              link="/dashboard"
              buttonText="View Streak"
              delay="0.1s"
            />

            <Feature
              title="Recycling Quiz"
              icon="🧠"
              desc="Test your environmental knowledge and earn points through fun quizzes."
              link="/quiz"
              buttonText="Take Quiz"
              delay="0.2s"
            />

            <Feature
              title="Nearby Centers"
              icon="🗺️"
              desc="Find nearby recycling centers using real-time Google Maps integration."
              link="/map"
              buttonText="Find Centers"
              delay="0.3s"
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative bg-gradient-to-br from-white via-green-50/30 to-emerald-50/30 py-24 px-6 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Enhanced Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-4 animate-fade-in-up">
              How It <span className="text-emerald-600">Works</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 mx-auto rounded-full"></div>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              Get started in just four simple steps and begin your sustainable journey
            </p>
          </div>

          <div className="mt-16 max-w-5xl mx-auto grid gap-8 md:grid-cols-4 text-center relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-green-300 via-emerald-400 to-green-300"></div>
            
            <Step number="1" text="Register & Login" icon="👤" delay="0s" />
            <Step number="2" text="Upload Waste Image" icon="📸" delay="0.2s" />
            <Step number="3" text="AI Classifies Waste" icon="🤖" delay="0.4s" />
            <Step number="4" text="Earn Points & Rewards" icon="🎁" delay="0.6s" />
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white text-center py-24 md:py-32 px-6 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Leaves */}
          <div className="absolute top-10 left-10 animate-float-1 text-3xl opacity-30">🍃</div>
          <div className="absolute top-32 right-20 animate-float-2 text-3xl opacity-30">🍃</div>
          <div className="absolute bottom-20 left-1/4 animate-float-3 text-3xl opacity-30">🍃</div>
          <div className="absolute bottom-40 right-1/3 animate-float-4 text-3xl opacity-30">🍃</div>
          <div className="absolute top-1/2 left-1/3 animate-float-1 text-3xl opacity-30">🍃</div>
          
          {/* Animated Blob Backgrounds */}
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

        {/* Main Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Animated Title */}
          <div className="transform-gpu perspective-1000 mb-6 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-2xl animate-title-3d">
              <span className="inline-block transform hover:scale-110 transition-transform duration-300">
                Join the Green
              </span>
              <br />
              <span className="inline-block transform hover:scale-110 transition-transform duration-300">
                Revolution
              </span>
              <span className="inline-block ml-4 text-5xl md:text-6xl animate-bounce-slow">
                🌱
              </span>
            </h2>
          </div>

          {/* Enhanced Subtitle */}
          <p className="mt-6 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto font-medium leading-relaxed animate-fade-in-up-delay drop-shadow-lg">
            Small daily actions can create a <span className="font-bold text-emerald-200">massive environmental impact</span>.
            <br />
            Start your <span className="font-bold text-green-200">sustainable journey</span> today.
          </p>

          {/* Enhanced Button with 3D Effect */}
          <div className="mt-12 flex justify-center gap-6 flex-wrap animate-fade-in-up-delay-2">
            <Link
              to="/register"
              className="group relative px-12 py-5 bg-white text-green-700 rounded-full font-bold text-lg md:text-xl shadow-2xl transform hover:scale-110 hover:-translate-y-2 transition-all duration-300 overflow-hidden"
              style={{
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3), 0 5px 15px rgba(255, 255, 255, 0.2)',
              }}
            >
              <span className="relative z-10 flex items-center gap-3">
                Start Now
                <span className="group-hover:translate-x-2 transition-transform duration-300 text-2xl">🚀</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-full"></div>
            </Link>

            <Link
              to="/login"
              className="group relative px-12 py-5 border-3 border-white/80 text-white rounded-full font-bold text-lg md:text-xl bg-white/10 backdrop-blur-sm shadow-xl transform hover:scale-110 hover:-translate-y-2 hover:bg-white/20 transition-all duration-300"
              style={{
                borderWidth: '3px',
                boxShadow: '0 10px 30px rgba(255, 255, 255, 0.1)',
              }}
            >
              <span className="relative z-10 flex items-center gap-3">
                Already a Member?
                <span className="group-hover:rotate-12 transition-transform duration-300">→</span>
              </span>
            </Link>
          </div>

          {/* Floating Decorative Elements */}
          <div className="mt-16 flex justify-center gap-4 animate-bounce-slow">
            <div className="w-3 h-3 bg-white rounded-full opacity-80"></div>
            <div className="w-3 h-3 bg-emerald-200 rounded-full opacity-80 animation-delay-200"></div>
            <div className="w-3 h-3 bg-teal-200 rounded-full opacity-80 animation-delay-400"></div>
          </div>

          {/* Stats Row */}
          <div className="mt-16 flex flex-wrap justify-center gap-6 md:gap-8 animate-fade-in-up-delay-2">
            <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg transform hover:scale-110 hover:rotate-1 transition-all duration-300 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold text-white">100%</div>
              <div className="text-sm text-white/90 mt-1">Eco-Friendly</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg transform hover:scale-110 hover:-rotate-1 transition-all duration-300 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold text-white">24/7</div>
              <div className="text-sm text-white/90 mt-1">Available</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg transform hover:scale-110 hover:rotate-1 transition-all duration-300 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold text-white">Free</div>
              <div className="text-sm text-white/90 mt-1">To Join</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

/* ---------- REUSABLE COMPONENTS ---------- */

function Feature({ title, icon, desc, link, buttonText, delay = "0s" }) {
  return (
    <Link
      to={link}
      className="group relative block bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 text-center transform hover:-translate-y-3 border-2 border-transparent hover:border-green-400 overflow-hidden"
      style={{
        animation: `fade-in-up 0.8s ease-out ${delay} both`,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
      }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/0 via-emerald-50/0 to-teal-50/0 group-hover:from-green-50/50 group-hover:via-emerald-50/50 group-hover:to-teal-50/50 transition-all duration-500 rounded-2xl"></div>
      
      {/* Animated background circle */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-100 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 transform group-hover:scale-150"></div>
      
      <div className="relative z-10">
        {/* Icon with enhanced animation */}
        <div className="relative inline-block mb-6">
          <div className="text-6xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 filter drop-shadow-lg">
            {icon}
          </div>
          {/* Pulsing ring effect */}
          <div className="absolute inset-0 rounded-full border-4 border-green-200 opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
        </div>
        
        <h3 className="mt-4 text-xl font-bold text-green-700 group-hover:text-green-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="mt-4 text-gray-600 text-sm leading-relaxed mb-6 group-hover:text-gray-700 transition-colors">
          {desc}
        </p>
        
        {/* Enhanced button */}
        <div className="mt-6">
          <span className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-bold rounded-full group-hover:from-green-700 group-hover:to-emerald-700 transition-all duration-300 shadow-lg group-hover:shadow-xl transform group-hover:scale-105">
            {buttonText}
            <svg
              className="ml-2 w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

function Step({ number, text, icon, delay = "0s" }) {
  return (
    <div 
      className="relative group"
      style={{
        animation: `fade-in-up 0.8s ease-out ${delay} both`
      }}
    >
      {/* Connecting arrow for desktop */}
      <div className="hidden md:block absolute top-12 -right-4 w-8 h-0.5 bg-gradient-to-r from-green-300 to-emerald-400 z-0 group-last:hidden"></div>
      
      <div className="relative z-10">
        {/* Enhanced step circle */}
        <div className="relative mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 text-white font-extrabold text-2xl shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
          {/* Pulsing ring */}
          <div className="absolute inset-0 rounded-full border-4 border-green-300 opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
          {/* Inner glow */}
          <div className="absolute inset-2 rounded-full bg-white/20 blur-sm"></div>
          <span className="relative z-10">{number}</span>
        </div>
        
        {/* Icon above number */}
        {icon && (
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-3xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
            {icon}
          </div>
        )}
        
        {/* Text with enhanced styling */}
        <div className="mt-6">
          <p className="font-bold text-gray-800 text-lg group-hover:text-green-700 transition-colors duration-300">
            {text}
          </p>
          {/* Decorative underline */}
          <div className="mt-2 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto group-hover:w-full transition-all duration-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
