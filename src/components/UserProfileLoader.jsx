function UserProfileLoader() {
  return (
    <div>
      <div className="max-w-md px-4 py-3 rounded-lg shadow-sm lg border-[1px]  border-zinc-800">
        <div className="border border-[rgb(40,40,40)] shadow rounded-md p-4  w-full mx-auto">
          <div className="flex flex-col  animate-pulse">
            <div className="mx-auto rounded-xl w-[85vw] h-[30vh] object-cover border border-[#282828] "></div>
            <div className="flex-1 py-1 space-y-6">
              {/* <div className="h-2 bg-[#282828] rounded"></div>{" "} */}
              <div className="space-y-3 py-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-[#282828] rounded col-span-1"></div>
                  <div className="h-2 bg-[#282828] rounded col-span-2"></div>
                </div>
                <div className="h-2 bg-[#282828] rounded"></div>
                <div className="h-2 bg-[#282828] rounded"></div>
                <div className="h-2 bg-[#282828] rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileLoader;
