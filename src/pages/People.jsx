import { useCallback, useEffect, useState } from "react";
import { BottomBar } from "../components";
import SearchBar from "../components/People/SearchBar";
import UserProfiles from "../components/People/UserProfiles";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import { useAuth } from "../ContextProvider/AuthContext";
import Loader from "../components/People/Loader";

export default function People() {
  const { currentUser } = useAuth();
  const [isloading, setisloading] = useState(false);
  const jwt = currentUser.uid;
  const [searchQuery, setSearchQuery] = useState("");
  const [allUserProfiles, setAllUserProfiles] = useState([]);
  const [filteredUserProfiles, setFilteredUserProfiles] = useState([]);
  const load = [1, 2, 3, 4, 5, 6, 7, 8, 10];

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredProfiles = allUserProfiles.filter((profile) =>
      profile.Name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUserProfiles(filteredProfiles);
  };

  const fetchData = useCallback(async () => {
    setisloading(true);
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
    setisloading(false);
  }, [jwt]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="mb-24">
        <SearchBar onSearch={handleSearch} />
      </div>
      {isloading ? (
        <div className="flex flex-col gap-4 ">
          {Array.from(load, (index) => (
            <Loader key={index} />
          ))}
        </div>
      ) : (
        <UserProfiles
          userProfiles={filteredUserProfiles}
          search={searchQuery}
        />
      )}
      <BottomBar />
    </>
  );
}
