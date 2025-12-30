import { Link } from "react-router-dom";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      icon: "👤",
      title: "Create Your Account",
      description: "Sign up for free and join our community of eco-warriors. It takes less than a minute!",
      color: "from-blue-500 to-blue-600",
    },
    {
      number: "2",
      icon: "📸",
      title: "Upload Waste Image",
      description: "Take a photo of your waste item using our mobile-friendly interface or upload from your gallery.",
      color: "from-purple-500 to-purple-600",
    },
    {
      number: "3",
      icon: "🤖",
      title: "AI Classification",
      description: "Our advanced AI instantly analyzes your image and classifies it as Plastic, Paper, Organic, or E-Waste.",
      color: "from-green-500 to-green-600",
    },
    {
      number: "4",
      icon: "⭐",
      title: "Earn Points & Rewards",
      description: "Get points for every upload, maintain streaks, and redeem rewards from our partner organizations.",
      color: "from-yellow-500 to-yellow-600",
    },
  ];

  return (
    <>
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
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
        
        .animate-blob {
          animation: blob 20s ease-in-out infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 px-6 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-200"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-extrabold text-green-700 mb-6">
              How It Works
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              Get started in four simple steps and begin your sustainable journey
            </p>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                    {step.number}
                  </div>
                  <div className="text-center mt-4">
                    <span className="text-6xl mb-4 block">{step.icon}</span>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Connecting Line for Desktop */}
            

            {/* Features Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 mt-16 animate-fade-in-up">
              <h2 className="text-4xl font-bold text-green-700 mb-8 text-center">
                Key Features
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { icon: "🔥", title: "Daily Streaks", desc: "Build habits with daily upload streaks" },
                  { icon: "🏆", title: "Leaderboard", desc: "Compete with others and see your ranking" },
                  { icon: "🧠", title: "Educational Quiz", desc: "Learn about recycling through fun quizzes" },
                  { icon: "🗺️", title: "Find Centers", desc: "Locate nearby recycling centers" },
                  { icon: "📊", title: "Track Progress", desc: "Monitor your environmental impact" },
                  { icon: "🎁", title: "Earn Rewards", desc: "Redeem points for exciting rewards" },
                ].map((feature, index) => (
                  <div key={index} className="text-center p-6 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                    <span className="text-4xl mb-3 block">{feature.icon}</span>
                    <h3 className="text-xl font-bold text-green-700 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-12 text-center animate-fade-in-up">
              <h2 className="text-4xl font-bold text-green-700 mb-4">Ready to Get Started?</h2>
              <p className="text-lg text-gray-700 mb-8">
                Join thousands of users making a difference today
              </p>
              <Link
                to="/register"
                className="inline-block px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-bold text-lg shadow-lg hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300"
              >
                Start Your Journey
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}












