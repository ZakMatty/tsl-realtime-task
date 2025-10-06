# Realtime Task

Live motorsport session monitoring with React and SignalR.

## 🚀 Project Overview

Realtime Task is a full-stack web application for live motorsport session monitoring.  
It provides a real-time dashboard of all sessions, detailed session views with competitor data, and search functionality for quick access to session information.

- **Backend:** ASP.NET Core with SignalR for real-time updates  
- **Frontend:** React with Vite for a fast, modern user experience  

## ✨ Features

- **Live Data:** Session updates appear instantly.  
- **Detailed Session Views:** Competitor info, lap times, and session metadata.  
- **Filtering:** Filter sessions by state and track.  
- **Search:** Quickly access sessions by ID.  
- **Copy Session ID:** Easily copy session IDs for sharing or reference.  
- **Responsive UI:** Works on desktop and mobile.  
- **Open Source:** Extendable and welcoming to contributions.  

## ⚙️ Getting Started

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)  
- [Node.js v18+](https://nodejs.org/)  
- npm  

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/ZakMatty/realtime-task.git
cd tsl-realtime-task
2. Backend Setup
bash
Copy code
cd server
dotnet restore
dotnet build
dotnet run
The backend runs on http://localhost:5176 by default.

3. Frontend Setup
bash
Copy code
cd ../client
npm install
npm run dev
The frontend runs on http://localhost:5173 by default.

Usage
Open http://localhost:5173 in your browser.

Browse the dashboard and filter sessions by state or track.

Click “Find Out More” for session details.

Copy session IDs using the clipboard button.

🧰 Tech Stack
Backend: ASP.NET Core 8, SignalR

Frontend: React, Vite

Realtime Communication: WebSockets via SignalR

🆘 Where to Get Help
API Reference: server/Controllers/SessionsController.cs

Frontend Pages: client/src/pages

👥 Maintainers
Maintainer: Zak Matty
