
  <div class="container">
    <header>
      <div class="logo">RL</div>
      <div>
        <h1>RecycLens — Smart Waste Management & Recycling Awareness</h1>
        <div class="subtitle">SDG 12 • Responsible Consumption & Production — Team: Algo Avengers</div>
        <div class="badge-row" aria-hidden="true">
          <span class="badge">React</span>
          <span class="badge">Node.js</span>
          <span class="badge">MongoDB</span>
          <span class="badge">TensorFlow.js</span>
        </div>
      </div>
    </header>

    <section class="card">
      <h2>🚀 Project Overview</h2>
      <p>RecycLens is a web platform that promotes eco-friendly habits through <strong>AI-powered waste identification</strong>, <strong>reward points</strong>, gamification, and micro-learning modules. Users can scan waste, learn correct disposal, log daily recycling, and locate nearby recycling centers.</p>
    </section>

    <div class="grid">
      <main class="card">
        <h2>🌟 Key Features</h2>
        <ul>
          <li><strong>AI Waste Identification</strong> — Upload image; in-browser TensorFlow.js model classifies Plastic, Paper, Organic, E-Waste, Other.</li>
          <li><strong>Daily Waste Logging</strong> — Track activity, streaks, and progress.</li>
          <li><strong>Rewards & Gamification</strong> — Points, badges, leaderboards; points convertible to coupons (future).</li>
          <li><strong>Recycling Center Locator</strong> — Map-based search + community pinning.</li>
          <li><strong>Awareness & Quizzes</strong> — Short lessons and MCQs to earn points.</li>
          <li><strong>Analytics Dashboard</strong> — Visualize impact and trends.</li>
        </ul>

        <h2>🛠 Tech Stack</h2>
        <ul>
          <li><strong>Frontend:</strong> React (Vite), Tailwind CSS (optional), React Chart.js, Google Maps API, TensorFlow.js</li>
          <li><strong>Backend:</strong> Node.js, Express, JWT Auth, Multer (file uploads)</li>
          <li><strong>Database:</strong> MongoDB (Mongo Atlas)</li>
          <li><strong>Deployment:</strong> Vercel (frontend), Render/Railway (backend)</li>
        </ul>

        <h2>📁 Folder Structure</h2>
        <pre><code>RecycLens/
├─ client/             # React Frontend
│   └─ src/
│       ├─ components/
│       ├─ pages/
│       ├─ assets/
│       ├─ context/
│       └─ services/api.js
└─ server/             # Node.js Backend
    ├─ controllers/
    ├─ models/
    ├─ routes/
    ├─ middleware/
    └─ server.js
</code></pre>

        <h2>⚙️ Installation & Setup</h2>
        <p>Quick commands to start locally:</p>
        <pre><code># clone
git clone https://github.com/YOUR_GITHUB_USERNAME/RecycLens.git
cd RecycLens

# client
cd client
npm install
npm run dev

# server
cd ../server
npm install
npm start
</code></pre>

        <p>Create <code>server/.env</code> with:</p>
        <pre><code>MONGO_URI=your_mongo_link
JWT_SECRET=your_secret_key
GOOGLE_MAPS_API_KEY=your_api_key
</code></pre>

        <h2>🧠 AI Model</h2>
        <p>Lightweight CNN model running in-browser with TensorFlow.js. Classifies waste categories without server inference to keep latency low and privacy intact.</p>

        <h2>📌 Process Flow</h2>
        <pre><code>User → Login/Signup
  ↓
Upload Image / Select Waste Type
  ↓
AI Classifies (Plastic/Paper/Organic/E-Waste)
  ↓
Disposal Guidance → Log Activity → Earn Points → Dashboard → Leaderboard → Map Locator
</code></pre>

        <h2>🎯 Future Scope</h2>
        <ul>
          <li>IoT Smart Bins integration</li>
          <li>NFT-based green badges & Metamask integration</li>
          <li>Municipal / NGO partnerships</li>
          <li>School & community deployments</li>
        </ul>

        <h2>🤝 Contributing</h2>
        <p>Pull requests welcome. For major changes, open an issue first to discuss. Follow standard GitHub flow & include tests where possible.</p>
      </main>

      <aside class="card" aria-labelledby="project-meta">
        <h3 id="project-meta">Project Info</h3>

        <p><strong>Project:</strong> RecycLens — Smart Waste Management</p>
        <p><strong>Team:</strong> Algo Avengers (Leader: Vikas Das)</p>
        <p><strong>Hackathon:</strong> Ranchi Hacks × GDG Ranchi</p>

        <h4>Badges / Quick Links</h4>
        <p>
          <!-- Replace links with real badges if desired -->
          <a href="#" title="License">[MIT]</a> &nbsp;
          <a href="#" title="Issues">[Issues]</a>
        </p>

        <h4>Contact</h4>
        <p>Email: <a href="mailto:vikasdas@example.com">vikasdas@example.com</a></p>

        <h4>License</h4>
        <p>MIT © 2025</p>
      </aside>
    </div>

    <footer class="card">
      <strong>Get started:</strong> Create a working branch, implement the AI scanner & basic logging first, then add maps and gamification. Good luck at the hackathon — make it visual and demo-ready!
    </footer>
  </div>
