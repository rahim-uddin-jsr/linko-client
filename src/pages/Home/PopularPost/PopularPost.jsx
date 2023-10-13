import { useContext } from "react";
import { PostContext } from "../../../context/PostProvider/PostProvider";
import SingleMedia from "../Media/SingleMedia";

const PopularPost = () => {
  const { popularPost } = useContext(PostContext);
  return (
    <div>
      <div className="xl:w-4/6 lg:w-1/2 md:w-10/12 mx-auto pt-8">
        <h2 className="my-8 text-3xl">Popular post</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center">
          {popularPost.map((post, idx) => (
            <SingleMedia key={idx} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularPost;
