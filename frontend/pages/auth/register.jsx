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
    <h1>this is register page</h1>
  );
}
