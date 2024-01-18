import UserProfile from "./UserProfile";
import PropTypes from "prop-types";

export default function UserProfiles({ userProfiles, search }) {
  return (
    <div className="px-2 my-7">
      <UserProfile userProfiles={userProfiles} search={search} />
    </div>
  );
}

UserProfiles.propTypes = {
  userProfiles: PropTypes.array.isRequired,
  search: PropTypes.string.isRequired,
};
