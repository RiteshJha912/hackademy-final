# Hackademy      

A comprehensive cybersecurity education platform that transforms learning into an engaging game experience. Learn about real-world cyber threats through interactive quizzes, detailed scam guides and compete on a global leaderboard.
---

##  Key Features

###  **Interactive Learning Experience**
- **Real-world Scenarios** - Learn through actual cyber threat examples
- **Gamified Quizzes** - Earn points and climb the leaderboard
- **Instant Feedback** - Learn from mistakes with detailed explanations
- **Progress Tracking** - Monitor your cybersecurity knowledge growth

###  **Comprehensive Scam Education**
- **Digital Arrest Scams** - Learn to identify and avoid fake police calls
- **UPI Payment Scams** - Understand common UPI fraud techniques
- **E-KYC SIM Swap** - Protect yourself from identity theft
- **Fake Job Scams** - Recognize fraudulent employment offers
- **WhatsApp Stock Scams** - Avoid investment fraud on messaging platforms

###  **Competitive Elements**
- **Global Leaderboard** - Compete with players worldwide
- **Real-time Scoring** - Points awarded instantly for correct answers
- **User Statistics** - Track your performance and improvement
- **No Registration Required** - Just enter a username and start playing

###  **Modern User Experience**
- **Responsive Design** - Works perfectly on desktop, tablet and mobile
- **Intuitive Navigation** - Clean, user-friendly interface
- **Fast Performance** - Optimized for quick loading and smooth interactions
- **Accessibility** - Designed with all users in mind

---

##  Technical Architecture

**Frontend (React)** → **Backend (Express)** → **Database (MongoDB Atlas)**  
- **Development**: localhost:3000 → localhost:5000 → MongoDB Atlas
- **Production**: Render Static Site → Render Web Service → MongoDB Atlas

---

##  Project Structure
```
hackademyfinal/
├── client/                    # React Frontend
│   ├── public/
│   │   ├── images/           # Scam scenario images
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Navbar.js
│   │   │   └── LeaderboardItem.js
│   │   ├── pages/           # Main application pages
│   │   │   ├── LandingPage.js
│   │   │   ├── UsernamePage.js
│   │   │   ├── MCQGamePage.js
│   │   │   ├── LeaderboardPage.js
│   │   │   ├── LearnPage.js
│   │   │   ├── DigitalArrestScamPage.js
│   │   │   ├── UPIScamPage.js
│   │   │   ├── EKYCPage.js
│   │   │   ├── FakeJobScamPage.js
│   │   │   └── WhatsAppStockScam.js
│   │   ├── styles/          # CSS modules
│   │   ├── utils/           # API utilities
│   │   └── App.js           # Main App component
│   └── package.json
├── server/                   # Express Backend
│   ├── config/
│   │   └── db.js            # Database configuration
│   ├── controllers/
│   │   └── userController.js # Business logic
│   ├── models/
│   │   └── User.js          # MongoDB schemas
│   ├── routes/
│   │   └── userRoutes.js    # API endpoints
│   ├── server.js            # Entry point
│   └── package.json
└── README.md
```

---

##  Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org)  
- **npm** (comes with Node.js)  
- **MongoDB Atlas Account** - [Sign up here](https://www.mongodb.com/atlas)  
- **Git** - [Download here](https://git-scm.com)  

---

##  Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/hackademyfinal.git
cd hackademyfinal
```

### 2. Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your MongoDB connection string

# Start the backend server
npm run dev
```
The backend will run on: **http://localhost:5000**

### 3. Frontend Setup
```bash
# Navigate to client directory (new terminal)
cd client

# Install dependencies
npm install

# Start the React app
npm start
```
The frontend will run on: **http://localhost:3000**

### 4. Environment Configuration

Create a `.env` file in the `server/` directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
NODE_ENV=development

```


---

##  API Endpoints

| Method | Endpoint              | Description              | Request Body |
|--------|-----------------------|--------------------------|--------------|
| `GET`  | `/`                   | API health check         | - |
| `POST` | `/api/user`           | Create new user          | `{ "username": "string" }` |
| `GET`  | `/api/user/:username` | Get user by username     | - |
| `POST` | `/api/score`          | Update user score        | `{ "username": "string", "scoreToAdd": number }` |
| `GET`  | `/api/leaderboard`    | Get top players          | Query: `?limit=50` |
| `GET`  | `/api/stats`          | Get platform statistics  | - |

---

##  Technology Stack

### Backend Dependencies
- **express** (^5.1.0) - Fast, minimalist web framework for Node.js  
- **mongoose** (^8.18.0) - MongoDB object modeling for Node.js  
- **cors** (^2.8.5) - Enables cross-origin resource sharing  
- **dotenv** (^17.2.2) - Loads environment variables from a `.env` file  
- **colors** (^1.4.0) - Adds colors to console output for better readability  

**Dev Dependencies:**  
- **nodemon** (^3.1.10) - Automatically restarts the server during development  

### Frontend Dependencies
- **react** (^18.2.0) - Core React library for building user interfaces  
- **react-dom** (^18.2.0) - Renders React components to the DOM  
- **react-router-dom** (^6.8.0) - Handles client-side routing in React apps  
- **axios** (^1.3.0) - HTTP client for making API requests  
- **chart.js** (^4.5.1) - Charting library for data visualization  
- **react-chartjs-2** (^5.3.0) - React wrapper for Chart.js  
- **recharts** (^3.3.0) - Library for creating responsive charts and graphs  
- **lucide-react** (^0.546.0) - Icon library for modern UI elements  
- **react-scripts** (5.0.1) - Configuration and scripts for Create React App  

---

##  Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**


###  Server : [https://hackademy.onrender.com](https://hackademy.onrender.com)



