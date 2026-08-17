# 📚 Book Manager — Week 3

A full-stack Book Manager application built with React, Context API, Tailwind CSS, Node.js, Express, and MongoDB.

This Week 3 version focuses on **global state management, shared state, data-fetching patterns, and UI polish**.

## ✨ Features

### 🔐 Authentication

* User signup and login
* JWT-based authentication
* Protected routes
* User-specific book management

### 📚 Book Management

* View books
* Add new books
* Update existing books
* Delete books
* Search books by title or author
* Sort books by title and published year

### 🌐 Global State Management

Implemented **React Context API** to manage shared application state.

The `BookContext` handles:

* Books data
* Fetching books
* Adding books
* Updating books
* Deleting books
* Loading states
* Error states
* Delete state
* Success messages
* Search state
* Sort state

The previous `useBooks.js` hook was removed after migrating book-related shared state to Context API.

### 🎨 UI Polish

* Loading spinner during data fetching
* Empty state when no books are available
* Reusable error alerts
* Success messages after CRUD operations
* Loading feedback during CRUD actions
* Responsive interface
* Clean component-based architecture

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* React Context API
* React Router DOM
* Tailwind CSS
* Axios
* Lucide React
* JavaScript (ES6+)

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Multer

## 📁 Project Structure

```text
src/
├── components/
│   ├── BookCard.jsx
│   ├── BookForm.jsx
│   ├── DeleteConfirmDialog.jsx
│   ├── EmptyState.jsx
│   ├── ErrorAlert.jsx
│   ├── LoadingSpinner.jsx
│   └── Navbar.jsx
│
├── context/
│   └── BookContext.js
│
├── hooks/
│   └── useAuth.js
│
├── pages/
│   ├── Login.jsx
│   ├── Signup.jsx
│   └── BookManager.jsx
│
├── services/
│   ├── api.js
│   ├── authService.js
│   └── bookService.js
│
└── App.jsx
```

## 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/Abdulkhaliqdev2007/book-manager-week3-frontend.git
```

Navigate to the project folder:

```bash
cd book-manager-week3-frontend
```

Install dependencies:

```bash
npm install
```

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:5000/api
```

For deployment, replace the value with your deployed backend API URL.

**Do not commit sensitive credentials or secret keys to GitHub.**

## ▶️ Run the Application

Start the development server:

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

Make sure the backend server is also running.

## 🔗 Backend Repository

Backend API repository:

https://github.com/Abdulkhaliqdev2007/book-manager-backend.git

## 🎯 Week 3 Learning Goals

This project demonstrates:

* Global state management using React Context API
* Shared state between components
* Reduced prop drilling
* Centralized data-fetching logic
* Loading and error handling
* Empty-state UI
* Search and sort using shared state
* Improved user feedback
* Cleaner component communication

## 👨‍💻 Author

**Hafiz Abdul Khaliq**

GitHub: https://github.com/Abdulkhaliqdev2007
