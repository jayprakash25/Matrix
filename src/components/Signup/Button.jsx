export default function Button({ title, logo }) {
  return (
    <>
      <button className="px-8 py-2 outline-1 outline rounded-full w-full font-semibold font-poppins">
        <div className="flex items-center space-x-2 justify-center">
          {logo}
          <p> {title}</p>
        </div>
      </button>
    </>
  );
}
