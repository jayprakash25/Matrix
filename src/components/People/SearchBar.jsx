import { search } from "../../assets/people";

export default function SearchBar() {
  return (
    <div className="px-6 flex items-center justify-between py-6">
      <div>
        <h1 className="text-xl font-semibold">Vvibe</h1>
      </div>
      <div className="relative w-[17rem] flex items-center justify-center">
        <input
          className="w-[17rem] focus:outline-none text-[#bebebe] text-sm py-4 px-6 rounded-3xl bg-[#383838] "
          type="text"
          placeholder="Search for students..."
        />
        <img className="absolute right-4" src={search} alt="" />
      </div>
    </div>
  );
}
