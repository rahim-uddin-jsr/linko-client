import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const PostContext = createContext();
const PostProvider = ({ children }) => {
  const [refetch, setRefetch] = useState(false);
  const [postData, setPostData] = useState([]);
  const [popularPost, setPopularPost] = useState([]);
  const [commentRefetch, setCommentRefetch] = useState(false);
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
  }, [refetch]);

  const postInfo = {
    postData,
    setRefetch,
    refetch,
    popularPost,
    commentRefetch,
    setCommentRefetch,
  };
  return (
    <PostContext.Provider value={postInfo}>{children}</PostContext.Provider>
  );
};

export default PostProvider;
