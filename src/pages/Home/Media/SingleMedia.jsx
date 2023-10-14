import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";
import { PostContext } from "../../../context/PostProvider/PostProvider";
import { addToDb } from "../../../hooks/useLocalStorage";
import Comment from "./Comment";
const SingleMedia = ({ post, isDetails }) => {
  const { reactionRefetch, setRactionRefetch } = useContext(PostContext);
  const { user } = useContext(AuthContext);
  const { caption, imgUrl } = post;
  const [love, setLove] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);

  const handleReact = () => {
    if (!user) {
      Swal.fire("please login first!");
      return;
    }

    let data = {
      userId: user?.uid,
    };

    if (post.like === true) {
      data.reaction = false;
      if (totalLikes !== 0) {
        data.totalLike = post?.totalLike - 1;
      }
    } else {
      data.reaction = true;
      if (totalLikes !== undefined) {
        data.totalLike = post?.totalLike + 1;
      }
    }

    // const data = {
    //   reaction: !post.reaction,
    //   totalLike,
    //   userId: user.uid,
    // };
    axios
      .put(`http://localhost:5000/posts/${post._id}/reaction`, data)
      .then((response) => {
        console.log("Reaction updated successfully:", response.data);
        setRactionRefetch(!reactionRefetch);
      })
      .catch((error) => {
        console.error("Error updating reaction:", error);
      });
  };
  useEffect(() => {
    setTotalLikes(post.totalLike);
    setLove(post.like);
    addToDb("id");
  }, [post, reactionRefetch]);
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
