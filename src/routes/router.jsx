import { createBrowserRouter } from "react-router-dom";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import { Main } from "../layout/Main/Main";
import { About } from "../pages/About/About";
import Error from "../pages/Error/Error";
import { Home } from "../pages/Home/Home";
import PostDetails from "../pages/PostDetails/PostDetails";
import { Profile } from "../pages/Profile/Profile";
import { Signin } from "../pages/Signin/Signin";
import { Signup } from "../pages/Signup/Signup";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
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
        path: `/post/:id`,
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
