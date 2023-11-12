import React, { useState } from "react";
import {
  AllEvents,
  FilterEvents,
  Navbar,
} from "../Components/eventspage/index";
export default function Events() {

  const [filterevent,setfilterevent] = useState()


  return (
    <main>
      <Navbar />
      <FilterEvents setfilterevent={setfilterevent}/>
      <AllEvents filterevent={filterevent}/>
    </main>
  );
}
