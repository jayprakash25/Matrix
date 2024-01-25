import UserProfile from "./UserProfile";

export default function UserProfiles({ userProfiles, search }) {
  return (
    <div className=" my-7">
      <UserProfile userProfiles={userProfiles} search={search} />
    </div>
  );
}

