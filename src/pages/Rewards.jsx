export default function Rewards() {
  const userPoints = 120; // later from backend

  const rewards = [
    { title: "₹50 Amazon Coupon", points: 100 },
    { title: "₹100 Flipkart Coupon", points: 200 },
    { title: "Plant a Tree 🌱", points: 50 },
    { title: "Eco Bottle", points: 150 },
  ];

  return (
    <div className="min-h-screen bg-green-50 p-6 md:p-10">
      <h2 className="text-3xl font-bold text-green-700 mb-4">
        Redeem Rewards 🎁
      </h2>

      <p className="text-gray-600 mb-10">
        Your Points: <span className="font-semibold">{userPoints}</span>
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rewards.map((reward, index) => {
          const canRedeem = userPoints >= reward.points;

          return (
            <div
              key={index}
              className={`bg-white p-6 rounded-xl shadow border 
              ${canRedeem ? "border-green-400" : "border-gray-200 opacity-60"}`}
            >
              <h3 className="text-lg font-semibold text-green-700">
                {reward.title}
              </h3>

              <p className="mt-2 text-gray-600">
                Required Points: {reward.points}
              </p>

              <button
                disabled={!canRedeem}
                className={`mt-4 w-full py-2 rounded font-semibold transition
                ${
                  canRedeem
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                {canRedeem ? "Redeem Now" : "Not Enough Points"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
