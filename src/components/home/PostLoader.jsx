export default function PostLoader() {
  return (
    <div className="w-full px-4 py-4">
      <div className="border border-[#282828] shadow rounded-md p-4 w-full mx-auto">
        <div className="duration-300 ease-in-out animate-pulse">
          <div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="h-4  bg-[#282828] rounded-full "></div>
                <div className="h-2 bg-[#282828] rounded "></div>
                <div className="h-52 bg-[#282828] rounded col-span-5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
