import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../../context/PostProvider/PostProvider";
import SingleMedia from "../Media/SingleMedia";

const PopularPost = () => {
  const { postData } = useContext(PostContext);
  const [popularPost, setPopularPost] = useState([]);
  useEffect(() => {
    const newPostData = [...postData];
    const popular = newPostData
      .sort((a, b) => b.totalLike - a.totalLike)
      .splice(0, 3);
    setPopularPost(popular);
  }, [postData]);

  return (
    <div>
      <div className="w-4/6 mx-auto pt-8">
        <h2 className="my-8 text-3xl">Popular post</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
          {popularPost.map((post, idx) => (
            <SingleMedia key={idx} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularPost;
