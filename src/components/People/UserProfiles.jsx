import UserProfile from "./UserProfile";

export default function UserProfiles({searchpeople,setsearchpeople}) {
  return (
    <div className="flex flex-col items-center justify-center px-4 my-10 gap-7">
      <UserProfile searchpeople={searchpeople} setsearchpeople={setsearchpeople}/>
    </div>
  );
}
