import { BottomBar } from "../components";
import SearchBar from "../components/People/SearchBar";
import UserProfiles from "../components/People/UserProfiles";

export default function People() {
  return (
    <>
      {/* <Navbar /> */}
      <SearchBar />
      <UserProfiles />
      <BottomBar />
    </>
  );
}
