import React from "react";
import styles from "../style";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faHourglassStart } from "@fortawesome/free-solid-svg-icons";
import { faHourglassEnd } from "@fortawesome/free-solid-svg-icons";
import { cancelledIcon, inFutureIcon, pendingIcon, doneIcon} from "../constants";

// Event class
function Event(id, title, startTime, endTime, name, placeSchema, status, categories){
  this.id = id;
  this.title = title;
  this.startTime = startTime;
  this.endTime = endTime;
  this.name = name;
  this.placeSchema = placeSchema;
  this.status = status;
  this.categories = categories;
}

function EventComponent(event, eventToggle, setEventToggle){

  return (
    <div key={event.id} className="bg-white p-3 w-full rounded-3xl cursor-pointer hover-effect-light text-cyan-400 hover:text-white 
      space-y-6" onClick={() => {
        if(eventToggle === event.id) setEventToggle(null)
        else setEventToggle(event.id)
        }}>

      <span className="md:text-2xl text-xs font-bold">{event.title}</span>
      <span>
        <FontAwesomeIcon icon={faTrash} className="md:text-3xl text-sm float-right md:w-1/12 w-2/12 hover:text-red-600"></FontAwesomeIcon>
      </span>
      <span>
        <FontAwesomeIcon icon={faPenToSquare} className="md:text-3xl text-sm float-right md:w-1/12 w-2/12 hover:text-gray-500"></FontAwesomeIcon>
      </span>
      <div className={`${eventToggle === event.id ? null : "hidden"}`}>

        <div className="text-black md:text-sm text-xs items-stretch">
          <div className="px-5 font-semibold"> <FontAwesomeIcon icon={faHourglassStart} bounce></FontAwesomeIcon> Start: </div>
          <div className="px-5">{event.startTime}</div>
          <div className="px-5 font-semibold"> <FontAwesomeIcon icon={faHourglassEnd} bounce></FontAwesomeIcon> End: </div>
          <div className="px-5"> {event.endTime}</div>
        </div>

        <div className="text-black md:text-sm text-xs md:space-x-10">
          <div className="px-5 font-semibold">
            Status: &nbsp;
            {event.status === "cancelled" ? <FontAwesomeIcon icon={cancelledIcon} className="text-red-800" fade></FontAwesomeIcon> : null}
            {event.status === "pending" ? <FontAwesomeIcon icon={pendingIcon} className="text-green-800" fade></FontAwesomeIcon> : null}
            {event.status === "inFuture" ? <FontAwesomeIcon icon={inFutureIcon} className="text-blue-800" fade></FontAwesomeIcon> : null}
            {event.status === "done" ? <FontAwesomeIcon icon={doneIcon} className="text-green-800" fade></FontAwesomeIcon> : null}
            &nbsp; {event.status}
          </div>
        </div>

        <div className="text-black md:text-sm text-xs md:space-x-10">
          <div className="px-5 font-semibold">Description: </div>
          <div className="p-5">{event.name} </div>
        </div>

        <div className="text-black md:text-sm text-xs md:space-x-10 space-y-2">
          <div className="px-5 font-semibold">Categories: </div>
          <div>
            {event.categories.map((c) => (
              <div key={c.id} className="px-5">
                - {c.category}
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  )
}

const Events = () => {

  //Hardcoded data (to delete)
  const events = [
    new Event("1", "Rock Concert", "19-08-2023 19:00", "20-08-2023 1:00", "Huge rock'n roll concert with a lot of popular musicians and bands", "xxx", "pending", [{id: "1", category: "music"}, {id: "2", category: "concert"}]),
    new Event("2", "Football match", "19-02-2023 21:00", "19-02-2023 23:00", "Tounament final", "xxx", "done", [{id: "1", category: "sport"}, {id: "2", category: "football"}, {id: "3", category: "fans"}]),
    new Event("3", "Hip hop festival", "21-06-2023 15:00", "26-06-2023 5:00", "Modern festival with well-known rapers", "xxx", "done", [{id: "1", category: "music"}, {id: "2", category: "concert"}]),
    new Event("4", "Museum night", "19-05-2023 23:00", "20-05-2023 5:00", "Interesting museum wait for you", "xxx", "inFuture", [{id: "1", category: "knowledge"}, {id: "2", category: "culture"}]),
    new Event("5", "Golf tournament", "14-08-2023 19:00", "25-08-2023 1:00", "The biggest golf tournament. AAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAA AAAAAAAA AAAAAAAAA AAAAAAAAAAAAA AAA AAAAAAAA AAAAAAAAAA AAAAAAAAA AAAAAAAAAAAAAAA", "xxx", "cancelled", [{id: "1", category: "sport"}]),
    new Event("6", "Math lecture", "19-04-2023 12:00", "19-04-2023 14:00", "Integrals and derivatives", "xxx", "pending", [{id: "1", category: "knowledge"}, {id: "2", category: "math"}]),
    new Event("7", "Business Meeting", "12-04-2023 14:00", "12-04-2023 18:00", "Meeting with managers of company XYZ", "xxx", "done", [{id: "1", category: "business"}]),
  ]
  //

  const [toggle, setToggle] = useState(false);
  const [eventToggle, setEventToggle] = useState(null);

  return (
    <section className={`${styles.flexCenter} flex-row flex-wrap space-x-20 my-6`}>
      <div className={`bg-black-gradient p-8 w-9/12 rounded-3xl font-poppins items-center 
        ${!toggle ? "hover-effect cursor-pointer" : ""}`}
        onClick={() => {if(!toggle) setToggle(!toggle)}}>

        <div className={`${toggle ? "none" : "hidden"}`}>
          <div onClick={() => setToggle(!toggle)}>
            <FontAwesomeIcon icon={faArrowRotateLeft} className="md:text-5xl text-3xl text-white cursor-pointer"></FontAwesomeIcon>
          </div>
        </div>

        <div className={`${!toggle ? "none" : "text-center py-10"} md:text-5xl text-2xl title-shadow font-bold text-white`}>
            All events
          <span className={`${!toggle ? "none" : "hidden"} md:text-6xl text-3xl float-right mr-10`}>
            <FontAwesomeIcon icon={faList}></FontAwesomeIcon>
          </span>
        </div>

        <div className={`${!toggle ? "hidden" : ""} space-y-10 p-8 items-center`}>
          {events.map((event) => EventComponent(event, eventToggle, setEventToggle))}
        </div>

      </div>
    </section>
  );
}

export default Events;