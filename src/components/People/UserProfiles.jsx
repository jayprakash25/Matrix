import UserProfile from "./UserProfile";

export default function UserProfiles({ userProfiles, search }) {
  return (
    <div className="px-2 my-7">
      <UserProfile userProfiles={userProfiles} search={search} />
    </div>
  );
}

