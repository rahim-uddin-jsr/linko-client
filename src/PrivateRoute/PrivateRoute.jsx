import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider/AuthProvider";

export const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  console.log("🚀 ~ file: PrivateRoute.jsx:7 ~ PrivateRoute ~ user:", user);
  if (user) {
    return children;
  } else {
    return (
      <Navigate
        to={"/signin"}
        replace={true}
        state={{ from: location }}
      ></Navigate>
    );
  }
};
