#RecycLens – Smart Waste Management Platform
SDG 12: Responsible Consumption & Production

RecycLens is a smart platform focused on waste identification, recycling awareness, gamification, and tracking user recycling habits.
It helps users identify waste through AI, log daily segregation activities, earn rewards, and locate recycling centers.

⭐ Features

AI Waste Identification (Plastic, Paper, Organic, E-Waste, Others)

Daily Waste Log & Streaks

Reward Points & Badges

Leaderboards

Recycling Center Locator (Map)

Awareness Articles + Quizzes

Analytics Dashboard

🛠 Tech Stack

Frontend: React (Vite), Tailwind CSS, TensorFlow.js, Chart.js
Backend: Node.js, Express.js, JWT Authentication
Database: MongoDB (Mongoose)
Deployment: Vercel, Render/Railway, Mongo Atlas

📁 Folder Structure
RecycLens/
│── client/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── assets/
│       ├── context/
│       └── services/
│
└── server/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    └── server.js

⚙️ Installation
1. Clone the repository
git clone https://github.com/username/RecycLens.git
cd RecycLens

2. Install frontend dependencies
cd client
npm install
npm run dev

3. Install backend dependencies
cd server
npm install
npm start

4. Create environment variables

Inside server/.env:

MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret_key
GOOGLE_MAPS_API_KEY=your_api_key

🔍 AI Model (TensorFlow.js)

Runs directly in the browser

Fast and lightweight

Trained on mixed waste datasets

Classifies waste into 4–5 categories

📌 Workflow
User Login/Signup
        ↓
Upload Waste Image
        ↓
AI Identifies Waste Category
        ↓
User Logs Activity & Gets Tips
        ↓
Earn Points + Maintain Streak
        ↓
Dashboard & Leaderboard
        ↓
Locate Nearby Recycling Centers

🚀 Future Enhancements

IoT Smart Dustbins

Recycling Marketplace

Carbon Footprint Tracking

School/College Eco Competitions

🤝 Contributing

Contributions and pull requests are welcome.

📄 License

MIT License © 2025

👤 Team

Algo Avengers
Team Lead: Vikas Das
Created for Ranchi Hacks × GDG Ranchi
