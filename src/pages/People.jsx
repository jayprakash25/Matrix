import { useState } from "react";
import { BottomBar } from "../components";
import SearchBar from "../components/People/SearchBar";
import UserProfiles from "../components/People/UserProfiles";

export default function People() {
  const [searchpeople, setsearchpeople] = useState();

  return (
    <>
      {/* <Navbar /> */}
      <SearchBar
        searchpeople={searchpeople}
        setsearchpeople={setsearchpeople}
      />
      <UserProfiles
        searchpeople={searchpeople}
        setsearchpeople={setsearchpeople}
      />
      <BottomBar />
    </>
  );
}
