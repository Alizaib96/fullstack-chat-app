import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

// Components
import Navbar from "./components/navbar.jsx";

// Pages
import HomePage from "./pages/homePage.jsx";
import LogInPage from "./pages/logInPage.jsx";
import ProfilePage from "./pages/profilePage.jsx";
import SettingsPage from "./pages/settingsPage.jsx";
import SignUpPage from "./pages/signUpPage.jsx";
import NotFoundPage from "./pages/notFoundPage.jsx";

// Routes
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";

// Store
import { useAuthStore } from "./store/useAuthStore.js";
import { useThemeStore } from "./store/useThemestore.js";

const App = () => {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        <Loader className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <div
      data-theme={theme}
      className="min-h-screen bg-base-100 text-base-content"
    >
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LogInPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUpPage />
            </PublicRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
