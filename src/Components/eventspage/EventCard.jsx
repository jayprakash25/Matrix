import React, { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { AiFillHeart } from "react-icons/ai";
import { PiShareFatFill } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";

export default function EventCard({ image, Tittle, date, location, about }) {
  const [islike, setislike] = useState();

  const shareEvent = async () => {
    try {
      if (navigator.share) {
        const currentUrl = window.location.href;
        const url = new URL(currentUrl);
        await navigator.share({
          title: Tittle,
          text: "Check the event",
          url: `http://${url.hostname}/bookevents/${Tittle}`,
        });
      } else {
        console.log("share Api Not available :(");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const likeEvent = () => {
    setislike(!islike);
    // add to user watchlist
  };

  return (
    <div className="flex flex-col gap-5 p-5 cursor-pointer select-none rounded-xl">
      <div className="space-y-2.5">
        <Link
          to={`/bookevents/${Tittle}`}
          state={{
            image: image,
            Tittle: Tittle,
            date: date,
            location: location,
            about: about,
          }}
        >
          <img
            src={image}
            alt={image}
            className="w-[80vw] rounded-lg hover:brightness-75 ease-in-out duration-300"
          />
        </Link>
        <div className="flex items-center justify-between ">
          <h1 className="text-xl font-bold font-xl">{Tittle}</h1>
          <AiFillHeart
            onClick={likeEvent}
            size="22"
            color={islike ? "red" : "gray"}
          />
        </div>
      </div>
      <div className="flex items-start justify-between">
        <div className="flex flex-col space-y-3 ">
          <div className="flex items-center gap-x-3">
            <SlCalender size="18" color="gray" />
            <h1 className="text-xs font-semibold text-slate-700">{date}</h1>
          </div>
          <div className="flex items-center gap-x-3">
            <IoLocationOutline size="18" color="gray" />
            <h1 className="text-xs font-semibold text-slate-700">{location}</h1>
          </div>
        </div>
        <PiShareFatFill onClick={shareEvent} size="18" color="gray" />
      </div>
    </div>
  );
}
