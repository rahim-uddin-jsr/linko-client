import { useParams } from "react-router-dom";

function PostDetails() {
  const { id } = useParams();
  console.log("🚀 ~ file: PostDetails.jsx:5 ~ PostDetails ~ id:", id);
  return <div>PostDetails</div>;
}

export default PostDetails;
