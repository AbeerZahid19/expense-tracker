# 💰 Smart Expense Tracker with Budget Alerts

A full-stack MERN expense tracking web application that helps users manage their personal finances with category-wise budget limits, real-time alerts, recurring expenses, and visual spending insights.

**Author:** Abeer Zahid
**Internship ID:** ZYNVEX-CERT-1022
**Domain:** Web Development

## 🔗 Live Demo

- **Frontend:** https://expense-tracker-wine-nine-32.vercel.app/
- **Backend API:** https://expense-tracker-api-woad.vercel.app/
- **GitHub Repo:** https://github.com/AbeerZahid19/expense-tracker

## ✨ Features

- **User Authentication** — Secure signup/login with JWT tokens and bcrypt password hashing
- **Expense Management** — Add, edit, and delete expenses with category, date, and notes
- **Monthly Budget Tracking** — Set an overall monthly budget with real-time remaining balance
- **Category-wise Budget Limits** — Set individual budget limits per category with progress bars
- **Smart Alerts** — Warnings at 80% budget usage and when budget is exceeded, via inline banners and toast notifications
- **Recurring Expenses** — Mark expenses as recurring and re-add them for the current month with one click
- **Data Visualization** — Pie chart for category-wise spending split, bar chart for monthly spending trends
- **Responsive Design** — Works smoothly on mobile, tablet, and desktop
- **Persistent Data** — All data stored securely in MongoDB, tied to individual user accounts

## 🛠️ Tech Stack

**Frontend:** React (Vite), Axios, Recharts, Custom CSS
**Backend:** Node.js, Express, MongoDB Atlas, Mongoose, JWT, bcryptjs
**Deployment:** Vercel (frontend and backend, serverless)

## 📅 Module-wise Breakdown

### Module 1 — Setup + Core Expense CRUD
- React (Vite) project setup
- Expense form (amount, category, date, note)
- Add, edit, and delete expense functionality
- Monthly budget input with remaining balance calculation
- localStorage persistence (initial version)
- Node/Express backend with MongoDB Atlas connection
- User model, JWT-based Signup/Login authentication (bcrypt password hashing)

### Module 2 — Database Integration + Category Budgets
- Expense model migrated to MongoDB (from localStorage)
- JWT authentication middleware to protect all expense routes
- Full CRUD APIs (GET/POST/PUT/DELETE) for expenses, scoped per logged-in user
- Category-wise budget limits (Food, Rent, Transport, Utilities, Entertainment, Other)
- Per-category spending progress bars and over-budget indicators

### Module 3 — Alerts + Recurring Expenses
- 80% budget threshold warning (in addition to over-budget alert)
- Toast/popup notifications that appear automatically and auto-dismiss
- Recurring expense marking (e.g. rent, subscriptions)
- "Add this month" button to quickly re-log recurring expenses

### Module 4 — Charts + Polish + Deployment
- Interactive Pie Chart (spending by category) using Recharts
- Interactive Bar Chart (monthly spending trend) using Recharts
- Responsive CSS for mobile/tablet/desktop
- Backend deployed as serverless functions on Vercel (with cached DB connection)
- Frontend deployed on Vercel, connected to live backend
- Full project README and documentation

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