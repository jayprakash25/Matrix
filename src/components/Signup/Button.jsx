export default function Button({ title, logo, handleSubmit }) {
    return (
      <>
         <div className="px-14 py-3.5 bg-black text-white rounded-full  w-full ">
      <button
        onClick={handleSubmit}
        className="w-full px-8 py-2 font-semibold rounded-full outline-1 outline font-poppins">
        <div className="flex items-center justify-center space-x-2">
          {logo}
          <p> {title}</p>
        </div>
      </button>
      </div>
      </>
    )
}
