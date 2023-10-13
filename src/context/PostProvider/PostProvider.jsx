import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const PostContext = createContext();
const PostProvider = ({ children }) => {
  const [refetch, setRefetch] = useState(false);
  const [postData, setPostData] = useState([]);
  const [popularPost, setPopularPost] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/posts")
      .then((res) => {
        setPostData(res.data);
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
  };
  return (
    <PostContext.Provider value={postInfo}>{children}</PostContext.Provider>
  );
};

export default PostProvider;
