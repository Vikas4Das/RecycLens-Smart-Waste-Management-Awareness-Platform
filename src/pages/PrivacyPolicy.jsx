import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Information We Collect",
      content: [
        "Personal Information: When you register, we collect your name, email address, and any other information you provide.",
        "Usage Data: We collect information about how you use our platform, including waste uploads, quiz results, and feature usage.",
        "Device Information: We may collect device-specific information such as your device type, operating system, and browser type.",
        "Location Data: With your permission, we collect location data to help you find nearby recycling centers.",
      ],
    },
    {
      title: "How We Use Your Information",
      content: [
        "To provide and improve our services, including AI waste classification and personalized recommendations.",
        "To process your waste uploads and calculate your points and streaks.",
        "To communicate with you about your account, updates, and promotional offers.",
        "To analyze usage patterns and improve our platform's functionality.",
        "To comply with legal obligations and protect our rights.",
      ],
    },
    {
      title: "Data Security",
      content: [
        "We implement industry-standard security measures to protect your personal information.",
        "All data is encrypted in transit and at rest using secure protocols.",
        "We regularly update our security practices to address new threats.",
        "However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.",
      ],
    },
    {
      title: "Data Sharing",
      content: [
        "We do not sell your personal information to third parties.",
        "We may share anonymized, aggregated data for research and analytics purposes.",
        "We may share information with service providers who assist us in operating our platform.",
        "We may disclose information if required by law or to protect our rights and safety.",
      ],
    },
    {
      title: "Your Rights",
      content: [
        "You have the right to access, update, or delete your personal information.",
        "You can opt-out of marketing communications at any time.",
        "You can request a copy of your data or request data deletion.",
        "You can manage your privacy settings through your account dashboard.",
      ],
    },
    {
      title: "Cookies and Tracking",
      content: [
        "We use cookies and similar technologies to enhance your experience.",
        "Cookies help us remember your preferences and improve site functionality.",
        "You can control cookie settings through your browser preferences.",
        "Some features may not work properly if cookies are disabled.",
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
              Privacy Policy
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              Your privacy is important to us
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
                At Smart Waste, we are committed to protecting your privacy. This Privacy Policy 
                explains how we collect, use, disclose, and safeguard your information when you use 
                our platform.
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
                Questions About Privacy?
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                If you have any questions about this Privacy Policy, please contact us.
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

























