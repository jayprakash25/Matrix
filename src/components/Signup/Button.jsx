export default function Button({ title, logo }) {
  return (
    <div className="">
      <button className="px-14 py-3.5 bg-black text-white rounded-full  w-full ">
        <div className="flex items-center space-x-2 justify-center">
          {logo}
          <p> {title}</p>
        </div>
      </button>
    </div>
  );
}
