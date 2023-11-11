import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import { PiShareFatFill } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";

export default function EventCard() {
  return (
    <Link to="/bookevents/Carnival Night Fest" state={{
      image : "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300",
      Tittle : "Carnival Night Fest",
      date : "10 March 2024",
      location:"Kompally Hyderabad",
      about:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Et obcaecati, eligendi dolores aperiam ratione illum repellendus consequatur nisi non quas. necessitatibus incidunt! Odit necessitatibus accusantium quaerat commodi, animi minus praesentium porro quidem vitae eius ratione, enim impedit sit dolore molestiae consequunturnatus? Veritatis rerum commodi vel aut pariatur, animi omnis doloremque sunt ipsum reprehenderit possimus, vero assumenda expedita, dicta necessitatibus sit officiis? Fugiat, quis ipsam, tempora quos quasi mollitia ex quidem expedita illum facere non aspernatur sapiente fugit recusandae similique delectus. Quas incidunt ducimus deleniti eius expedita sunt quis non laboriosam saepe, suscipit illum aspernatur totam quam eveniet natus iure fuga. Assumenda dolor ipsa corporis asperiores. neque, harum quo enim error itaque molestiae consectetur ullam sint repellat quod quia, et eligendi voluptas quas quo blanditiis officiis totam nemo!"
    }}>
      <div className="flex flex-col gap-5 p-5 cursor-pointer rounded-xl">
        <div className="space-y-2.5">
          <img
            src="https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300"
            alt=""
            className="w-[80vw] rounded-lg"
          />
          <div className="flex items-center justify-between ">
            <h1 className="text-xl font-bold font-xl">Carnival Night Fest.</h1>
            <AiOutlineHeart size="22" color="gray" />
          </div>
        </div>
        <div className="flex items-start justify-between">
          <div className="flex flex-col space-y-3 ">
            <div className="flex items-center gap-x-3">
              <SlCalender size="18" color="gray" />
              <h1 className="text-xs text-slate-500">10 March 2024</h1>
            </div>
            <div className="flex items-center gap-x-3">
              <IoLocationOutline size="18" color="gray" />
              <h1 className="text-xs text-slate-500">Kompally Hyderabad</h1>
            </div>
          </div>
          <PiShareFatFill size="18" color="gray" />
        </div>
      </div>
    </Link>
  );
}
