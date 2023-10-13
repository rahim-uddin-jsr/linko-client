import { Dialog } from "@headlessui/react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import ImageUploader from "../ImageUploader/ImageUploader";
import Modal from "../modal/modal";

const PostYourThots = () => {
  const { user } = useContext(AuthContext);

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }
  const [text, setText] = useState("");
  const [textAreaHeight, setTextAreaHeight] = useState("auto");

  const handleChange = (event) => {
    const { value, style } = event.target;
    setText(value);
    style.height = "auto";
    style.height = `${event.target.scrollHeight}px`;
  };
  return (
    <div className="xl:w-4/6 lg:w-1/2 md:w-10/12 mx-3 md:mx-auto my-5">
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex gap-6">
            <div className="avatar">
              <div className=" rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <div className="w-12 h-12 flex rounded-full text-2xl justify-center items-center">
                  {user?.displayName ? user?.displayName?.slice(0, 1) : "U"}
                </div>
              </div>
            </div>
            <input
              onClick={() => setIsOpen(true)}
              type="text"
              placeholder="Whats on your mind?"
              className="input input-bordered input-primary w-full rounded-lg"
            />
          </div>
          <div className="divider"></div>
        </div>
      </div>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} closeModal={closeModal}>
        <Dialog.Panel className="w-full card bg-base-200 max-w-md transform overflow-hidden rounded-2x p-6 text-left align-middle shadow-xl transition-all">
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-center relative mb-4"
          >
            <span className="">Create Post</span>
            <button
              onClick={closeModal}
              className="rounded-full p-1 absolute top-0 right-3 btn-neutral"
            >
              <svg
                className="w-4 h-4 fill-black"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path>
              </svg>
            </button>
          </Dialog.Title>
          <div className="mt-2">
            <textarea
              className="resize-none w-full p-2 border rounded overflow-hidden"
              style={{ height: textAreaHeight }}
              placeholder="Type your message here..."
              value={text}
              onChange={handleChange}
            />
            <div>
              <ImageUploader setIsOpen={setIsOpen} text={text} />
            </div>
          </div>
        </Dialog.Panel>
      </Modal>
    </div>
  );
};

export default PostYourThots;
