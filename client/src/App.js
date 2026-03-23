import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Footer from "./components/Footer";
import Dashboard from "./pages/student/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Jobs from "./pages/student/Jobs";
import Applications from "./pages/student/Applications";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ paddingBottom: "50px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
          <Route path="/applications" element={<ProtectedRoute><Applications /></ProtectedRoute>} />

        </Routes>
      </div>

      <Footer />

    </Router>
  );
}

export default App;