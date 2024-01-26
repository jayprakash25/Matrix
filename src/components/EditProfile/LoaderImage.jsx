export default function LoaderImage({ progress }) {
  return (
    <div>
      <div className="mx-8 rounded  bg-gray-200">
        <div className={`bg-[#1d9bf0] h-2 w-[${progress}%]  `}></div>
      </div>
    </div>
  );
}
