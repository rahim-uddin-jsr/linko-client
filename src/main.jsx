import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthProvider/AuthProvider.jsx";
import PostProvider from "./context/PostProvider/PostProvider.jsx";
import "./index.css";
import { router } from "./routes/router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PostProvider>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </PostProvider>
  </React.StrictMode>
);
