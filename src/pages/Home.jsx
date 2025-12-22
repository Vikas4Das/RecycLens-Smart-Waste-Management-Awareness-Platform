import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-green-50 min-h-screen">
      {/* HERO SECTION */}
      <section className="text-center px-6 py-24 bg-gradient-to-br from-green-100 to-green-50">
        <h1 className="text-5xl md:text-6xl font-extrabold text-green-700">
          Smart Waste Management 🌍
        </h1>

        <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-gray-700">
          An AI-powered platform that helps you classify waste, track recycling
          habits, earn rewards, and build a cleaner, greener future.
        </p>

        <div className="mt-10 flex justify-center gap-6 flex-wrap">
          <Link
            to="/register"
            className="px-8 py-3 bg-green-600 text-white rounded-full font-semibold shadow hover:bg-green-700 transition"
          >
            Get Started 🚀
          </Link>

          <Link
            to="/login"
            className="px-8 py-3 border-2 border-green-600 text-green-700 rounded-full font-semibold hover:bg-green-100 transition"
          >
            Login
          </Link>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-green-700">
          Why Choose Smart Waste?
        </h2>

        <div className="grid gap-6 mt-14 sm:grid-cols-2 lg:grid-cols-4">
          <Feature
            title="AI Waste Detection"
            icon="🤖"
            desc="Upload a waste image and let AI classify it as Plastic, Paper, Organic, or E-Waste."
            link="/upload"
            buttonText="Try Now"
          />

          <Feature
            title="Gamified Streaks"
            icon="🔥"
            desc="Build daily eco-friendly habits with streaks and reward points."
            link="/dashboard"
            buttonText="View Streak"
          />

          <Feature
            title="Recycling Quiz"
            icon="🧠"
            desc="Test your environmental knowledge and earn points through fun quizzes."
            link="/quiz"
            buttonText="Take Quiz"
          />

          <Feature
            title="Nearby Centers"
            icon="🗺️"
            desc="Find nearby recycling centers using real-time Google Maps integration."
            link="/map"
            buttonText="Find Centers"
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-20 px-6">
        <h2 className="text-3xl font-bold text-center text-green-700">
          How It Works
        </h2>

        <div className="mt-14 max-w-5xl mx-auto grid gap-10 md:grid-cols-4 text-center">
          <Step number="1" text="Register & Login" />
          <Step number="2" text="Upload Waste Image" />
          <Step number="3" text="AI Classifies Waste" />
          <Step number="4" text="Earn Points & Rewards" />
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-green-600 text-white text-center py-20 px-6">
        <h2 className="text-4xl font-bold">
          Join the Green Revolution 🌱
        </h2>

        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Small daily actions can create a massive environmental impact.
          Start your sustainable journey today.
        </p>

        <Link
          to="/register"
          className="inline-block mt-8 px-10 py-4 bg-white text-green-700 font-bold rounded-full shadow hover:bg-green-100 transition"
        >
          Start Now
        </Link>
      </section>

    </div>
  );
}

/* ---------- REUSABLE COMPONENTS ---------- */

function Feature({ title, icon, desc, link, buttonText }) {
  return (
    <Link
      to={link}
      className="block bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center transform hover:-translate-y-2 border-2 border-transparent hover:border-green-400 group"
    >
      <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="mt-4 text-xl font-semibold text-green-700 group-hover:text-green-600 transition-colors">
        {title}
      </h3>
      <p className="mt-3 text-gray-600 text-sm leading-relaxed mb-4">
        {desc}
      </p>
      <div className="mt-4">
        <span className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-full group-hover:bg-green-700 transition-colors">
          {buttonText}
          <svg
            className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}

function Step({ number, text }) {
  return (
    <div>
      <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-green-600 text-white font-bold">
        {number}
      </div>
      <p className="mt-4 font-medium text-gray-700">{text}</p>
    </div>
  );
}
