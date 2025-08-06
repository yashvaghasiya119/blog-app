// route/route.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/home";
import { Login } from "../pages/auth/login";
import { ForgotPassword } from "../pages/auth/forgotpassword";
import { ResetPassword } from "../pages/auth/resetpassword";

export function AppRoutes() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/auth/reset-password",
        element: <ResetPassword />,
      },
    
  ]);

  return <RouterProvider router={route} />;
}
