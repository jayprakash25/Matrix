import UserProfile from "./UserProfile";

export default function UserProfiles({ searchpeople, setsearchpeople }) {
  return (
    <div className="px-3.5 my-7">
      <UserProfile
        searchpeople={searchpeople}
        setsearchpeople={setsearchpeople}
      />
    </div>
  );
}
