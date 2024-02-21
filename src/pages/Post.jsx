import { useRef, useState } from "react";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, storage } from "../Firebase";
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";
import { useAuth } from "../ContextProvider/AuthContext";

export default function Post() {
  const imageref = useRef();
  const { currentUser } = useAuth();

  const jwt = currentUser.uid;
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
      const existingPosts = User.data().Posts || [];
      const updatedPost = {
        ...post,
        image: downloadURL,
        Name: User.data().Name,
        Pic: User.data().Pic,
      };
      const updatedPostArray = [...existingPosts, updatedPost];
      await updateDoc(docref, {
        Posts: updatedPostArray,
      });
      setisloading(false);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isloading ? <Loader /> : null}
      <div className="flex justify-between p-5">
        <h1 className="text-lg font-semibold">Post</h1>
        <Link to={`/profile`}>
          <IoMdArrowBack size={28} color="white" />
        </Link>
      </div>
      <div className="p-5">
        <div className="flex justify-end"></div>
        <div className="flex flex-col justify-center gap-5 mt-3">
          <div className="flex flex-col items-center justify-center gap-3">
            {blobimg.image ? (
              <img src={blobimg.image} className="object-cover w-36 h-36" />
            ) : (
              <div className="p-5 border-2 rounded-full cursor-pointer">
                <IoCloudUploadOutline
                  className="mx-auto "
                  size={80}
                  onClick={() => {
                    imageref.current.click();
                  }}
                />
              </div>
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
          <div className="flex items-center justify-center ">
            <textarea
              placeholder="Write"
              className="border-[1px] w-[100vw] p-5 outline-none bg-[#383838] rounded-xl border-zinc-800"
              cols="30"
              rows="8"
              value={post.Text}
              onChange={(e) => {
                setpost({ ...post, Text: e.target.value });
              }}
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              onClick={uploadPost}
              className="p-2.5 font-semibold w-[90vw] text-[13px] rounded-full text-white bg-[#1d9bf0]"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
