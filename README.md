# 📚 Book Manager – Frontend

A modern and responsive Book Manager frontend built with **React, Vite, Tailwind CSS, Axios, React Router, Context API, and Recharts**.

The application allows users to manage books with authentication, CRUD operations, search and sorting, form validation, image uploads, and an interactive data visualization dashboard.

## ✨ Features

- 🔐 User authentication with Login and Signup
- 📚 Create, read, update, and delete books
- 🖼️ Book cover image upload
- 🔎 Search and sorting
- ✅ Form validation
- 🌐 Context API for global state management
- 🔒 Protected routes
- ⏳ Loading and error states
- 📊 Interactive dashboard
- 📈 Bar charts
- 📉 Line chart
- 🥧 Pie chart
- 💰 Collection statistics
- 📱 Responsive UI

## 📊 Dashboard

The dashboard provides an overview of the user's book collection.

It includes:

- Total Books
- Total Collection Value
- Number of Categories
- Average Book Price
- Books by Category
- Category Distribution
- Books Added Over Time
- Average Price by Category

Charts are created using **Recharts**, while the data is fetched from the backend API.

## 🛠️ Tech Stack

- React
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- Context API
- Recharts
- Lucide React
- JavaScript

## 📁 Project Structure

```text
src/
├── components/
├── context/
│   └── BookContext.jsx
├── hooks/
│   └── useAuth.js
├── pages/
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── BookManager.jsx
│   ├── Dashboard.jsx
│   └── NotFound.jsx
├── services/
│   ├── api.js
│   ├── bookService.js
│   └── dashboardService.js
├── App.jsx
└── main.jsx
🚀 Installation

Clone the repository:

git clone https://github.com/Abdulkhaliqdev2007/book-manager-week4-frontend.git

Go to the project directory:

cd book-manager-week4-frontend

Install dependencies:

npm install

Start the development server:

npm run dev

The frontend will normally run on:

http://localhost:5173
⚙️ Environment Variables

Create a .env file in the frontend root:

VITE_API_URL=http://localhost:5000/api

If VITE_API_URL is not provided, the application uses:

http://localhost:5000/api
🔗 Backend

This frontend communicates with the Book Manager backend API.

Backend repository:

https://github.com/Abdulkhaliqdev2007/book-manager-week4-backend
📊 Dashboard API

The dashboard fetches data from:

GET /api/dashboard/stats

The request requires JWT authentication.

The JWT token is automatically attached to API requests through the Axios interceptor.

📱 Responsive Design

The interface is designed to work across:

Desktop
Laptop
Tablet
Mobile
🔒 Security

The frontend uses:

JWT authentication
Protected routes
Authorization headers
Axios interceptors

Do not commit .env files or sensitive credentials to GitHub.

📌 Project Status

Week 4 – Dashboard with Data Visualization

The project includes a complete dashboard with backend-powered statistics and interactive charts.

👨‍💻 Author

Abdulkhaliqdev2007

GitHub:

https://github.com/Abdulkhaliqdev2007
📄 License

This project is licensed under the MIT License.
