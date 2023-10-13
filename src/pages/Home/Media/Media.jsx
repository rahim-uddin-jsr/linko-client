import React, { useContext } from "react";
import { PostContext } from "../../../context/PostProvider/PostProvider";
import SingleMedia from "./SingleMedia";

const Media = () => {
  const { postData } = useContext(PostContext);
  console.log(postData);
  return (
    <div className="w-4/6 mx-auto">
      <h2 className="my-5 text-3xl">Media</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
        {postData.map((post, idx) => (
          <SingleMedia key={idx} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Media;
