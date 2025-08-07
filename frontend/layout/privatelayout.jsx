// components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie"; // ✅ Import js-cookie
import { Navbar } from "../componets/navbar";

export function PrivateRoute({ children }) {
  const token = Cookies.get(); 
  console.log("🚀 ~ PrivateRoute ~ token:", token);

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>
  {children}
  </>;
}
