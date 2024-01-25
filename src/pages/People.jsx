import { useCallback, useEffect, useState } from "react";
import { BottomBar } from "../components";
import SearchBar from "../components/People/SearchBar";
import UserProfiles from "../components/People/UserProfiles";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";

export default function People() {
  const jwt = window.localStorage.getItem("jwt");
  const [searchQuery, setSearchQuery] = useState("");
  const [allUserProfiles, setAllUserProfiles] = useState([]);
  const [filteredUserProfiles, setFilteredUserProfiles] = useState([]);

  const fetchData = useCallback(async () => {
    const docRef = collection(db, "USERS");
    const snapshot = await getDocs(docRef);
    const userData = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((doc) => {
        if (doc.id === jwt) return false;
        return true;
      });
    setAllUserProfiles(userData);
    setFilteredUserProfiles(userData);
  }, [jwt]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredProfiles = allUserProfiles.filter((profile) =>
      profile.Name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUserProfiles(filteredProfiles);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log(filteredUserProfiles);

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <UserProfiles userProfiles={filteredUserProfiles} search={searchQuery} />
      <BottomBar />
    </>
  );
}
