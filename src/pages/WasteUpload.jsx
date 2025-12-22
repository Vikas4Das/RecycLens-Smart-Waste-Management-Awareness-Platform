import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { classifyWaste } from "../services/api";

export default function WasteUpload() {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const { addUpload } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!imageFile) {
      setError("Please select an image first");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const classificationResult = await classifyWaste(imageFile);
      
      // Add upload and points to user context
      addUpload(classificationResult.wasteType);
      
      setResult(classificationResult);
    } catch (err) {
      setError("Failed to analyze waste. Please try again.");
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setImageFile(null);
    setImagePreview(null);
    setResult(null);
    setError(null);
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="min-h-screen bg-green-50 p-6 md:p-10">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">
          Upload Waste Image 🗑️
        </h2>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          {/* Upload Section */}
          {!result && (
            <>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Waste Image
                </label>
                <div className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center hover:border-green-500 transition">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="image-upload"
                    disabled={isAnalyzing}
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer block"
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-64 mx-auto rounded-lg shadow"
                      />
                    ) : (
                      <div>
                        <div className="text-4xl mb-2">📷</div>
                        <p className="text-gray-600">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                          PNG, JPG, JPEG up to 5MB
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={handleAnalyze}
                  disabled={!imageFile || isAnalyzing}
                  className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isAnalyzing ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      🔍 Analyze Waste
                    </>
                  )}
                </button>

                {imagePreview && (
                  <button
                    onClick={handleReset}
                    disabled={isAnalyzing}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition disabled:opacity-50"
                  >
                    Reset
                  </button>
                )}
              </div>
            </>
          )}

          {/* Result Section */}
          {result && (
            <div className="text-center">
              <div className="mb-6">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Uploaded waste"
                    className="max-h-64 mx-auto rounded-lg shadow mb-4"
                  />
                )}
              </div>

              <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6 mb-6">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-green-700 mb-2">
                  Classification Result
                </h3>
                <p className="text-xl font-semibold text-green-600 mb-2">
                  Waste Type: {result.wasteType}
                </p>
                <p className="text-sm text-gray-600">
                  Confidence: {result.confidence}%
                </p>
                <div className="mt-4 p-4 bg-white rounded border border-green-200">
                  <p className="text-green-700 font-semibold">
                    🎉 +10 Points Added!
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {result.message}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-green-700 transition"
                >
                  View Dashboard
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 border-2 border-green-600 text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition"
                >
                  Upload Another
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>💡 Tip:</strong> Upload clear images of waste items for better
            classification accuracy. You earn 10 points for each successful upload!
          </p>
        </div>
      </div>
    </div>
  );
}
