import { useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, storage } from "../Firebase";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

export default function AddPost({ setisPost }) {
  const imageref = useRef();
  const jwt = localStorage.getItem("jwt");
  const [blobimg, setblobimg] = useState({ image: "" });
  const [uploadimage, setuploadimage] = useState();
  const [isloading, setisloading] = useState(false);
  const navigate = useNavigate();
  const [post, setpost] = useState({
    image: "",
    Text: "",
    Name: "",
    Pic: "",
  });

  const uploadPost = async () => {
    if (!blobimg) {
      alert("Post");
      return;
    }

    setisloading(true);

    try {
      const Storageref = ref(storage, `${"image"}/${uploadimage?.name}`);
      await uploadBytes(Storageref, uploadimage);
      const downloadURL = await getDownloadURL(Storageref);
      const docref = doc(db, "USERS", jwt);
      const User = await getDoc(docref);

      const updatedPost = {
        ...post,
        image: downloadURL,
        Name: User.data().Name,
        Pic: User.data().Pic,
      };

      await updateDoc(docref, {
        Posts: [...User.data().Posts, updatedPost],
      });

      setisloading(false);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center h-full bg-black bg-opacity-75 backdrop-blur-md`}
      >
        {isloading ? <Loader /> : null}
        <div className="bg-white p-5 w-[90vw]">
          <div className="flex justify-end">
            <RxCross2
              onClick={() => {
                setisPost(false);
              }}
              size={25}
              color="black"
              cursor={"pointer"}
            />
          </div>
          <div className="flex flex-col justify-center gap-5 mt-3">
            <div className="flex flex-col items-center justify-center gap-3">
              {blobimg.image ? (
                <img src={blobimg.image} className="object-cover w-36 h-36" />
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
              className="p-2 font-semibold text-white bg-black"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
