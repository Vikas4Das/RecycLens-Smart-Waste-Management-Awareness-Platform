import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Which of the following is recyclable?",
    options: ["Plastic Bottles", "Styrofoam", "Battery", "Medical Waste"],
    correctAnswer: 0,
    points: 10,
    explanation: "Plastic bottles are recyclable and should be properly sorted.",
  },
  {
    id: 2,
    question: "What should you do with old batteries?",
    options: [
      "Throw in regular trash",
      "Recycle at special collection points",
      "Burn them",
      "Bury in garden",
    ],
    correctAnswer: 1,
    points: 15,
    explanation: "Batteries contain toxic materials and must be recycled at special collection points.",
  },
  {
    id: 3,
    question: "How should you prepare glass bottles for recycling?",
    options: [
      "Keep labels and caps on",
      "Remove labels and caps, rinse clean",
      "Break them into pieces",
      "Mix with plastic",
    ],
    correctAnswer: 1,
    points: 10,
    explanation: "Glass should be cleaned, with labels and caps removed for proper recycling.",
  },
  {
    id: 4,
    question: "Which plastic number is most commonly recyclable?",
    options: ["#1 (PET)", "#3 (PVC)", "#6 (PS)", "#7 (Other)"],
    correctAnswer: 0,
    points: 15,
    explanation: "Plastic #1 (PET) is the most commonly accepted type for recycling.",
  },
  {
    id: 5,
    question: "What is the best way to dispose of organic waste?",
    options: [
      "Landfill",
      "Composting",
      "Incineration",
      "Ocean dumping",
    ],
    correctAnswer: 1,
    points: 10,
    explanation: "Composting turns organic waste into nutrient-rich soil.",
  },
  {
    id: 6,
    question: "How many times can aluminum be recycled?",
    options: [
      "Once",
      "5-10 times",
      "Infinitely",
      "Never",
    ],
    correctAnswer: 2,
    points: 20,
    explanation: "Aluminum can be recycled infinitely without losing quality!",
  },
  {
    id: 7,
    question: "Which material takes the longest to decompose in a landfill?",
    options: [
      "Paper (2-4 weeks)",
      "Plastic Bottle (450 years)",
      "Organic waste (2-6 weeks)",
      "Cotton (2-5 months)",
    ],
    correctAnswer: 1,
    points: 15,
    explanation: "Plastic bottles can take up to 450 years to decompose, making recycling crucial!",
  },
  {
    id: 8,
    question: "What percentage of a plastic bottle is actually recycled?",
    options: [
      "100%",
      "30%",
      "9%",
      "50%",
    ],
    correctAnswer: 2,
    points: 20,
    explanation: "Only about 9% of plastic is recycled. We need to do better!",
  },
  {
    id: 9,
    question: "Which item should NOT go in the recycling bin?",
    options: [
      "Clean cardboard",
      "Pizza boxes with grease",
      "Aluminum cans",
      "Glass bottles",
    ],
    correctAnswer: 1,
    points: 10,
    explanation: "Greasy pizza boxes contaminate recycling. They should be composted instead.",
  },
  {
    id: 10,
    question: "What is the '3 R's' of waste management?",
    options: [
      "Reduce, Reuse, Recycle",
      "Remove, Replace, Restore",
      "Read, Write, Remember",
      "Reduce, Remove, Replace",
    ],
    correctAnswer: 0,
    points: 15,
    explanation: "Reduce, Reuse, Recycle - the three fundamental principles of waste management!",
  },
];

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  
  const { user, addPoints } = useContext(AuthContext);
  const navigate = useNavigate();

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (isAnswerSelected) return; // Prevent changing answer after selection
    
    setSelectedAnswer(answerIndex);
    setIsAnswerSelected(true);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const questionPoints = isCorrect ? currentQuestion.points : 0;

    // Save answer
    const answerData = {
      questionId: currentQuestion.id,
      selectedAnswer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
      points: questionPoints,
    };
    setAnswers([...answers, answerData]);

    // Update score
    if (isCorrect) {
      setScore(score + 1);
      setEarnedPoints(earnedPoints + questionPoints);
    }

    // Move to next question or show results
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswerSelected(false);
    } else {
      // Quiz finished - add points to user
      if (earnedPoints + questionPoints > 0) {
        addPoints(earnedPoints + questionPoints);
      }
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setEarnedPoints(0);
    setAnswers([]);
    setQuizStarted(false);
    setIsAnswerSelected(false);
  };

  const getScorePercentage = () => {
    return Math.round((score / totalQuestions) * 100);
  };

  const getResultMessage = () => {
    const percentage = getScorePercentage();
    if (percentage >= 80) {
      return {
        title: "🎉 Excellent!",
        message: "You're a recycling expert!",
        color: "text-green-600",
        bgColor: "bg-green-100",
      };
    } else if (percentage >= 60) {
      return {
        title: "👍 Good Job!",
        message: "You know a lot about recycling!",
        color: "text-blue-600",
        bgColor: "bg-blue-100",
      };
    } else if (percentage >= 40) {
      return {
        title: "💪 Keep Learning!",
        message: "You're on the right track!",
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
      };
    } else {
      return {
        title: "📚 Study More!",
        message: "Keep learning about recycling!",
        color: "text-orange-600",
        bgColor: "bg-orange-100",
      };
    }
  };

  // Quiz Start Screen
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-green-50 p-6 md:p-10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 text-center">
            <div className="text-6xl mb-6">🧠</div>
            <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
              Recycling Quiz
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Test your knowledge about recycling and waste management!
            </p>

            <div className="bg-green-50 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-semibold text-green-700 mb-3">Quiz Details:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span>📝</span> <span>{totalQuestions} questions</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>⏱️</span> <span>No time limit</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>⭐</span> <span>Earn points for correct answers</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>🎯</span> <span>Get explanations for each answer</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleStartQuiz}
              className="px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-green-700 transition transform hover:scale-105"
            >
              Start Quiz 🚀
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  if (showResult) {
    const result = getResultMessage();
    const totalPossiblePoints = QUIZ_QUESTIONS.reduce(
      (sum, q) => sum + q.points,
      0
    );

    return (
      <div className="min-h-screen bg-green-50 p-6 md:p-10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            {/* Result Header */}
            <div className={`text-center p-8 rounded-xl mb-8 ${result.bgColor}`}>
              <div className="text-6xl mb-4">{result.title.split(" ")[0]}</div>
              <h2 className={`text-3xl font-bold mb-2 ${result.color}`}>
                {result.title.split(" ").slice(1).join(" ")}
              </h2>
              <p className="text-lg text-gray-700">{result.message}</p>
            </div>

            {/* Score Display */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{score}</div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-red-600">
                  {totalQuestions - score}
                </div>
                <div className="text-sm text-gray-600">Incorrect</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">
                  {getScorePercentage()}%
                </div>
                <div className="text-sm text-gray-600">Score</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  +{earnedPoints}
                </div>
                <div className="text-sm text-gray-600">Points</div>
              </div>
            </div>

            {/* Points Breakdown */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-800 mb-4">
                Points Breakdown:
              </h3>
              <div className="space-y-2">
                {answers.map((answer, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 bg-white rounded"
                  >
                    <span className="text-sm">
                      Question {answer.questionId}:{" "}
                      {answer.isCorrect ? "✅ Correct" : "❌ Wrong"}
                    </span>
                    <span
                      className={`font-semibold ${
                        answer.isCorrect ? "text-green-600" : "text-gray-400"
                      }`}
                    >
                      {answer.isCorrect ? `+${answer.points}` : "+0"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-300 flex justify-between items-center">
                <span className="font-bold text-gray-800">Total Earned:</span>
                <span className="text-2xl font-bold text-green-600">
                  +{earnedPoints} points
                </span>
              </div>
              <div className="mt-2 flex justify-between items-center text-sm text-gray-600">
                <span>Total Possible:</span>
                <span>{totalPossiblePoints} points</span>
              </div>
            </div>

            {/* Current User Points */}
            <div className="bg-green-100 border-2 border-green-400 rounded-lg p-4 mb-8 text-center">
              <p className="text-sm text-gray-700 mb-1">Your Total Points:</p>
              <p className="text-3xl font-bold text-green-700">
                {user?.points || 0} ⭐
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleRestart}
                className="flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
              >
                🔄 Retake Quiz
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="flex-1 px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
              >
                📊 Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Question Screen
  return (
    <div className="min-h-screen bg-green-50 p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span className="text-sm font-semibold text-green-600">
              Score: {score}/{totalQuestions}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                {currentQuestion.question}
              </h2>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                +{currentQuestion.points} pts
              </span>
            </div>
          </div>

          {/* Answer Options */}
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const showCorrect = isAnswerSelected && index === currentQuestion.correctAnswer;
              const showIncorrect = isAnswerSelected && isSelected && !showCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={isAnswerSelected}
                  className={`w-full p-4 rounded-lg text-left transition-all ${
                    showCorrect
                      ? "bg-green-100 border-2 border-green-500"
                      : showIncorrect
                      ? "bg-red-100 border-2 border-red-500"
                      : isSelected
                      ? "bg-blue-100 border-2 border-blue-500"
                      : "bg-gray-50 border-2 border-transparent hover:border-green-300 hover:bg-green-50"
                  } ${isAnswerSelected ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">{option}</span>
                    {showCorrect && (
                      <span className="text-green-600 font-bold">✓ Correct!</span>
                    )}
                    {showIncorrect && (
                      <span className="text-red-600 font-bold">✗ Wrong</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {isAnswerSelected && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                selectedAnswer === currentQuestion.correctAnswer
                  ? "bg-green-50 border border-green-200"
                  : "bg-orange-50 border border-orange-200"
              }`}
            >
              <p className="text-sm text-gray-700">
                <strong>Explanation:</strong> {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* Next Button */}
          <button
            onClick={handleNextQuestion}
            disabled={!isAnswerSelected}
            className="w-full py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed text-lg"
          >
            {currentQuestionIndex < QUIZ_QUESTIONS.length - 1
              ? "Next Question →"
              : "Finish Quiz ✓"}
          </button>

          {/* Current Points Display */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">Points Earned So Far:</p>
            <p className="text-2xl font-bold text-green-600">
              +{earnedPoints + (isAnswerSelected && selectedAnswer === currentQuestion.correctAnswer ? currentQuestion.points : 0)} ⭐
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
