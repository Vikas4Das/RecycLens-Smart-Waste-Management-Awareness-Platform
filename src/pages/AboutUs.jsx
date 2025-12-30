import { Link } from "react-router-dom";

export default function AboutUs() {
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
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
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
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-extrabold text-green-700 mb-6">
              About Smart Waste
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              Empowering communities to build a sustainable future through AI-powered waste management
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 mb-12 animate-fade-in-up">
              <div className="text-center mb-8">
                <span className="text-6xl mb-4 block">🎯</span>
                <h2 className="text-4xl font-bold text-green-700 mb-4">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
                At Smart Waste, we believe that every small action counts in the fight against environmental degradation. 
                Our mission is to make waste management accessible, engaging, and rewarding for everyone. We combine 
                cutting-edge AI technology with gamification to inspire individuals and communities to adopt sustainable 
                waste disposal practices.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                { icon: "🌱", title: "Sustainability", desc: "Committed to environmental protection and sustainable practices" },
                { icon: "🤖", title: "Innovation", desc: "Leveraging AI to make waste management smarter and easier" },
                { icon: "👥", title: "Community", desc: "Building a global community of eco-conscious individuals" },
              ].map((value, index) => (
                <div key={index} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow animate-fade-in-up">
                  <span className="text-5xl mb-4 block">{value.icon}</span>
                  <h3 className="text-2xl font-bold text-green-700 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.desc}</p>
                </div>
              ))}
            </div>

            {/* Story Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 animate-fade-in-up">
              <h2 className="text-4xl font-bold text-green-700 mb-6 text-center">Our Story</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-4">
                  Smart Waste was born from a simple observation: waste management is one of the most critical 
                  environmental challenges of our time, yet many people find it confusing and inconvenient. 
                  Traditional recycling programs often lack engagement and clear guidance.
                </p>
                <p className="mb-4">
                  In 2024, our team of environmental enthusiasts and tech innovators came together with a vision: 
                  to create a platform that makes waste classification as easy as taking a photo, and recycling as 
                  rewarding as playing a game.
                </p>
                <p>
                  Today, Smart Waste serves thousands of users worldwide, helping them make informed decisions about 
                  waste disposal, track their environmental impact, and earn rewards for their sustainable actions. 
                  We're continuously evolving our AI models and expanding our features to make waste management even 
                  more accessible and effective.
                </p>
              </div>
            </div>

            {/* Team Section */}
            <div className="mt-12 text-center">
              <h2 className="text-4xl font-bold text-green-700 mb-8">Join Our Mission</h2>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                Ready to make a difference? Start your sustainable journey today!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/register"
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-bold text-lg shadow-lg hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300"
                >
                  Get Started
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 border-2 border-green-600 text-green-700 rounded-full font-bold text-lg hover:bg-green-50 transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
















