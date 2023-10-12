import { createBrowserRouter } from "react-router-dom";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import { Main } from "../layout/Main/Main";
import { About } from "../pages/About/About";
import { Home } from "../pages/Home/Home";
import PostDetails from "../pages/PostDetails/PostDetails";
import { Profile } from "../pages/Profile/Profile";
import { Signin } from "../pages/Signin/Signin";
import { Signup } from "../pages/Signup/Signup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: `/post-details/:id`,
        element: (
          <PrivateRoute>
            <PostDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "/signin", element: <Signin /> },
  { path: "/signup", element: <Signup /> },
]);
