// import React, { useState } from "react";
// import "../style/auth/forgotpassword.css";
// import { api } from "../../../lib/axios";

// export function ForgotPassword() {
//   const [email, setEmail] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post("/user/forgot-password", {
//         body: {
//           email: email,
//         },  
//       });
//       console.log(response.data);
//       // Handle success (e.g., save token, redirect, etc.)
//     } catch (error) {
//       console.error("Forgot Password failed:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <div className="forgot-container">
//       <form className="forgot-form" onSubmit={handleSubmit}>
//         <h2>Forgot Password?</h2>
//         <p>Enter your email address and we'll send you a link to reset your password.</p>

//         <div className="form-group">
//           <label>Email</label>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <button type="submit" className="reset-btn">Send Reset Link</button>
//       </form>
//     </div>
//   );
// }


import React, { useState } from "react";
import "../style/auth/forgotpassword.css";
import { api } from "../../../lib/axios";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);

    try {
      const response = await api.post("/user/forgot-password", {email});

      setMessage(response.data?.message || "Reset link sent to your email.");
      setEmail("");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <form className="forgot-form" onSubmit={handleSubmit}>
        <h2>Forgot Password?</h2>
        <p>Enter your email address and we'll send you a link to reset your password.</p>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="reset-btn" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {/* ✅ Feedback messages */}
        {message && <p className="success-msg">{message}</p>}
        {error && <p className="error-msg">{error}</p>}
      </form>
    </div>
  );
}
