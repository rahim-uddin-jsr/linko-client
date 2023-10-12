import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

const schema = yup
  .object({
    name: yup.string().min(3, "at least 2 characters"),
    university: yup.string().min(3, "at least 3 characters"),
    email: yup
      .string()
      .email("please write a valid email")
      .min(7, "at least 5 characters"),
    password: yup
      .string()
      .min(6, "password at least 6 character")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must contain at least one letter, one number and one special character"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required("this filed is required");

export const Signup = () => {
  const { signUp, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => {
    const { email, password } = data;
    signUp(email, password)
      .then((res) => {
        console.log("🚀 ~ file: Signup.jsx:43 ~ onSubmit ~ res:", res);
        Swal.fire("Signup success!").then(() => {
          reset();
          logOut().then(() => {
            navigate("/signin");
          });
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
          {/* <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div> */}
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label" htmlFor="name">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  type="text"
                  placeholder="full name"
                  className="input input-bordered"
                  {...register("name")}
                />
                {errors?.name?.message && (
                  <p className="text-red-500 text-left capitalize ">
                    {errors?.name?.message}
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label" htmlFor="university">
                  <span className="label-text">Your university name?</span>
                </label>
                <input
                  type="text"
                  placeholder="university name.."
                  className="input input-bordered"
                  {...register("university")}
                />
                {errors?.university?.message && (
                  <p className="text-red-500 text-left capitalize">
                    {errors?.university?.message}
                  </p>
                )}
              </div>
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
              <div className="form-control">
                <label className="label" htmlFor="confirmPassword">
                  <span className="label-text">Confirm password</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="confirm password"
                  className="input input-bordered"
                  {...register("confirmPassword")}
                />
                {errors?.confirmPassword?.message && (
                  <p className="text-red-500 text-left capitalize">
                    {errors?.confirmPassword?.message}
                  </p>
                )}
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Signup</button>
              </div>
              <div className="divider">OR</div>
              <GoogleAuth />
              <label className="label label-text-alt">
                <span className=" text-center w-full">
                  Already have an account?{" "}
                  <Link className="link link-hover" to={`/signin`}>
                    Signin
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
