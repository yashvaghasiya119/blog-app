import React, { useState } from "react";
import "../style/auth/resetpassword.css";
import { api } from "../../lib/axios";

export function ResetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // 🔹 New loading state

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true); // 🔸 Start loading

    try {
      const response = await api.post("/user/reset-password", {
        email,
        otp,
        password,
      });
      console.log("Reset successful:", response.data);
    } catch (error) {
      console.error("Reset failed:", error.response?.data || error.message);
    } finally {
      setLoading(false); // 🔸 Stop loading regardless of outcome
    }
  };

  return (
    <div className="reset-container">
      <form className="reset-form" onSubmit={handleSubmit}>
        <h2>Reset Your Password</h2>
        <p>Enter your email, the OTP sent to it, and set a new password.</p>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>OTP</label>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            <span onClick={togglePasswordVisibility} className="toggle-icon">
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
            />
            <span onClick={togglePasswordVisibility} className="toggle-icon">
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
        </div>

        <button type="submit" className="reset-btn" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
