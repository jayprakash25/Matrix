export default function NotifyLoader({ collabs }) {
  return (
    <div className="py-5 space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse flex items-center justify-around gap-10  rounded-lg border-[1px] mx-4 p-3 border-zinc-800 shadow-lg shadow-zinc-900"
        >
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-[#282828] rounded-full"></div>
            <div className="space-y-1">
              {collabs ? (
                <>
                  <div className="w-20 h-3 bg-[#282828]"></div>
                  <div className="w-48 h-4 bg-[#282828]"></div>
                </>
              ) : (
                <>
                  <div className="w-48 h-4 bg-[#282828]"></div>
                  <div className="w-20 h-3 bg-[#282828]"></div>
                </>
              )}
            </div>
          </div>
          {collabs ? null : (
            <div className="w-8 h-8 bg-[#282828] rounded-full"></div>
          )}
        </div>
      ))}
    </div>
  );
}
