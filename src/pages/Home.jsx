import Navbar from "../components/Navbar";
import ProfileCards from "../components/ProfileCards";
import Searchbar from "../components/Searchbar";

export default function Home() {
  return (
    <div>
      <Searchbar />
      <ProfileCards />
      <Navbar />
    </div>
  );
}
