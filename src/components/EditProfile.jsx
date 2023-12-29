import { RxCross2 } from "react-icons/rx";
import { IoCloudUploadOutline } from "react-icons/io5";
import PropTypes from "prop-types";

export default function EditProfile({ setisedit }) {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // const docRef = doc(db, "WHATWEDO", category);
  //       const docRef = doc(db, "WHY-US", form.Category);

  //       const docSnap = await getDoc(docRef);

  //       if (docSnap.exists()) {
  //         const data = docSnap.data();
  //         setForm(data);
  //       } else {
  //         console.log("Document does not exist");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [form.Category]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     setIsSubmitting(true);

  //     // Upload the image to Firebase Storage
  //     const imageRef = ref(
  //       storage,
  //       `images/${form.Category}/${form.Image.name}`
  //     );
  //     await uploadBytesResumable(imageRef, form.Image);
  //     const url = await getDownloadURL(imageRef);
  //     const formData = {
  //       ...form,
  //       Image: url,
  //     };
  //     const docRef = doc(db, "WHY-US", form.Category);
  //     await updateDoc(docRef, formData);
  //     setIsSubmitting(false);
  //     navigate(`/why-us`);
  //   } catch (error) {
  //     console.error("Error submitting data: ", error);
  //     setIsSubmitting(false);
  //   }
  // };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center h-full bg-black bg-opacity-75 backdrop-blur-md">
      <div className="p-6 rounded-lg bg-[#161616] w-[90vw]">
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
        <div className="flex flex-col items-center justify-center gap-3">
          <IoCloudUploadOutline size={70} className="mx-auto" color="white" />
          <label className="font-semibold">ProfilePic*</label>
          <input className="hidden px-4 py-2 outline-none" type="text" />
        </div>
        <div className="flex flex-col justify-center gap-3 my-6">
          <label className="font-semibold">Name*</label>
          <input className="px-4 py-2  outline-none bg-[#383838]" type="text" />
        </div>
        <div className="flex flex-col justify-center gap-3 my-6">
          <label className="font-semibold">Bio*</label>
          <textarea
            className="px-4 py-2 outline-none bg-[#383838]"
            id=""
            cols="30"
            rows="5"
          ></textarea>
        </div>
        <div className="flex justify-center">
          <button className="w-[80vw] py-2  bg-gradient-to-r from-yellow-500 via-amber-600 to-amber-700   text-white rounded-lg  ">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

EditProfile.propTypes = {
  setisedit: PropTypes.bool.isRequired,
};
