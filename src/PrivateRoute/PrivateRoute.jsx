import { useContext } from "react";
import { Dna } from "react-loader-spinner";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider/AuthProvider";
export const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <>
        <div>
          <div className=" flex justify-center items-center w-full h-screen"></div>
          <Dna
            className="justify-center items-center"
            height={100}
            width={100}
            radius={5}
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />
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
