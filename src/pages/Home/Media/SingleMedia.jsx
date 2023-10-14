import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";
import { PostContext } from "../../../context/PostProvider/PostProvider";
import Comment from "./Comment";
const SingleMedia = ({ post, isDetails }) => {
  const { setRefetch, refetch } = useContext(PostContext);
  const { user } = useContext(AuthContext);
  const { caption, imgUrl } = post;
  const [love, setLove] = useState(post.reaction);
  const [totalLikes, setTotalLikes] = useState(post.totalLike);
  let data = {};
  let totalLike;
  const handleReact = () => {
    if (!post.reaction === false) {
      totalLike = post.totalLike - 1;
      setTotalLikes(totalLike);
    } else {
      totalLike = post.totalLike + 1;
      setTotalLikes(totalLike);
    }
    if (post.reaction !== undefined) {
      data = {
        reaction: !post.reaction,
        totalLike,
        userId: user.uid,
      };
    } else {
      data = {
        reaction: true,
      };
    }

    axios
      .put(`http://localhost:5000/posts/${post._id}/reaction`, data)
      .then((response) => {
        console.log("Reaction updated successfully:", response.data);
        setRefetch(!refetch);
        setLove(!love);
      })
      .catch((error) => {
        console.error("Error updating reaction:", error);
      });
  };

  return (
    <div
      className={`card min-h-[500px] w-full bg-base-100 shadow-xl ${
        isDetails && "mt-12"
      }`}
    >
      <figure className="overflow-hidden">
        <img
          className="w-full h-[250px] object-cover"
          src={imgUrl}
          alt="Shoes"
        />
      </figure>
      <div className="card-body p-4">
        {!isDetails ? (
          <p className="text-start">{`${caption}`.slice(0, 30)}...</p>
        ) : (
          <p>{caption}</p>
        )}
        <div className="flex justify-between items-center mt-2">
          <Link to={`/post/${post._id}`}>
            <button className="btn-primary">Detail</button>
          </Link>
          <div className="">
            <button
              onClick={handleReact}
              className="btn btn-square outline-none"
            >
              {!love ? (
                <svg
                  className="fill-red-50 w-8 h-8"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  {/* ... */}
                </svg>
              ) : (
                <svg
                  className="fill-red-500 w-8 h-8"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  {/* ... */}
                </svg>
              )}
              <span className="badge block w-full">{totalLikes}</span>
            </button>
          </div>
        </div>
        {/* comment */}
        <Comment id={post?._id} />
      </div>
    </div>
  );
};

export default SingleMedia;
