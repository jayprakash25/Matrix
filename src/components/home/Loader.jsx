import PostLoader from "./PostLoader";
import CatLoader from "./CatLoader";

export default function Loader() {
  return (
    <div>
      <PostLoader />
      <PostLoader />
      <CatLoader />
    </div>
  );
}
