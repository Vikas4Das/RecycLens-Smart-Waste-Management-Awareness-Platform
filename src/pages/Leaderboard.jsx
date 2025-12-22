export default function Leaderboard() {
  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold text-green-700">
        Leaderboard 🏆
      </h2>

      <div className="mt-6 bg-white p-6 rounded shadow">
        <ul className="space-y-3">
          <li className="flex justify-between">
            <span>🥇 Vikas Das</span>
            <span>120 pts</span>
          </li>
          <li className="flex justify-between">
            <span>🥈 Aman</span>
            <span>95 pts</span>
          </li>
          <li className="flex justify-between">
            <span>🥉 Neha</span>
            <span>80 pts</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
