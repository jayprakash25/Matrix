import { useRef, useState } from "react";
import { db, storage } from "../../Firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { RxCross2 } from "react-icons/rx";
import LoaderImage from "./LoaderImage";
import { useAuth } from "../../ContextProvider/AuthContext";

function ProfileImage({ setEditImage }) {
  const userPic = window.localStorage.getItem("UserPic");
  const { currentUser } = useAuth();

  const jwt = currentUser.uid;
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);
  const handleEditImage = () => {
    fileInputRef.current.click();
  };

  const docRef = doc(db, "USERS", jwt);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageRef = ref(storage, `profileimage/${file.name}`);
      const uploadTask = uploadBytesResumable(imageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Upload failed:", error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log(downloadURL);
          await updateDoc(docRef, { Pic: downloadURL });
          window.localStorage.setItem("UserPic", downloadURL);
        }
      );
    }
  };

  const deleteImage = async () => {
    try {
      await updateDoc(docRef, { Pic: null });
      window.localStorage.removeItem("UserPic");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <div className="fixed inset-0 z-50 flex items-center justify-center h-full bg-black bg-opacity-75 backdrop-blur-md ">
          <div className="relative bg-[#161616] rounded-lg max-w-md w-full m-4 ">
            <div className="flex justify-end p-4">
              <RxCross2
                cursor={"pointer"}
                onClick={() => {
                  setEditImage(false);
                }}
                size={25}
                color={"white"}
              />
            </div>
            <div
              className={`${
                progress > 0 && progress < 100 ? "hidden" : "block"
              } items-center flex justify-center rounded-full p-4 pt-0 `}
            >
              <img src={userPic} className="w-40 h-40 rounded-full" />
            </div>
            <div
              className={` ${
                progress > 0 && progress < 100 ? "block" : "hidden"
              } py-4`}
            >
              <LoaderImage progress={progress} />
            </div>
            <div className="flex items-center justify-center gap-6 p-4">
              <button
                onClick={handleEditImage}
                className="text-green-500 text-[13.5px]"
              >
                Edit Image
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
                accept="image/*"
              />
              <button
                data-modal-hide="popup-modal"
                type="button"
                onClick={deleteImage}
                className="text-red-500 text-[13.5px]"
              >
                Remove Image
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileImage;
