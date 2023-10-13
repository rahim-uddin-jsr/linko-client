import { useContext, useEffect } from "react";
import PostYourThots from "../../components/PostYourThots/PostYourThots";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

export const Home = () => {
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", "dracula");
  });
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <div className={`text-primary`}>
      <PostYourThots />
    </div>
  );
};
