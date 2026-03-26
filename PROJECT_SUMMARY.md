# Hackademy: Engineering Overview

### 1. One-Line Pitch
A gamified cybersecurity education platform built to teach real-world threat detection (like phishing and UPI scams) through interactive simulations, powered by a React client and a stateless Node/Express backend.

### 2. Problem Statement
Cybersecurity education for non-technical users is often text-heavy, theoretical, and unengaging, leading to poor retention. Existing solutions lack practical, interactive scenarios simulating real-world Indian cyber threats (e.g., Tatkal ticket scams, E-KYC frauds), leaving users vulnerable to modern digital deception.

### 3. Approach / Technical Details
The problem was solved by building a highly interactive, simulated environment where users "learn by doing" rather than reading. 
*   **Frontend**: React 18 handles the complex state of various game modes (Link Decoder, Phishing Simulator). CSS Modules, Framer Motion, and Lucide Icons provide a modern, engaging UI.
*   **Backend**: Node.js and Express.js serve a REST API handling user progress and leaderboard tracking.
*   **Authentication**: Implemented a lightweight, stateless authentication system using cross-tab `sessionStorage` and `localStorage` identifiers synced with server-side validation, minimizing friction ("just-in username" login) while persisting progress. 

### 4. System Design / Architecture
The architecture follows a standard client-server model optimized for fast, dynamic loading:
*   **Client**: Modular React architecture utilizing React Router for seamless transitions between educational articles, interactive drill scenarios, and an arcade hub.
*   **API Layer**: Express Router handles REST endpoints (`/api/user`, `/api/score`), protected by JWT-based security middleware.
*   **Data Model**: Mongoose defines schemas tracking user progress, streaks, and scores, connecting to a MongoDB Atlas cluster. A `beforeunload` listener gracefully manages session termination securely from the client.

### 5. Key Features
*   **Dynamic Interactive Games**: Simulation logic that processes real-time user selections against rigorous predefined scam patterns, instantly calculating scores and bonus multipliers based on user streaks.
*   **Stateless Progress Tracking**: Uses local token propagation mapped to database records to persist user scores across page reloads without requiring complex OAuth flows.
*   **Responsive 'Zero-Overflow' Engine**: Specialized CSS architecture relying on relative structural units and transform bounds to eliminate mobile-browser horizontal scroll bugs, ensuring a native-app feel on all devices.

### 6. Technical Challenges
*   **Managing Complex Game State**: Keeping track of score, streaks, scenario transitions, and conditional UI rendering without prop-drilling required carefully structured React component state.
*   **Cross-Browser Session Lifecycle**: Capturing valid session ends reliably without WebSockets. Handled by binding a production-ready asynchronous fetch call to the window `beforeunload` event to ensure graceful backend logouts.
*   **Performant Gamification**: Ensuring animations (Framer Motion) and layout shifts during fast-paced quiz interactions did not cause frame drops, solved by using CSS transforms over structural reflows.

### 7. Improvements / Future Scope
*   **Real-time Leaderboards**: Replace polling with WebSockets (Socket.io) for live competitive tracking.
*   **Robust Authentication**: Integrate OAuth 2.0 (Google/GitHub) for secure, cross-device user persistence instead of localized token reliance.
*   **Headless CMS**: Migrate static scam scenarios and educational content to a headless CMS to allow non-developers to update threat intelligence models instantly.

### 8. Impact / Results
Hackademy successfully lowers the barrier to entry for digital literacy. By immediately rewarding users for identifying manipulative UI patterns and malicious URLs, the platform builds functional muscle memory, delivering a highly accessible public utility against modern social engineering threats.
