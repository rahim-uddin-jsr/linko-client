import { useContext } from "react";
import { Grid } from "react-loader-spinner";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider/AuthProvider";
export const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  console.log(
    "🚀 ~ file: PrivateRoute.jsx:7 ~ PrivateRoute ~ loading:",
    loading
  );
  const location = useLocation();

  if (loading) {
    return (
      <>
        <div className="flex flex-col gap-8 justify-start mt-16 items-center w-full h-screen">
          <Grid
            height="80"
            width="80"
            color="#fff"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          <h2 className="text-2xl">user data is lodging...</h2>
        </div>
      </>
    );
  }
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
