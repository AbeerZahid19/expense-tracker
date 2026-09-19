# 💰 Smart Expense Tracker with Budget Alerts

A full-stack MERN expense tracking web application that helps users manage their personal finances with category-wise budget limits, real-time alerts, recurring expenses, and visual spending insights.

## 🔗 Live Demo

- **Frontend:** https://expense-tracker-wine-nine-32.vercel.app/
- **Backend API:** https://expense-tracker-api-woad.vercel.app/

## ✨ Features

- **User Authentication** — Secure signup/login with JWT tokens and bcrypt password hashing
- **Expense Management** — Add, edit, and delete expenses with category, date, and notes
- **Monthly Budget Tracking** — Set an overall monthly budget with real-time remaining balance
- **Category-wise Budget Limits** — Set individual budget limits per category (Food, Rent, Transport, etc.) with progress bars
- **Smart Alerts** — Get warned at 80% budget usage and when budget is exceeded, via inline banners and toast notifications
- **Recurring Expenses** — Mark expenses as recurring (rent, subscriptions) and re-add them for the current month with one click
- **Data Visualization** — Pie chart for category-wise spending split, bar chart for monthly spending trends
- **Responsive Design** — Works smoothly on mobile, tablet, and desktop
- **Persistent Data** — All data stored securely in MongoDB, tied to individual user accounts

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- Axios
- Recharts (data visualization)
- Custom CSS (dark theme, responsive)

**Backend:**
- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT (authentication)
- bcryptjs (password hashing)

**Deployment:**
- Frontend & Backend both deployed on Vercel

## 📁 Project Structure
expense-tracker/
├── src/ # React frontend
│ ├── components/ # ExpenseForm, Login, Signup, Charts, etc.
│ ├── App.jsx
│ └── App.css
├── server/ # Node/Express backend
│ ├── models/ # User, Expense, Budget schemas
│ ├── routes/ # auth, expenses, budget routes
│ ├── middleware/ # JWT auth middleware
│ └── server.js
└── README.md
## 🚀 Running Locally

**Backend:**
```bash
cd server
npm install
node server.js
```

**Frontend:**
```bash
npm install
npm run dev
```

Create a `.env` file inside `/server` with:

MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000

## 👩‍💻 Author

Built by Abeer Zahid as part of a self-paced internship project.