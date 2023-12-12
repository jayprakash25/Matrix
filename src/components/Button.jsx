export default function Button({ title, logo, handleSubmit }) {
  return (
    <>
      <div className=" flex justify-center">
        <button
          onClick={handleSubmit}
          className="  font-semibold  bg-black text-white rounded-full px-20 py-3.5"
        >
          <div className="flex items-center justify-center space-x-2">
            {logo}
            <p> {title}</p>
          </div>
        </button>
      </div>
    </>
  );
}
