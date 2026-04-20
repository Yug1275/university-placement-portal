import React, { useState, useEffect } from "react";
import API from "../../services/api";
import { useNavigate, useSearchParams } from "react-router-dom";

function Register() {
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get("role") || "student";
  const hideRoleSelection = !!searchParams.get("role");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: defaultRole,
    cgpa: "",
    skills: "",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  const startTimer = () => {
    setResendTimer(300);
  };

  const handleSendOTP = async () => {
    if (!form.email) {
      setOtpError("Please enter your email address first.");
      return;
    }
    setOtpLoading(true);
    setOtpError("");
    try {
      await API.post("/otp/send", { email: form.email });
      setOtpSent(true);
      startTimer();
    } catch (err) {
      setOtpError(err?.response?.data?.message || "Failed to send OTP.");
    }
    setOtpLoading(false);
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setOtpError("Please enter a 6-digit OTP.");
      return;
    }
    setOtpLoading(true);
    setOtpError("");
    try {
      await API.post("/otp/verify", { email: form.email, otp });
      setOtpVerified(true);
      setOtpError("");
      setOtpSent(false); // Hide OTP section after verification
    } catch (err) {
      setOtpError(err?.response?.data?.message || "Invalid OTP. Please try again.");
    }
    setOtpLoading(false);
  };

  const handleResendOTP = () => {
    setOtp("");
    setOtpError("");
    handleSendOTP();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpVerified) {
      alert("Please verify your email first.");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        ...form,
        skills:
          form.role === "student"
            ? form.skills.split(",").map((s) => s.trim()).filter(Boolean)
            : [],
        cgpa:
          form.role === "student" ? parseFloat(form.cgpa) : undefined,
      };

      await API.post("/auth/register", payload);
      alert("Registered successfully. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err?.response?.data?.message || "Error");
    }
    setLoading(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-card">
        <h2 className="register-title">Create Account</h2>

        {!hideRoleSelection && (
          <select
            className="register-input"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            disabled={otpSent || otpVerified}
          >
            <option value="student">Student</option>
            <option value="company">Company</option>
          </select>
        )}

        <input
          type="text"
          placeholder="Full Name"
          required
          className="register-input"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          disabled={otpSent || otpVerified}
        />

        <input
          type="email"
          placeholder="Email"
          required
          className="register-input"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          disabled={otpSent || otpVerified}
        />

        {otpVerified ? (
          <p className="otp-success">✓ Email verified</p>
        ) : !otpSent ? (
          <button
            type="button"
            className="otp-send-btn"
            onClick={handleSendOTP}
            disabled={otpLoading}
          >
            {otpLoading ? "Sending..." : "Send OTP"}
          </button>
        ) : null}

        {otpSent && (
          <div className="otp-section">
            <label className="otp-label">Enter OTP sent to {form.email}</label>
            <input
              type="text"
              maxLength="6"
              inputMode="numeric"
              className="otp-input"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              type="button"
              className="otp-verify-btn"
              onClick={handleVerifyOTP}
              disabled={otpLoading}
            >
              {otpLoading ? "Verifying..." : "Verify OTP"}
            </button>
            {resendTimer > 0 ? (
              <p className="otp-timer">Resend OTP in {formatTime(resendTimer)}</p>
            ) : (
              <button type="button" className="otp-resend-link" onClick={handleResendOTP}>
                Resend OTP
              </button>
            )}
          </div>
        )}
        
        {otpError && <p className="otp-error">{otpError}</p>}

        <input
          type="password"
          placeholder="Password"
          required
          className="register-input"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {form.role === "student" && (
          <>
            <input
              type="number"
              placeholder="CGPA (e.g. 8.5)"
              step="0.1"
              min="0"
              max="10"
              className="register-input"
              value={form.cgpa}
              onChange={(e) => setForm({ ...form, cgpa: e.target.value })}
            />
            <input
              type="text"
              placeholder="Skills (e.g. React, Node, MongoDB)"
              className="register-input"
              value={form.skills}
              onChange={(e) => setForm({ ...form, skills: e.target.value })}
            />
          </>
        )}

        <button type="submit" className="register-button" disabled={!otpVerified || loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;