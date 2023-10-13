import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../../context/PostProvider/PostProvider";
import SingleMedia from "../Home/Media/SingleMedia";
function PostDetails() {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const { commentRefetch } = useContext(PostContext);

  const { id } = useParams();
  console.log("🚀 ~ file: PostDetails.jsx:5 ~ PostDetails ~ id:", id);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/posts?id=${id}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log("🚀 ~ file: PostDetails.jsx:12 ~ axios.get ~ err:", err);
      });
  }, [id]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/comments?postId=${id}`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log("🚀 ~ file: PostDetails.jsx:27 ~ useEffect ~ err:", err);
      });
  }, [commentRefetch, id]);
  return (
    <div>
      <div className="xl:w-4/6 lg:w-1/2 md:w-10/12 mx-auto">
        <h2 className="my-5 text-3xl">Post Details</h2>
        <SingleMedia post={post} isDetails={true} />

        {comments[0] && (
          <>
            <h2 className="my-5 text-3xl">All comments of this post</h2>
            <div className="flex flex-col gap-2">
              {comments?.map((comment, idx) => (
                <div
                  className="card-body justify-center items-start h-1 shadow-lg rounded-lg bg-slate-900 "
                  key={idx}
                >
                  <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                      <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                        {/* real user detail should be added */}
                        <span className="text-2xl">K</span>
                      </div>
                    </div>
                    <span>{comment?.comment}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PostDetails;
