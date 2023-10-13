import { useContext, useEffect } from "react";
import PostYourThots from "../../components/PostYourThots/PostYourThots";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import Media from "./Media/Media";
import PopularPost from "./PopularPost/PopularPost";

export const Home = () => {
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", "dracula");
  });
  const { user } = useContext(AuthContext);
  return (
    <div className={``}>
      <PostYourThots />
      <Media />
      <PopularPost />
    </div>
  );
};
