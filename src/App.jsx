import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { BookProvider } from "./context/BookContext";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BookManager from "./pages/BookManager";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <BookProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/signup"
              element={<Signup />}
            />

            <Route
              path="/"
              element={
                <PrivateRoute>
                  <BookManager />
                </PrivateRoute>
              }
            />
            <Route
  path="/dashboard"
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  }
/>

            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </BrowserRouter>
      </BookProvider>
    </AuthProvider>
  );
}

export default App;