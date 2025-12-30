import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, this would send to a backend API
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              We'd love to hear from you! Get in touch with our team
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 animate-fade-in-up">
                <h2 className="text-3xl font-bold text-green-700 mb-6">Send us a Message</h2>
                
                {submitted && (
                  <div className="mb-6 p-4 bg-green-100 border-2 border-green-400 text-green-700 rounded-lg">
                    <p className="font-semibold">✓ Message sent successfully!</p>
                    <p className="text-sm mt-1">We'll get back to you soon.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-lg font-bold text-lg shadow-lg hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-6 animate-fade-in-up">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
                  <h2 className="text-3xl font-bold text-green-700 mb-6">Get in Touch</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">📧</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">Email</h3>
                        <p className="text-gray-600">info@smartwaste.com</p>
                        <p className="text-gray-600">support@smartwaste.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">📞</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">Phone</h3>
                        <p className="text-gray-600">+1 (555) 123-4567</p>
                        <p className="text-sm text-gray-500">Mon-Fri, 9AM-6PM EST</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">📍</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">Address</h3>
                        <p className="text-gray-600">
                          123 Green Street<br />
                          Eco City, EC 12345<br />
                          United States
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">⏰</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">Business Hours</h3>
                        <p className="text-gray-600">
                          Monday - Friday: 9:00 AM - 6:00 PM<br />
                          Saturday: 10:00 AM - 4:00 PM<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
                  <h3 className="text-2xl font-bold text-green-700 mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((social) => (
                      <a
                        key={social}
                        href="#"
                        className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition-all"
                      >
                        {social[0]}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
















