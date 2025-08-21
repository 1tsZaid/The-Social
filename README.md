TheSocial 🚀

A social media platform that connects users based on their real-world location. Users are automatically grouped into location-based communities, where they can:

📌 Post updates (text, photos)

💬 Chat with other community members

🎮 Play interactive games

🛠️ Tech Stack
Backend

Node.js + Express → API & WebSocket server

PostgreSQL + Prisma → Database & ORM

Socket.IO → Real-time messaging

JWT (Access + Refresh tokens) → Authentication

Helmet + CORS + Rate Limiting → Security

Frontend

React Native (Expo) → Mobile app

Expo Router → Navigation

Socket.IO Client → Real-time chat

Expo Location API → Location-based grouping

Axios → API calls

⚙️ Setup & Installation
1️⃣ Clone the repository
git clone https://github.com/your-username/thesocial.git
cd thesocial

2️⃣ Backend Setup
cd backend
npm install

Configure Environment

Create a .env file in backend/ (already provided in your case):

# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/thesocial"

# JWT Secrets
JWT_ACCESS_SECRET="jwt-access-secret-key"
JWT_REFRESH_SECRET="jwt-refresh-secret-key"

# JWT Expiration
JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

# Server
PORT=3000
NODE_ENV="development"

# CORS
CORS_ORIGIN="http://localhost:3000"
CORS_ORIGIN_DEV="http://localhost:8081"

Run Migrations & Generate Prisma Client
npm run prisma:migrate
npm run prisma:generate

Start Backend

Development mode (with hot reload):

npm run dev


Production mode:

npm run build
npm start

3️⃣ Frontend Setup
cd frontend/TheSocial
npm install

Start App
npx expo start