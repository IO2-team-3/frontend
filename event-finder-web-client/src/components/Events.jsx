import React from "react";
import styles from "../style";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'
import {api} from "../constants";
import EventComponent from "./EventComponent.jsx";


const Events = () => {
  const [toggle, setToggle] = useState(false);
  const [eventToggle, setEventToggle] = useState(null);
  const [events, setEvents] = useState([])
  const [refresh, setRefresh] = useState([])
  const [loading, setLoading] = useState(false)
  const { user,logout } = useAuth();

  var token = `${user.sessionToken}`

  const fetchEvents = () => {
    setLoading(true);
    var url = api.base +  "/events/my";
    fetch(url, {
      method: 'GET',
      headers: {
        'sessionToken': token,
      }
    })
        .then((response) =>
        {
          if(response.status===403) logout();
          return response.json()
        })
        .then((responseJson) => {
          setEvents(responseJson);
        })
        .finally(() => setLoading(false))
        .catch(error => {
      console.log(error);
      setEvents([]);
    });
  }

  useEffect(() => {
    fetchEvents();
  }, [refresh])


  return (
    <section className={`${styles.flexCenter} flex-row flex-wrap space-x-20 my-6`}>
      <div className={`bg-black-gradient p-8 md:w-8/12 w-11/12 rounded-3xl font-poppins items-center 
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

        <div className={`${!toggle ? "hidden" : ""} space-y-10 md:p-8 p-1 items-center`}>
          {
            loading
                ?
                <div className="mx-auto w-16 h-16 border-l-4 border-b-4 border-white-900 rounded-full animate-spin" />
                :
                events.map((event) => <EventComponent key={event.id} event = {event} eventToggle={eventToggle}
                                                     setEventToggle={setEventToggle} token={token}
                                                     refresh={refresh} setRefresh={setRefresh}/>)}
        </div>

      </div>
    </section>
  );
}

export default Events;