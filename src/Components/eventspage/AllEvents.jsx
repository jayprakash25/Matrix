import React from "react";
import { EventCard } from "./index";
export default function Events() {
  const eventdata = [
    {
      image:
        "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=600",
      Tittle: "Musical Nights",
      category: "Music",
      date: "10 March 2024",
      location: "Kompally Hyderabad",
      about:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et obcaecati, eligendi dolores aperiam ratione illum repellendus consequatur nisi non quas. necessitatibus incidunt! Odit necessitatibus accusantium quaerat commodi, animi minus praesentium porro quidem vitae eius ratione, enim impedit sit dolore molestiae consequunturnatus? Veritatis rerum commodi vel aut pariatur, animi omnisaperiam ratione illum repellendus consequatur nisi non quas. necessitatibus incidunt! Odit necessitatibus accusantium quaerat commodi, animi minus praesentium porro quidem vitae eius ratione, enim impedit sit dolore molestiae consequunturnatus? Veritatis rerum commodi vel aut pariatur, animi omnis aperiam ratione illum repellendus consequatur nisi non quas.",
    },
    {
      image:
        "https://images.pexels.com/photos/2952834/pexels-photo-2952834.jpeg?auto=compress&cs=tinysrgb&w=600",
      Tittle: "Music",
      category: "Music",
      date: "10 March 2024",
      location: "Kompally Hyderabad",
      about:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et obcaecati, eligendi dolores aperiam ratione illum repellendus consequatur nisi non quas. necessitatibus incidunt! Odit necessitatibus accusantium quaerat commodi, animi minus praesentium porro quidem vitae eius ratione, enim impedit sit dolore molestiae consequunturnatus? Veritatis rerum commodi vel aut pariatur, animi omnisaperiam ratione illum repellendus consequatur nisi non quas. necessitatibus incidunt! Odit necessitatibus accusantium quaerat commodi, animi minus praesentium porro quidem vitae eius ratione, enim impedit sit dolore molestiae consequunturnatus? Veritatis rerum commodi vel aut pariatur, animi omnis aperiam ratione illum repellendus consequatur nisi non quas.",
    },
    {
      image:
        "https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=600",
      Tittle: "Music",
      category: "Music",
      date: "10 March 2024",
      location: "Kompally Hyderabad",
      about:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et obcaecati, eligendi dolores aperiam ratione illum repellendus consequatur nisi non quas. necessitatibus incidunt! Odit necessitatibus accusantium quaerat commodi, animi minus praesentium porro quidem vitae eius ratione, enim impedit sit dolore molestiae consequunturnatus? Veritatis rerum commodi vel aut pariatur, animi omnisaperiam ratione illum repellendus consequatur nisi non quas. necessitatibus incidunt! Odit necessitatibus accusantium quaerat commodi, animi minus praesentium porro quidem vitae eius ratione, enim impedit sit dolore molestiae consequunturnatus? Veritatis rerum commodi vel aut pariatur, animi omnis aperiam ratione illum repellendus consequatur nisi non quas.",
    },
  ];

  return (
    <main className="flex flex-col items-center justify-center gap-5 mx-auto my-8">
      {eventdata.map((_, i) => {
        return (
          <>
            <EventCard
              key={i}
              image={_.image}
              Tittle={_.Tittle}
              date={_.date}
              location={_.location}
              about={_.about}
            />
          </>
        );
      })}
    </main>
  );
}
