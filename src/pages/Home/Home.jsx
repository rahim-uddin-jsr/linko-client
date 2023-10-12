import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

export const Home = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  return <div>Home</div>;
};
