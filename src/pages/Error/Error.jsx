import { Link, useRouteError } from "react-router-dom";
import errorImg from "../../assets/error.svg";
const Error = () => {
  const { error, status } = useRouteError();
  console.log("🚀 ~ file: Error.jsx:5 ~ Error ~ error:", error);

  return (
    <div className="bg-[#dde7ff] w-full h-full">
      <img
        className="md:max-w-lg object-contain mx-auto rounded-[32px] mb-5"
        src={errorImg}
        alt=""
      />
      <h1 className="text-6xl font-bold mb-3 text-[#0c0019]">{status}</h1>
      <h1 className="text-center mb-3 text-[#0c0019] text-3xl">
        {error?.message}
      </h1>
      <p className="text-center mb-3 text-[#040203] opacity-95">
        {error?.stack}
      </p>
      <Link to={`/`}>
        <button className="btn-success my-8">Back to Home</button>
      </Link>
    </div>
  );
};

export default Error;
