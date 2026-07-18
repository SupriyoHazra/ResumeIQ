import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Hero from "./components/layout/Hero";
import UploadPage from "./pages/Upload";
import Result from "./pages/Result";
import Loading from "./pages/Loading";
import Login from "./pages/Login";
import Register from "./pages/Register";
import History from "./pages/History";
import ResumeDetails from "./pages/ResumeDetails";

export default function App() {
  return (
    <Routes>

      <Route path="/" element={<Hero />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <UploadPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/loading"
        element={
          <ProtectedRoute>
            <Loading />
          </ProtectedRoute>
        }
      />

      <Route
        path="/result"
        element={
          <ProtectedRoute>
            <Result />
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />

      <Route
        path="/history/:id"
        element={
          <ProtectedRoute>
            <ResumeDetails />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}