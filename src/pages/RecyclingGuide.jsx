import { Link } from "react-router-dom";
import { useState } from "react";

export default function RecyclingGuide() {
  const [playingVideoId, setPlayingVideoId] = useState(null);

  const videos = [
    {
      id: "O_05qJg3cnM",
      title: "Recycling 101: What Can You Recycle?",
    },
    {
      id: "s4lz-z-E33A",
      title: "How Is Plastic Recycled?",
    },
    {
      id: "zO3jFCpe1dM",
      title: "The Paper Recycling Process",
    },
    {
      id: "gdzsY_I-n1U",
      title: "What Happens To Your E-Waste?",
    },
  ];

  const advancedVideos = [
    { id: "v_6uS4-32-Y", title: "How to Compost: A Beginner's Guide" },
    { id: "Yihtk312I2Y", title: "What is a Circular Economy?" },
    { id: "Echb1h_a36A", title: "Zero Waste Lifestyle: A Beginner's Guide" },
    { id: "2Yt_D_8M-k0", title: "How is Glass Recycled?" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-4">
            📚 Recycling Guide
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn how to properly recycle different types of waste and make a positive environmental impact
          </p>
        </div>

        {/* Guide Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* ... Guide cards are unchanged ... */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">🥤</span>
              <h2 className="text-2xl font-bold text-blue-700">Plastic</h2>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Clean and remove labels before recycling</li>
              <li>✓ Check the recycling number (1-7)</li>
              <li>✓ Most common recyclable: #1 (PET) and #2 (HDPE)</li>
              <li>✗ Don't recycle plastic bags or styrofoam</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-yellow-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">📄</span>
              <h2 className="text-2xl font-bold text-yellow-700">Paper</h2>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Remove staples and clips</li>
              <li>✓ Keep paper dry and clean</li>
              <li>✓ Cardboard should be flattened</li>
              <li>✗ Don't recycle paper with food residue</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">🍃</span>
              <h2 className="text-2xl font-bold text-green-700">Organic Waste</h2>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Compost fruit and vegetable scraps</li>
              <li>✓ Use compost bins or garden compost</li>
              <li>✓ Avoid meat and dairy in home compost</li>
              <li>✓ Creates nutrient-rich soil</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">💻</span>
              <h2 className="text-2xl font-bold text-purple-700">E-Waste</h2>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Take to special collection centers</li>
              <li>✓ Remove personal data before disposal</li>
              <li>✓ Contains valuable and toxic materials</li>
              <li>✗ Never throw in regular trash</li>
            </ul>
          </div>
        </div>

        {/* Video Tutorials Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
            🎬 Video Tutorials
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {videos.map((video) => (
              <div key={video.id} className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group bg-black">
                <div className="aspect-video relative">
                  {playingVideoId === video.id ? (
                    <>
                      <iframe
                        src={`https://www.youtube.com/embed/M_94Tgd5pS0?autoplay=1`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                      <button
                        onClick={() => setPlayingVideoId(null)}
                        className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 transition-colors z-10"
                        aria-label="Close video"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <div className="w-full h-full cursor-pointer relative" onClick={() => setPlayingVideoId(video.id)}>
                      <img
                        src={`https://img.youtube.com/vi/cNPEH0GOhRw/hqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-16 h-16 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-3 bg-gray-50">
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={video.title}
                    className="font-semibold text-gray-800 text-sm truncate block hover:text-green-600 transition-colors"
                  >
                    {video.title}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Video Tutorials Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
            ♻️ Advanced Sustainability Topics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {advancedVideos.map((video) => (
              <div key={video.id} className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group bg-black">
                <div className="aspect-video relative">
                  {playingVideoId === video.id ? (
                    <>
                      <iframe
                        src={`https://www.youtube.com/embed/PJnJ8mK3Q3g?autoplay=1`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                      <button
                        onClick={() => setPlayingVideoId(null)}
                        className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 transition-colors z-10"
                        aria-label="Close video"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <div className="w-full h-full cursor-pointer relative" onClick={() => setPlayingVideoId(video.id)}>
                      <img
                        src={`https://img.youtube.com/vi/PJnJ8mK3Q3g/hqdefault.jpg`}

                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-16 h-16 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-3 bg-gray-50">
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={video.title}
                    className="font-semibold text-gray-800 text-sm truncate block hover:text-green-600 transition-colors"
                  >
                    {video.title}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
            💡 Recycling Tips
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="text-2xl">♻️</span>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Know Your Local Rules</h3>
                  <p className="text-gray-600">Recycling rules vary by location. Check your local municipality's guidelines.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">🧹</span>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Clean Before Recycling</h3>
                  <p className="text-gray-600">Rinse containers to remove food residue. Dirty items may contaminate batches.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="text-2xl">📦</span>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Reduce and Reuse First</h3>
                  <p className="text-gray-600">The best waste is waste that's never created. Reuse items when possible.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">🏷️</span>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Check Labels</h3>
                  <p className="text-gray-600">Look for recycling symbols and numbers. When in doubt, leave it out.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/upload"
            className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300"
          >
            Start Recycling Now 🚀
          </Link>
        </div>
      </div>
    </div>
  );
}
