# TheSocial 🚀

A **location-based social media platform** that bridges the gap between online and real-world interaction. Users are automatically grouped into communities based on their physical location, where they can:

📌 **Post updates** – Share text and photos
💬 **Chat** – Engage in real-time conversations with nearby users
🎮 **Play games** – Interactive community mini-games

---

## 🛠️ Tech Stack

### **Backend**

* **Node.js + Express** → REST API
* **PostgreSQL + Prisma** → Database & ORM
* **Socket.IO** → Real-time WebSocket messaging
* **JWT (Access + Refresh tokens)** → Authentication
* **Helmet, CORS, Rate Limiting** → Security
* **Google Gemini API** → Content Moderation

### **Frontend**

* **React Native (Expo)** → Mobile app & web support
* **Expo Router** → Navigation
* **Socket.IO Client** → Live chat integration
* **Expo Location API** → Detect and group users by location
* **Axios** → API requests
* **React Native Game Engine + Matter.js** → In-app mini-games

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/thesocial.git
cd thesocial
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

#### Configure Environment

Create a `.env` file in `backend/`:

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/thesocial"

# Gemini Api key
GEMINI_API_KEY="abcabcabcabcabcabcabcabcabcabca"

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
```

#### Run Migrations & Generate Prisma Client

```bash
npm run prisma:migrate
npm run prisma:generate
```

#### Start Backend

Development (hot reload):

```bash
npm run dev
```

Production:

```bash
npm run build
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend/TheSocial
npm install
```

Start the app:

```bash
npx expo start
```

---

## 📦 Dependencies

### Backend

* `express`, `cors`, `helmet`, `express-rate-limit`
* `@prisma/client`, `zod`, `bcryptjs`, `jsonwebtoken`
* `socket.io` (real-time communication)
* `dotenv` (env config)

### Frontend

* `react-native`, `expo`, `expo-router`, `axios`
* `socket.io-client`
* `expo-location`, `expo-secure-store`, `expo-av`
* `react-native-game-engine`, `matter-js`
* `react-native-toast-message`, `react-native-reanimated`

---

## 🧑‍💻 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request