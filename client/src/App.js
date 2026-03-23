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
import CompanyDashboard from "./pages/company/CompanyDashboard";
import PostJob from "./pages/company/PostJob";
import MyJobs from "./pages/company/MyJobs";
import Applicants from "./pages/company/Applicants";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ paddingBottom: "50px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
          <Route path="/applications" element={<ProtectedRoute><Applications /></ProtectedRoute>} />
          <Route path="/company-dashboard" element={<ProtectedRoute><CompanyDashboard /></ProtectedRoute>} />
          <Route path="/post-job" element={<ProtectedRoute><PostJob /></ProtectedRoute>} />
          <Route path="/my-jobs" element={<ProtectedRoute><MyJobs /></ProtectedRoute>} />
          <Route path="/applicants/:jobId" element={<ProtectedRoute><Applicants /></ProtectedRoute>} />

        </Routes>
      </div>

      <Footer />

    </Router>
  );
}

export default App;