import React from "react";
import styles from "../style";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faHourglassStart } from "@fortawesome/free-solid-svg-icons";
import { faHourglassEnd } from "@fortawesome/free-solid-svg-icons";
import { cancelledIcon, inFutureIcon, pendingIcon, doneIcon } from "../constants";

function EventComponent(event, eventToggle, setEventToggle, navigate) {

  return (
    <div key={event.id} className="bg-white p-3 w-full rounded-3xl cursor-pointer hover-effect-light text-cyan-400 hover:text-white 
      space-y-6" onClick={() => {
        if (eventToggle === event.id) setEventToggle(null)
        else setEventToggle(event.id)
      }}>

      <span className="md:text-2xl text-xs font-bold">{event.title}</span>
      <span>
        <FontAwesomeIcon icon={faTrash} className="md:text-3xl text-sm float-right md:w-1/12 w-2/12 hover:text-red-600"></FontAwesomeIcon>
      </span>
      <span onClick={() => { navigate('/organizer/event_details', { state: event }) }}>
        <FontAwesomeIcon icon={faPenToSquare} className="md:text-3xl text-sm float-right md:w-1/12 w-2/12 hover:text-gray-500"></FontAwesomeIcon>
      </span>
      <div className={`${eventToggle === event.id ? null : "hidden"}`}>

        <div className="text-black md:text-sm text-xs items-stretch">
          <div className="px-5 font-semibold"> <FontAwesomeIcon icon={faHourglassStart} bounce></FontAwesomeIcon> Start: </div>
          <div className="px-5">{new Date(event.startTime * 1000).toDateString()}&nbsp;{new Date(event.startTime * 1000).toLocaleTimeString()}</div>
          <div className="px-5 font-semibold"> <FontAwesomeIcon icon={faHourglassEnd} bounce></FontAwesomeIcon> End: </div>
          <div className="px-5"> {new Date(event.endTime * 1000).toDateString()}&nbsp;{new Date(event.endTime * 1000).toLocaleTimeString()}</div>
        </div>

        <div className="text-black md:text-sm text-xs md:space-x-10">
          <div className="px-5">
            <span className="font-semibold">Status: &nbsp;</span>
            {event.status === "cancelled" ?
              <span><FontAwesomeIcon icon={cancelledIcon} className="text-red-800" fade></FontAwesomeIcon>&nbsp; Cancelled</span> : null}
            {event.status === "pending" ?
              <span><FontAwesomeIcon icon={pendingIcon} className="text-green-800" fade></FontAwesomeIcon>&nbsp; Pending</span> : null}
            {event.status === "inFuture" ?
              <span><FontAwesomeIcon icon={inFutureIcon} className="text-blue-800" fade></FontAwesomeIcon>&nbsp; In future</span> : null}
            {event.status === "done" ?
              <span><FontAwesomeIcon icon={doneIcon} className="text-green-800" fade></FontAwesomeIcon>&nbsp; Done</span> : null}
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
              <span key={c.id} className="px-5 bg-gray-400 rounded-xl m-3">
                {c.name}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

const Events = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [eventToggle, setEventToggle] = useState(null);
  const [events, setEvents] = useState([])
  const { user } = useAuth();

  var token = `${user.sessionToken}`
  useEffect(() => {

    const intervalId = setInterval(() => {
      var url = "http://localhost:8080/events/my";
      fetch(url, {
        method: 'GET',
        headers: {
          'sessionToken': token,
        }
      })
        .then((response) => response.json())
        .then((responseJson) => {
          setEvents(responseJson);
        }).catch(error => {
          console.log(error);
          setEvents([]);
        });
    }, 2000)

    return () => clearInterval(intervalId);

  }, [events])

  return (
    <section className={`${styles.flexCenter} flex-row flex-wrap space-x-20 my-6`}>
      <div className={`bg-black-gradient p-8 w-9/12 rounded-3xl font-poppins items-center 
        ${!toggle ? "hover-effect cursor-pointer" : ""}`}
        onClick={() => { if (!toggle) setToggle(!toggle) }}>

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
          {events.map((event) => EventComponent(event, eventToggle, setEventToggle, navigate))}
        </div>

      </div>
    </section>
  );
}

export default Events;