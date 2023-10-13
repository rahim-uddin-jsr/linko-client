import axios from "axios";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";
import { PostContext } from "../../../context/PostProvider/PostProvider";
const Comment = ({ id }) => {
  const { user } = useContext(AuthContext);
  const { commentRefetch, setCommentRefetch } = useContext(PostContext);
  const [text, setText] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [textAreaHeight, setTextAreaHeight] = useState("auto");

  const handleChange = (event) => {
    const { value, style } = event.target;
    setText(value);
    style.height = "auto";
    style.height = `${event.target.scrollHeight}px`;
  };
  const handleComment = (e) => {
    e.preventDefault();
    const data = {
      userId: user.uid,
      postId: id,
      comment: text,
    };

    axios
      .post(`http://localhost:5000/comments`, data)
      .then((response) => {
        if (response.data.acknowledged) {
          setText("");
          Swal.fire("comment added");
          setCommentRefetch(!commentRefetch);
        }
      })
      .catch((error) => {
        console.error("Error updating reaction:", error);
      });
    console.log("🚀 ~ file: Comment.jsx:22 ~ handleComment ~ data:", data);
  };
  return (
    <div className="mt-2">
      <form onSubmit={handleComment}>
        <textarea
          className="resize-none w-full p-2 border rounded  overflow-hidden"
          style={{ height: textAreaHeight }}
          placeholder="Type your comment here..."
          value={text}
          onChange={handleChange}
          required={true}
        />
        <br />
        <button disabled={!text} className=" btn-secondary w-full">
          add comment
        </button>
      </form>
    </div>
  );
};

export default Comment;
