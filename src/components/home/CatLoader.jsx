const CatLoader = () => {
  const category = [1, 2, 3, 4, 5];
  return (
    <div className="px-6  space-y-8">
      <div>
        <h1 className="text-lg font-semibold animate-pulse">Categories</h1>
      </div>
      <div className="flex space-x-4 relative overflow-x-auto">
        {category.map((_, index) => {
          return (
            <div
              key={index}
              className="grid  text-[0.75rem] space-y-3 animate-pulse"
            >
              <div className="bg-[#282828] w-16 h-16 rounded-3xl flex items-center justify-center">
                <div className="w-7 h-7 bg-gray-300 rounded-full"></div>
              </div>
              <div className="place-items-center place-content-center grid ">
                <div className="bg-gray-300 h-4 w-16 rounded-full"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CatLoader;
