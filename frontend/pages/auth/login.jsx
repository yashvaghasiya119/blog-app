import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style/auth/login.css";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(prev => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle login logic here
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login to Your Account</h2>

        <div className="form-group">
          <label>Email</label>
          <input type="email" required placeholder="Enter your email" />
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Enter your password"
            />
            <span onClick={togglePassword} className="toggle-password">
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
        </div>

        <div className="extra-links">
          <Link to="/forgot-password">Forgot Password?</Link>
          <Link to="/register">Don't have an account?</Link>
        </div>

        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
}
