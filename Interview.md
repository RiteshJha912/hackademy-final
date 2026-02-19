# Hackademy - Project Interview Preparation

This document outlines the complete details of the "Hackademy" project to help you prepare for technical interviews.

## 1. Project Overview & Elevator Pitch
**Hackademy** is a gamified cybersecurity education platform designed to make learning about digital threats engaging and accessible.
- **Problem Solved**: Cybersecurity training is often boring and technical. People learn best by doing and competing.
- **Solution**: A platform that combines interactive scam scenarios (like Digital Arrest, UPI fraud) with competitive elements (Global Leaderboard) to teach users how to stay safe.
- **Unique Selling Point (USP)**: Frictionless entry (no complex signups) + focused on locally relevant Indian scam scenarios (UPI, Digital Arrest).

## 2. Technology Stack
I chose the **MERN Stack** (MongoDB, Express.js, React, Node.js) for this project:

- **Frontend (React)**: Component-based architecture for reusable UI (e.g., standardized `LeaderboardItem`, `Navbar`). Uses `react-router-dom` for navigation without page reloads (SPA).
- **Backend (Node.js & Express)**: Lightweight, non-blocking I/O ideal for handling multiple concurrent game requests.
- **Database (MongoDB)**: Flexible NoSQL schema suited for storing varied user profiles and game stats.
- **Why this stack?**:
  - **Unified Language**: JavaScript on both client and server allows for code reuse and faster development.
  - **Json Native**: Data flows seamlessly from DB to Frontend as JSON.

## 3. Architecture & Data Flow
The application follows a classic Client-Server architecture:

1.  **User Interaction**: User visits site -> React App loads (SPA).
2.  **API Requests**: Actions (joining, submitting score) trigger Axios requests to the Express API.
3.  **Controller Logic**: API receives request -> Controller processes logic (e.g., calculates new score).
4.  **Database Operation**: Controller communicates with MongoDB (via Mongoose) to read/write data.
5.  **Response**: Updated data sends back to React -> UI updates instantly.

**Diagram Representation:**
`[React Frontend] <--(JSON/REST API)--> [Express Application] <--(Mongoose)--> [MongoDB Atlas]`

## 4. Key Features & Implementation
*(Know these "inside out")*

### A. Gamification (MCQ Game)
- **Logic**: Questions are stored in the frontend state (can be moved to DB for scalability).
- **State Management**: Uses `useState` to track `currentQuestion`, `score`, and `loading` status.
- **Score Submission**: Score is calculated locally for instant feedback, then sent to the backend (`/api/score`) only when the game finishes to minimize server load.

### B. Leaderboard System
- **Backend Optimization**: The MongoDB Schema has an **index** on the `score` field (`userSchema.index({ score: -1 })`).
- **Why?**: Sorting thousands of users by score is slow. Indexing makes fetching the "Top 50" extremely fast (O(log n) vs O(n)).

### C. Scam Education Modules
- **Pages**: Dedicated pages for specific scams (WhatsApp Stock, Digital Arrest, etc.).
- **Content**: Information is broken down into digestible chunks with immediate "Check your knowledge" quizzes.

### D. "No-Auth" Authentication
- **Design Choice**: Instead of forcing email/password, I used a unique Username system.
- **Benefit**: Reduces friction. Users can play immediately.
- **Validations**: Backend checks for uniqueness and length (2-30 chars) to prevent spam.

## 5. Database Schema (MongoDB)
I used a simple but effective `User` schema:
- `username`: String (Unique, required)
- `score`: Number (Indexed for leaderboard)
- `gamesPlayed`: Number (To track engagement)
- `lastPlayed`: Date (For potential "active users" metrics)

## 6. File Structure (Mental Map)
Keep this simple mental model:
- **Root**: `client` (Frontend), `server` (Backend).
- **Client**:
    - `src/pages`: All the views (Landing, Leaderboard, Game).
    - `src/components`: Reusable bits (Navbar).
    - `src/utils/api.js`: Centralized place for all backend calls (clean code).
- **Server**:
    - `models/User.js`: The DB Schema.
    - `controllers/userController.js`: The brain (logic).
    - `routes/userRoutes.js`: The traffic director (urls).

## 7. Scalability Updates (If asked "How would you scale this?")
1.  **Database**:
    - *Sharing/Partitioning*: If users grow to millions, shard the database based on regions.
    - *Caching*: Implement **Redis** to cache the Leaderboard. The leaderboard doesn't change every millisecond, so calculating it once every 10 seconds and serving from cache reduces DB load by 99%.
2.  **Frontend**:
    - Use **CDN** (Cloudflare) to serve static assets (images, CSS) so the server only handles API logic.
    - Implement **Lazy Loading** for routes (load the 'Game' code only when user clicks 'Play').
3.  **Backend**:
    - The server is **stateless**. This means we can run 10 instances of the backend behind a **Load Balancer** (Nginx) to handle more traffic.

## 8. Future Scope (What's next?)
1.  **Dynamic Content**: Move questions from Frontend code to Database so admins can add questions without re-deploying the app.
2.  **Real Auth**: Add JWT (JSON Web Tokens) so users can login on different devices and keep their score.
3.  **Real-Time Battles**: Use **Socket.io** to allow two players to compete against each other live.
4.  **Admin Dashboard**: A secure panel to view analytics (which questions are people getting wrong most often?).

## 9. Common Interview Q&A for this Project
- **Q: Why did you put questions in the Frontend code?**
  - *A: For this MVP (Minimum Viable Product), it reduced latency to 0. Users get instant transition between questions. For the next version, I plan to move them to the DB.*
- **Q: How do you handle cheating? (e.g. sending fake high scores)**
  - *A: Currently, reliance is on the frontend. To fix this, I would implement server-side validation where the frontend sends answers, and the server calculates the score, rather than the frontend sending the final score.*
- **Q: What was the hardest challenge?**
  - *A: (Example) Designing a responsive layouts that looked like a "Game" but worked on mobile. I used CSS Modules to ensure styles didn't conflict and focused heavily on Flexbox/Grid.*

---
