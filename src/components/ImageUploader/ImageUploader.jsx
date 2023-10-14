import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import { PostContext } from "../../context/PostProvider/PostProvider";

const ImageUploader = ({ setIsOpen, text }) => {
  const img_token = import.meta.env.VITE_IMG_UPLOAD_TOKEN;
  const img_api_url = `https://api.imgbb.com/1/upload?key=${img_token}`;
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [formDataUser, setFormDataUser] = useState("");
  const { user } = useContext(AuthContext);
  const { refetch, setRefetch } = useContext(PostContext);

  const onDrop = async (acceptedFiles) => {
    // Handle the dropped files here
    const updatedImages = acceptedFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setSelectedImages([...selectedImages, ...updatedImages]);

    const formData = new FormData();
    formData.append("image", acceptedFiles[0]);
    setFormDataUser(formData);

    acceptedFiles.forEach((file, index) => {
      formData.append(`image${index + 1}`, file);
    });
    // Append the object data (replace with your actual object)
    const objectData = {
      name: "John Doe",
      age: 30,
    };
    formData.append("objectData", JSON.stringify(objectData));
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*", // Only allow image files
  });
  const handlePost = () => {
    if (!user) {
      Swal.fire("please login first!");
      setIsOpen(false);
      return;
    }
    fetch(img_api_url, {
      method: "POST",
      body: formDataUser,
    })
      .then((res) => res.json())
      .then((imgRes) => {
        const imageUrl = imgRes?.data?.display_url;
        if (imageUrl) {
          const data = {
            caption: text,
            imgUrl: imageUrl,
            userId: user.uid,
          };
          axios
            .post(`http://localhost:5000/post?uid=${user.uid}`, data, {
              headers: {
                Authorization: `Bearer,${localStorage.getItem("access_token")}`, // Set the Authorization header with the token
              },
              onUploadProgress: (progressEvent) => {
                const progress =
                  (progressEvent.loaded / progressEvent.total) * 100;
                setUploadPercentage(progress);
              },
            })
            .then((res) => {
              setIsOpen(false);
              setRefetch(!refetch);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
  };

  useEffect(() => {
  }, [uploadPercentage]);
  return (
    <div className="flex flex-col items-center">
      <div
        {...getRootProps()}
        className="border border-dashed p-6 rounded cursor-pointer w-full flex flex-col justify-center items-center"
      >
        <input {...getInputProps()} />

        <svg
          className="fill-white w-8 h-8"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M7 20.9811C3.64378 20.7257 1 17.9216 1 14.5C1 12.1716 2.22429 10.1291 4.06426 8.9812C4.56469 5.044 7.92686 2 12 2C16.0731 2 19.4353 5.044 19.9357 8.9812C21.7757 10.1291 23 12.1716 23 14.5C23 17.9216 20.3562 20.7257 17 20.9811V21H7V20.9811ZM13 13H16L12 8L8 13H11V17H13V13Z"></path>
        </svg>
        <span className="mt-3"></span>
        <span></span>
        <p className="text-center opacity-70">
          Add photo <br /> or <br /> Drag & drop an image here,{" "}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {selectedImages.slice(0, 4).map((image, index) => (
          <div key={index} className="relative rounded-md overflow-hidden">
            <img
              src={image.url}
              alt={`Selected ${index}`}
              className="w-48 h-48 object-cover"
            />
            {index == 3 && (
              <div className="w-48 h-48 flex bg-slate-800/[.3] justify-center items-center absolute top-0">
                <span className="text-black font-semibold text-2xl">
                  {selectedImages.length - 3} Images more
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-8 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={handlePost}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;
