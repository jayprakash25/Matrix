import { FaRegBell } from "react-icons/fa";

export default function Discover() {
  return (
    <div className="flex items-center justify-between px-5 py-3">
      <div className="">
        <img
          src="https://media.licdn.com/dms/image/D5603AQGV8f-cyNxe9Q/profile-displayphoto-shrink_400_400/0/1690441455336?e=1709164800&v=beta&t=WMob9R51Ey4SPBxJoztE7OzxUFzNeEahIVYQbbthtt4"
          className="object-cover rounded-full h-11 w-11"
          alt=""
        />
      </div>
      <div>
        <div className="w-1.5 h-1.5 translate-x-4 rounded-full bg-amber-500"></div>
        <FaRegBell size={25} color="white" />
      </div>
    </div>
  );
}
{
  /* <h1 className=" font-bold text-[1.75rem]">
        Discover new mates and CONNECT!
      </h1> */
}
