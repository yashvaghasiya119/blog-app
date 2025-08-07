import React, { useState } from "react";
import "../style/auth/register.css";
import { api } from "../../lib/axios";
import { RingLoader } from "react-spinners";

export function Register() {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loading

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Start loading when form is submitted

    try {
      const response = await api.post("/user/signup", formData);
    // const response = await fetch("https://httpbin.org/delay/5")
      console.log("Registration successful:", response.data);
      // Optionally: Redirect user or show success message
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
    } finally {
      setLoading(false); // Stop loading regardless of outcome
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create Your Account</h2>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
            required
            disabled={loading} // Disable input when loading
          />
        </div>

        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <span onClick={togglePasswordVisibility} className="toggle-icon">
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
        </div>

        <button 
          type="submit" 
          className="register-btn" 
          disabled={loading} // Disable button while loading
        >
          {/* {loading ? <RingLoader color="#36D7B7" /> : "Register"}  */}
          {loading ? "Registering..." : "Register"} 
        </button>

        {/* Optionally, show a loader */}
        {loading && <div className="loading-spinner">Loading...</div>}

        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}
