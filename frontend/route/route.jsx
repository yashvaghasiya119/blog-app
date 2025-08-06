// route/route.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/home";
import { Login } from "../pages/auth/login";

export function AppRoutes() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
      },
  ]);

  return <RouterProvider router={route} />;
}
