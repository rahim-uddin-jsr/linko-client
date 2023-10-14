import { Dialog } from "@headlessui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import placeholderImg from "../../assets/placeholder.jpg";
import Modal from "../../components/modal/modal";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

export const About = () => {
  const [aboutUser, setAboutUser] = useState({});
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formDataUser, setFormDataUser] = useState("");
  const [refetch, setRefetch] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };
  const img_token = import.meta.env.VITE_IMG_UPLOAD_TOKEN;
  const img_api_url = `https://api.imgbb.com/1/upload?key=${img_token}`;

  const { handleSubmit, register, reset } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setFormDataUser(formData);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (data) => {
    fetch(img_api_url, {
      method: "POST",
      body: formDataUser,
    })
      .then((res) => res.json())
      .then((imgRes) => {
        if (imgRes.data) {
          data.profileImg = imgRes?.data?.url;
          axios
            .put(`http://localhost:5000/users/${aboutUser._id}`, data, {
              headers: {
                Authorization: `Bearer,${localStorage.getItem("access_token")}`, // Set the Authorization header with the token
              },
            })
            .then((res) => {
              console.log(res.data);
              if (res.data.acknowledged) {
                setRefetch(!refetch);
                reset();
                setIsOpen(false);
              }
            });
        }
      })
      .catch((err) => {
        console.log("🚀 ~ file: About.jsx:45 ~ .then ~ err:", err);
      });
  };

  useEffect(() => {
    axios
      .post("http://localhost:5000/users/", { userId: user?.uid })
      .then((res) => {
        setAboutUser(res.data);
      })
      .catch((err) => {
        console.log("🚀 ~ file: About.jsx:11 ~ axios.post ~ err:", err);
      });
  }, [user?.uid, refetch]);
  console.log(aboutUser);

  return (
    <div>
      <h2 className="my-5 text-3xl">About</h2>
      <div className="relative card-body flex-col bg-neutral-focus max-w-4xl xl:w-4/6 lg:w-1/2 md:w-10/12 mx-auto outline outline-info -outline-offset-4 shadow-lg rounded-md mt-12">
        <button
          onClick={() => setIsOpen(true)}
          className="absolute top-5 right-5 w-12 h-12 btn-info btn-circle flex justify-center items-center"
        >
          <svg
            className="w-8 h-8 fill-info-content"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M6.41421 15.89L16.5563 5.74786L15.1421 4.33365L5 14.4758V15.89H6.41421ZM7.24264 17.89H3V13.6474L14.435 2.21233C14.8256 1.8218 15.4587 1.8218 15.8492 2.21233L18.6777 5.04075C19.0682 5.43128 19.0682 6.06444 18.6777 6.45497L7.24264 17.89ZM3 19.89H21V21.89H3V19.89Z"></path>
          </svg>
        </button>
        <div className="avatar mx-auto">
          <div className="w-24 rounded">
            {aboutUser?.profileImg ? (
              <img src={aboutUser?.profileImg} alt="user profile image" />
            ) : (
              <img src={placeholderImg} alt="user profile placeholder image" />
            )}
          </div>
          <br />
        </div>
        <h2 className="text-2xl text-primary-content">
          {aboutUser?.name ? aboutUser?.name : "--------"}
        </h2>
        <div className="w-full text-start flex justify-between h-12 items-center mt-5 shadow-md px-5">
          <div className="w-1/2">
            <h2 className="uppercase">email</h2>
          </div>
          <div className="w-1/2">
            <h2>{aboutUser?.email ? aboutUser?.email : "--------"}</h2>
          </div>
        </div>
        <div className="w-full text-start flex justify-between h-12 items-center mt-1 shadow-md px-5">
          <div className="w-1/2">
            <h2 className="uppercase">university</h2>
          </div>
          <div className="w-1/2">
            <h2 className="">
              {aboutUser?.university ? aboutUser?.university : "--------"}
            </h2>{" "}
          </div>
        </div>
        <div className="w-full text-start flex justify-between h-12 items-center mt-1 shadow-md px-5">
          <div className="w-1/2">
            <h2 className="uppercase">address</h2>
          </div>
          <div className="w-1/2">
            <h2 className="">
              {aboutUser?.address ? aboutUser?.address : "--------"}
            </h2>
          </div>
        </div>

        <Modal closeModal={closeModal} isOpen={isOpen} setIsOpen={setIsOpen}>
          <Dialog.Panel className="w-full card bg-base-200 max-w-md transform overflow-hidden rounded-2x p-6 text-left align-middle shadow-xl transition-all">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-center relative mb-4"
            >
              <span className="">Update you information</span>
              <button
                onClick={closeModal}
                className="rounded-full p-1 absolute top-0 right-3 btn-error"
              >
                <svg
                  className="w-4 h-4 fill-error-content"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path>
                </svg>
              </button>
            </Dialog.Title>
            <div className="mt-2">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-md mx-auto"
              >
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block  text-sm font-bold mb-2"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={aboutUser?.name}
                    {...register("name")}
                    className="w-full px-3 py-2 leading-tight  border rounded appearance-none focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block  text-sm font-bold mb-2"
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    defaultValue={aboutUser?.email}
                    name="email"
                    {...register("email")}
                    className="w-full px-3 py-2 leading-tight  border rounded appearance-none focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="university"
                    className="block  text-sm font-bold mb-2"
                  >
                    University:
                  </label>
                  <input
                    type="text"
                    id="university"
                    name="university"
                    defaultValue={aboutUser?.university}
                    {...register("university")}
                    className="w-full px-3 py-2 leading-tight  border rounded appearance-none focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="address"
                    className="block  text-sm font-bold mb-2"
                  >
                    Address:
                  </label>
                  <textarea
                    type="text"
                    id="address"
                    rows={5}
                    name="address"
                    defaultValue={aboutUser?.address}
                    {...register("address")}
                    className="w-full resize-none px-3 py-2 leading-tight  border rounded appearance-none focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4 ">
                  <label
                    htmlFor="photo"
                    className="block rounded-md capitalize relative text-info p-8 text-center text-sm font-bold mb-2 cursor-pointer border border-dashed"
                  >
                    {imagePreview && (
                      <img
                        className="w-full object-cover mb-5"
                        src={imagePreview}
                        alt="user image"
                      />
                    )}
                    {!imagePreview ? "Upload Photo:" : " change Uploaded photo"}
                    <svg
                      className="w-12 h-12 mx-auto fill-info-content"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M4 19H20V12H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V12H4V19ZM13 9V16H11V9H6L12 3L18 9H13Z"></path>
                    </svg>
                  </label>
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border appearance-none hidden"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
              </form>
            </div>
          </Dialog.Panel>
        </Modal>
      </div>
    </div>
  );
};
