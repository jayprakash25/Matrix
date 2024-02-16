function UserProfileLoader() {
  return (
    <div >
      <div className="max-w-md px-4 py-3 rounded-lg shadow-sm lg border-[0.1px]  border-zinc-800">
        <div className="border-[0.1px] border-[rgb(33,32,32)] shadow rounded-md p-4  w-full mx-auto">
          <div className="flex flex-col animate-pulse">
            <div className="mx-auto rounded-xl w-[70vw] h-[30vh] object-cover border-[1px] border-[#282828] "></div>
            <div className="flex-1 py-1 space-y-6">
              <div className="py-4 space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-[#282828] rounded col-span-1"></div>
                  <div className="h-2 bg-[#282828] rounded col-span-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileLoader;
