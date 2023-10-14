import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

export const PostContext = createContext();
const PostProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [refetch, setRefetch] = useState(false);
  const [postData, setPostData] = useState([]);
  const [popularPost, setPopularPost] = useState([]);
  const [commentRefetch, setCommentRefetch] = useState(false);
  const [reactionRefetch, setRactionRefetch] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:5000/posts")
      .then((res) => {
        setPostData(res.data);
        setPopularPost(
          [...res.data].sort((a, b) => b.totalLike - a.totalLike).splice(0, 3)
        );
      })
      .catch((err) => {
        console.log("🚀 ~ file: PostProvider.jsx:12 ~ axios.post ~ err:", err);
      });
  }, [refetch, reactionRefetch]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/reactions?userId=${user?.uid}`)
      .then((res) => {
        const reactions = res.data;
        postData.forEach((post) => {
          const finded = reactions.find(
            (reaction) => reaction.postId === post._id
          );
          if (finded) {
            post.like = true;
          }
          console.log(
            "🚀 ~ file: PostProvider.jsx:39 ~ postData.forEach ~ finded:",
            finded
          );
        });
      });
  }, [user, reactionRefetch, postData]);

  const postInfo = {
    postData,
    setRefetch,
    refetch,
    popularPost,
    commentRefetch,
    setCommentRefetch,
    reactionRefetch,
    setRactionRefetch,
  };
  return (
    <PostContext.Provider value={postInfo}>{children}</PostContext.Provider>
  );
};

export default PostProvider;
