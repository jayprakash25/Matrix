import { useRef, useState } from "react";
import { db, storage } from "../../Firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { RxCross2 } from "react-icons/rx";
import LoaderImage from "./LoaderImage";

function ProfileImage({ setEditImage }) {
  const userPic = window.localStorage.getItem("UserPic");
  const jwt = window.localStorage.getItem("jwt");
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);
  const handleEditImage = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Upload the file to Firebase Storage
      // const uploadTask = storage.ref(`images/${file.name}`).put(file);
      const imageRef = ref(storage, `profileimage/${file.name}`);
      const uploadTask = uploadBytesResumable(imageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Optional: Handle progress
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error("Upload failed:", error);
        },
        async () => {
          // Handle successful uploads
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log(downloadURL);
          const docRef = doc(db, "USERS", jwt);
          await updateDoc(docRef, { Pic: downloadURL });
          window.localStorage.setItem("UserPic", downloadURL);
        }
      );
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
                  // setisedit(false);
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
            <div className="p-4 md:p-5 text-center">
              {/* <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"></h3> */}
              <button
                onClick={handleEditImage}
                className="text-white  focus:ring-4 bg-[#1d9bf0] focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
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
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
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
