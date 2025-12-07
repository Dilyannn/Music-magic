# Music Magic

Music Magic is a Single Page Application (SPA) built with React.js. It allows users to browse a catalog of music, view details, and manage their own music entries (create, edit, delete).

This project was developed as the final defense project for the **ReactJS Course at SoftUni**.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)

### Installation & Setup

The project consists of a Client (React) and a Server (SoftUni Practice Server). You need to run both for the application to work correctly.

#### 1. Start the Backend Server

The backend is a custom REST API provided by [SoftUni Practice Server](https://github.com/softuni-practice-server/softuni-practice-server) for practice purposes.

```bash
cd server
node server.js
```

The server will start on `http://localhost:3030`.

#### 2. Start the Client Application

Open a new terminal and navigate to the client folder:

```bash
cd client
npm install
npm run dev
```

The client will start on `http://localhost:5173` (or the port specified by Vite).

## 🛠️ Technologies Used

- **Frontend:** React, React Router, Tailwind CSS, Vite
- **Backend:** SoftUni Practice Server (Node.js)

## ✨ Features

- **User Authentication:** Login, Register, Logout
- **Catalog:** Browse all music entries
- **Details:** View specific details for a music entry
- **Create/Edit:** Authenticated users can add and modify their own entries
- **Route Guards:** Protected routes for authorized actions
