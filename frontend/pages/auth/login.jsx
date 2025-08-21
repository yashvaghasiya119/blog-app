// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "../style/auth/login.css";
// import { api } from "../../lib/axios";
// import { errorToast, successToast } from "../../lib/toastify";

// export function Login() {
//   const [formData, setFormData] = useState({
//      email: "",
//       password: ""
//     });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState(null);

//   const togglePassword = () => setShowPassword(prev => !prev);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMsg(null);
//     try {
//       const response = await api.post("/user/login", formData);
//       if(!response.data.err){
//         successToast(response.data.message)
//       }
//       console.log("============",response.data.err);
//     } catch (error) {
//       const msg = error.response?.data?.message || "Login failed. Please try again.";
//       // console.log("=============",msg);
      
//       errorToast(msg)
//       setErrorMsg(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <form className="login-form" onSubmit={handleSubmit}>
//         <h2>Login to Your Account</h2>

//         {errorMsg && <p className="error-msg">{errorMsg}</p>}

//         <div className="form-group">
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             required
//             placeholder="Enter your email"
//             onChange={handleChange}
//             disabled={loading}
//           />
//         </div>

//         <div className="form-group">
//           <label>Password</label>
//           <div className="password-wrapper">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={formData.password}
//               required
//               placeholder="Enter your password"
//               onChange={handleChange}
//               disabled={loading}
//             />
//             <span onClick={togglePassword} className="toggle-password" style={{ cursor: "pointer" }}>
//               {showPassword ? "🙈" : "👁️"}
//             </span>
//           </div>
//         </div>

//         <div className="extra-links">
//           <Link to="/auth/forgot-password">Forgot Password?</Link>
//           <Link to="/auth/register">Don't have an account?</Link>
//         </div>

//         <button type="submit" className="login-btn" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// }


import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style/auth/login.css";
import { api } from "../../lib/axios";
import { errorToast, successToast } from "../../lib/toastify";

export function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePassword = () => setShowPassword(prev => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/user/login", formData);

      if (response.data.err) {
        // Backend says error
        errorToast(response.data.message || "Login failed.");
      } else {
        // Success
        successToast(response.data.message || "Login successful!");
        // Save token or redirect here if needed
        // localStorage.setItem("usertoken", response.data.token);
        // Example: window.location.href = "/dashboard";
      }

    } catch (error) {
      // Network / server error
      const msg = error.response?.data?.message || "Something went wrong. Please try again.";
      errorToast(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login to Your Account</h2>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            required
            placeholder="Enter your email"
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              required
              placeholder="Enter your password"
              onChange={handleChange}
              disabled={loading}
            />
            <span
              onClick={togglePassword}
              className="toggle-password"
              style={{ cursor: "pointer" }}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
        </div>

        <div className="extra-links">
          <Link to="/auth/forgot-password">Forgot Password?</Link>
          <Link to="/auth/register">Don't have an account?</Link>
        </div>

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
