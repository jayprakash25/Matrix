import { useState } from "react";
import PropTypes from "prop-types";
import { search } from "../../assets/people";

export default function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    await onSearch(query);
  };
  return (
    <div className="mt-3 fixed top-0 left-2">
      <div className="relative flex items-center justify-center w-[96vw] mx-auto">
        <input
          className="w-[100vw] focus:outline-none text-[#bebebe] text-sm py-4 px-6 rounded-3xl bg-[#383838] "
          type="text"
          placeholder="Search for People..."
          value={searchQuery}
          onChange={handleChange}
        />
        <img className="absolute right-4" src={search} alt="" />
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
