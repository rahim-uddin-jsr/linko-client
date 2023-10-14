/* eslint-disable react/no-unescaped-entities */
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

const schema = yup
  .object({
    email: yup
      .string()
      .email("please write a valid email")
      .min(7, "at least 5 characters"),
  })
  .required("this filed is required");

export const Signin = () => {
  const { signIn, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const { email, password } = data;
    signIn(email, password)
      .then((res) => {
        console.log("🚀 ~ file: Signup.jsx:43 ~ onSubmit ~ res:", res);
        Swal.fire("Signin success!").then(() => {
          setUser(res?.user);
          reset();
          navigate(from);
        });
      })
      .catch((err) => {
        console.log("🚀 ~ file: Signup.jsx:45 ~ signUp ~ err:", err);
      });
  };
  return (
    <div className="w-screen mx-auto">
      <div className="hero min-h-screen bg-base-200 ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Signin now!</h1>
            <p className="py-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum,
              quod!
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  {...register("email")}
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="password">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="password"
                  className="input input-bordered"
                  {...register("password")}
                />
                {errors?.password?.message && (
                  <p className="text-red-500 text-left capitalize">
                    {errors?.password?.message}
                  </p>
                )}
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Signin</button>
              </div>
              <div className="divider">OR</div>
              <GoogleAuth />
              <label className="label label-text-alt">
                <span className=" text-center w-full">
                  Don't have an account?{" "}
                  <Link className="link link-hover" to={`/signup`}>
                    Signup
                  </Link>
                </span>
              </label>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
