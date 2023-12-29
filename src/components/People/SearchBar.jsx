import { search } from "../../assets/people";

export default function SearchBar() {
  return (
    <div className="mt-3">
      <div className="relative flex items-center justify-center w-[88vw] mx-auto">
        <input
          className="w-[100vw] focus:outline-none text-[#bebebe] text-sm py-4 px-6 rounded-3xl bg-[#383838] "
          type="text"
          placeholder="Search for People..."
        />
        <img className="absolute right-4" src={search} alt="" />
      </div>
    </div>
  );
}
