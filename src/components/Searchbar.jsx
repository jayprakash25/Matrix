import SearchIcon from "@mui/icons-material/Search";

export default function Searchbar() {
  return (
    <div className="flex items-center justify-center my-5">
      <div className="relative flex items-center">
       
        <input
          type="text"
          className="w-96 py-1.5 px-2 pl-8 border bg- rounded-xl focus:outline-none"
          placeholder="Search..."
        />
      </div>
    </div>
  );
}
