// route/route.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/home";
import { Login } from "../pages/auth/login";
import { ForgotPassword } from "../pages/auth/forgotpassword";
import { ResetPassword } from "../pages/auth/resetpassword";
import { Register } from "../pages/auth/register";
import { PublicLayout } from "../layout/publiclayout";
import { PrivateRoute } from "../layout/privatelayout";
import { AddBlog } from "../pages/blogs/addblog";
import { AllBlog } from "../pages/blogs/allblog";
import { MyBlog } from "../pages/blogs/myblog";
import { SingleBlog } from "../pages/blogs/singelblog";

export function AppRoutes() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <PublicLayout/>,
      children:[
        {
            path:"/",
            element:<Home/>
        },
        {
          path:"/auth/register",
          element:<Register/>
        },
        {
          path: "/auth/login",
          element: <Login />,
        },
        {
          path: "/blog/:id",
          element: (
              <SingleBlog/>
          ),
        },
        {
          path: "/auth/forgot-password",
          element: (
            <PrivateRoute>
              <ForgotPassword />
            </PrivateRoute>
          ),
        },
        {
          path: "/auth/reset-password",
          element: (
            <PrivateRoute>
              <ResetPassword />
            </PrivateRoute>
          ),
        },
        {
          path: "/blog/add",
          element: (
            <PrivateRoute>
              <AddBlog/>
            </PrivateRoute>
          ),
        },
        {
          path: "/blog",
          element: (
            <PrivateRoute>
              <AllBlog/>
            </PrivateRoute>
          ),
        },
        {
          path: "/blog/me",
          element: (
            <PrivateRoute>
              <MyBlog/>
            </PrivateRoute>
          ),
        },
        
    ],
    },

  
  ]);

  return <RouterProvider router={route} />;
}
