import PostLoader from "./PostLoader";
import CatLoader from "./CatLoader";

export default function Loader() {
  return (
    <div className="pt-4">
      <PostLoader />
      <PostLoader />
      <CatLoader />
    </div>
  );
}
