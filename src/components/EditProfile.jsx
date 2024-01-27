import { RxCross2 } from "react-icons/rx";
import { IoCloudUploadOutline } from "react-icons/io5";
import PropTypes from "prop-types";
import { db, storage } from "../Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
export default function EditProfile({ setisedit }) {
  const jwt = window.localStorage.getItem("jwt");
  const [user, setUser] = useState({
    Name: "",
    Bio: "",
    Pic: "",
  });
  const [uploadimage, setuploadimage] = useState();
  const [blobimg, setblobimg] = useState({ image: "" });
  const [isloading, setisloading] = useState(false);
  const imageref = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "USERS", jwt);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUser(data);
        } else {
          console.log("Document does not exist");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [jwt]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!blobimg) {
      alert("select");
      return;
    }
    try {
      setisloading(true);
      const Storageref = ref(storage, `image/userImage/${uploadimage?.name}`);
      await uploadBytesResumable(Storageref, uploadimage);
      const downloadURL = await getDownloadURL(Storageref);
      const updatedProfile = {
        ...user,
        Pic: downloadURL,
      };
      localStorage.setItem("UserPic", downloadURL);
      const docRef = doc(db, "USERS", jwt);
      await updateDoc(docRef, updatedProfile);
      setisedit(false);
      navigate("/home");
    } catch (error) {
      console.error("Error submitting data: ", error);
      setisloading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center h-full bg-black bg-opacity-75 backdrop-blur-md">
        <div className="p-6 rounded-xl bg-[#161616] w-[90vw]">
          <div className="flex justify-end">
            <RxCross2
              cursor={"pointer"}
              onClick={() => {
                setisedit(false);
              }}
              size={25}
              color={"white"}
            />
          </div>
          {/* <div className="flex flex-col items-center justify-center gap-3">
            <label className="font-semibold">ProfilePic*</label>
            {blobimg.image ? (
              <img src={blobimg.image} className="object-cover w-36 h-36" />
            ) : (
              <IoCloudUploadOutline
                onClick={() => {
                  imageref.current.click();
                }}
                size={70}
                className="mx-auto"
                color="white"
              />
            )}
            <input
              ref={imageref}
              onChange={(e) => {
                setblobimg({
                  ...blobimg,
                  image: URL.createObjectURL(e.target.files[0]),
                });
                setuploadimage(e.target.files[0]);
              }}
              className="hidden px-4 py-2 outline-none"
              type="file"
            />
          </div> */}
          <div className="flex flex-col justify-center gap-3 my-6">
            <label className="font-semibold">Name*</label>
            <input
              value={user.Name}
              onChange={(e) => {
                setUser({ ...user, Name: e.target.value });
              }}
              className="px-4 py-2  rounded-xl  outline-none bg-[#383838]"
              type="text"
            />
          </div>
          <div className="flex flex-col justify-center gap-3 my-6">
            <label className="font-semibold">Bio*</label>
            <textarea
              value={user.Bio}
              onChange={(e) => {
                setUser({ ...user, Bio: e.target.value });
              }}
              className="px-4 py-2 outline-none  rounded-xl bg-[#383838]"
              id=""
              cols="30"
              rows="5"
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="w-[80vw] py-2 bg-[#1d9bf0]  text-white rounded-xl"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
      {isloading ? <Loader /> : null}
    </>
  );
}

EditProfile.propTypes = {
  setisedit: PropTypes.bool.isRequired,
};
