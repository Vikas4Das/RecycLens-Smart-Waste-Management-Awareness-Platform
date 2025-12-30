import { Link } from "react-router-dom";

export default function TermsOfService() {
  const sections = [
    {
      title: "Acceptance of Terms",
      content: [
        "By accessing and using Smart Waste, you accept and agree to be bound by these Terms of Service.",
        "If you do not agree to these terms, please do not use our platform.",
        "We reserve the right to modify these terms at any time, and your continued use constitutes acceptance of any changes.",
      ],
    },
    {
      title: "User Accounts",
      content: [
        "You must be at least 13 years old to create an account.",
        "You are responsible for maintaining the confidentiality of your account credentials.",
        "You agree to provide accurate and complete information when registering.",
        "You are responsible for all activities that occur under your account.",
        "You must notify us immediately of any unauthorized use of your account.",
      ],
    },
    {
      title: "Use of Service",
      content: [
        "You agree to use Smart Waste only for lawful purposes and in accordance with these Terms.",
        "You will not use the service to upload harmful, offensive, or illegal content.",
        "You will not attempt to interfere with or disrupt the service or servers.",
        "You will not use automated systems to access the service without permission.",
        "You grant us a license to use uploaded images for classification and platform improvement.",
      ],
    },
    {
      title: "Intellectual Property",
      content: [
        "All content on Smart Waste, including text, graphics, logos, and software, is our property or licensed to us.",
        "You may not reproduce, distribute, or create derivative works without our written permission.",
        "User-generated content remains your property, but you grant us a license to use it on our platform.",
      ],
    },
    {
      title: "Points and Rewards",
      content: [
        "Points are awarded at our discretion and may be adjusted or revoked for violations.",
        "Rewards are subject to availability and may change without notice.",
        "Points have no cash value and cannot be transferred or sold.",
        "We reserve the right to modify the points system at any time.",
      ],
    },
    {
      title: "Limitation of Liability",
      content: [
        "Smart Waste is provided 'as is' without warranties of any kind.",
        "We do not guarantee the accuracy of AI classifications.",
        "We are not liable for any damages arising from your use of the platform.",
        "Our total liability is limited to the amount you paid for the service (if any).",
      ],
    },
    {
      title: "Termination",
      content: [
        "We may terminate or suspend your account at any time for violations of these Terms.",
        "You may terminate your account at any time through your account settings.",
        "Upon termination, your right to use the service will immediately cease.",
        "We may delete your account data after a reasonable period following termination.",
      ],
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
              Terms of Service
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              Please read these terms carefully before using our platform
            </p>
            <p className="text-sm text-gray-600 mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 mb-8 animate-fade-in-up">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                These Terms of Service ("Terms") govern your access to and use of the Smart Waste 
                platform. By using our service, you agree to comply with and be bound by these Terms.
              </p>
            </div>

            {sections.map((section, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-6 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h2 className="text-3xl font-bold text-green-700 mb-6">{section.title}</h2>
                <ul className="space-y-4">
                  {section.content.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-700">
                      <span className="text-green-600 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 text-center animate-fade-in-up">
              <h2 className="text-3xl font-bold text-green-700 mb-4">
                Questions About Terms?
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                If you have any questions about these Terms of Service, please contact us.
              </p>
              <Link
                to="/contact"
                className="inline-block px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-bold text-lg shadow-lg hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

























