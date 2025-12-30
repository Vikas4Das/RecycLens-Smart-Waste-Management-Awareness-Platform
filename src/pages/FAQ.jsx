import { useState } from "react";
import { Link } from "react-router-dom";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does the AI waste classification work?",
      answer: "Our AI uses advanced machine learning models trained on thousands of waste images. Simply upload a photo of your waste item, and our AI will analyze it to determine if it's Plastic, Paper, Organic, or E-Waste. The classification happens instantly and gets more accurate with each use.",
    },
    {
      question: "How do I earn points?",
      answer: "You earn 10 points for every waste item you upload. You can also earn bonus points by maintaining daily streaks, completing recycling quizzes, and participating in special challenges. Points can be redeemed for rewards from our partner organizations.",
    },
    {
      question: "What happens to my streak if I miss a day?",
      answer: "If you miss uploading waste for a day, your streak will reset to 0. However, you can start a new streak immediately by uploading waste the next day. We encourage daily uploads to build sustainable habits!",
    },
    {
      question: "Is my data secure and private?",
      answer: "Yes, absolutely! We take your privacy seriously. All uploaded images are processed securely and are not shared with third parties. Your personal information is encrypted and stored safely. Please read our Privacy Policy for more details.",
    },
    {
      question: "Can I use Smart Waste without creating an account?",
      answer: "You can browse some features without an account, but to upload waste, earn points, track your progress, and access all features, you'll need to create a free account. Registration takes less than a minute!",
    },
    {
      question: "How accurate is the waste classification?",
      answer: "Our AI has been trained on extensive datasets and achieves high accuracy rates. However, for best results, ensure your photos are clear and well-lit. If you believe a classification is incorrect, you can report it, which helps us improve our AI model.",
    },
    {
      question: "Where can I find recycling centers near me?",
      answer: "Use our Map feature to find nearby recycling centers. We integrate with Google Maps to show you the closest facilities for different types of waste. You can filter by waste type and see directions to each location.",
    },
    {
      question: "What rewards can I redeem with my points?",
      answer: "Rewards vary and may include discounts from eco-friendly brands, gift cards, merchandise, and special offers from our partners. Check the Rewards page regularly as new rewards are added frequently!",
    },
    {
      question: "How do I reset my password?",
      answer: "If you've forgotten your password, click on 'Forgot password?' on the login page. You'll receive an email with instructions to reset your password. Make sure to check your spam folder if you don't see it.",
    },
    {
      question: "Can businesses use Smart Waste?",
      answer: "Yes! We offer solutions for businesses looking to improve their waste management practices. Contact us through our Contact page to learn more about our enterprise solutions and how we can help your organization become more sustainable.",
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
              Frequently Asked Questions
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              Find answers to common questions about Smart Waste
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4 mb-12">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-green-50 transition-colors"
                  >
                    <span className="font-bold text-lg text-gray-800">{faq.question}</span>
                    <span className="text-2xl text-green-600">
                      {openIndex === index ? "−" : "+"}
                    </span>
                  </button>
                  {openIndex === index && (
                    <div className="px-6 py-4 border-t border-gray-200 bg-green-50">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Still Have Questions Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 text-center animate-fade-in-up">
              <span className="text-6xl mb-4 block">💬</span>
              <h2 className="text-3xl font-bold text-green-700 mb-4">
                Still Have Questions?
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Can't find what you're looking for? We're here to help!
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

























