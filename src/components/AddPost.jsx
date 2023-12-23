import { useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { setDoc, doc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, storage } from "../Firebase";
import PropTypes from "prop-types";

export default function AddPost({ setisPost }) {
  const imageref = useRef();
  const [blobimg, setblobimg] = useState({ image: "" });
  const [uploadimage, setuploadimage] = useState();
  const [post, setpost] = useState({
    image: "",
    Text: "",
  });

  // Posting feature
  const uploadPost = async () => {
    // saving image
    if (!blobimg) {
      alert("Please Upload an image");
      return;
    }

    try {
      const Storageref = ref(storage, `${"image"}/${uploadimage?.name}`);
      await uploadBytes(Storageref, uploadimage);
      const downloadURL = await getDownloadURL(Storageref);
      console.log(downloadURL);
      setpost({ ...post, image: downloadURL });
    } catch (error) {
      console.log(error);
    }
    console.log(uploadimage);
  };

  console.log(post);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center h-full bg-black bg-opacity-75 backdrop-blur-md">
      <div className="bg-white p-5 w-[90vw]">
        <div className="flex justify-end">
          <RxCross2
            onClick={() => {
              setisPost(false);
            }}
            size={25}
            cursor={"pointer"}
          />
        </div>
        <div className="flex flex-col justify-center mt-3 gap-5">
          <div className="flex flex-col items-center justify-center gap-3">
            {blobimg.image ? (
              <img src={blobimg.image} className="w-36 h-36 object-cover" />
            ) : (
              <img
                className="w-32 cursor-pointer"
                src="https://static.thenounproject.com/png/485834-200.png"
                alt=""
                onClick={() => {
                  imageref.current.click();
                }}
              />
            )}
            <input
              ref={imageref}
              className="hidden px-4 py-2 border-2 outline-none"
              type="file"
              onChange={(e) => {
                setblobimg({
                  ...blobimg,
                  image: URL.createObjectURL(e.target.files[0]),
                });
                setuploadimage(e.target.files[0]);
              }}
            />
          </div>
          <textarea
            placeholder="Write"
            className="border-[1px] p-5 outline-none border-gray-300"
            cols="35"
            rows="8"
            value={post.Text}
            onChange={(e) => {
              setpost({ ...post, Text: e.target.value });
            }}
          ></textarea>
          <button
            onClick={uploadPost}
            className="bg-black text-white p-2 font-semibold"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

AddPost.propTypes = {
  setisPost: PropTypes.bool.isRequired,
};
