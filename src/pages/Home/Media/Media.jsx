import { useContext } from "react";
import { PostContext } from "../../../context/PostProvider/PostProvider";
import SingleMedia from "./SingleMedia";

const Media = () => {
  const { postData } = useContext(PostContext);
  console.log(postData);
  return (
    <div className="xl:w-4/6 lg:w-1/2 md:w-10/12 mx-auto">
      <h2 className="my-5 text-3xl">Media</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center">
        {postData.map((post, idx) => (
          <SingleMedia key={idx} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Media;
