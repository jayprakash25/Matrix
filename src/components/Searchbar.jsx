import SearchIcon from "@mui/icons-material/Search";

export default function Searchbar() {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="relative flex items-center">
        <div className="absolute flex pl-1">
          <SearchIcon color="" />
        </div>
        <input
          type="text"
          className="w-64 py-1.5 px-2 pl-8 border bg-[#ECF2FF] rounded-xl focus:outline-none"
          placeholder="Search..."
        />
      </div>
    </div>
  );
}
