import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";
import { PostContext } from "../../../context/PostProvider/PostProvider";

const SingleMedia = ({ post }) => {
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
    <div className="card w-full h-96 bg-base-100 shadow-xl">
      <figure>
        <img className="object-fill w-full" src={imgUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{caption}</h2>
        <p></p>
        <div className="card-actions justify-end">
          {totalLikes}
          <button onClick={handleReact} className="btn btn-square outline-none">
            {!love ? (
              <svg
                className="fill-red-50 w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z"></path>
              </svg>
            ) : (
              <svg
                className="fill-red-500 w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleMedia;
