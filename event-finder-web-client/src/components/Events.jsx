import React from "react";
import styles from "../style";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { api, displayStatuses } from "../constants";
import EventComponent from "./EventComponent.jsx";


const Events = () => {
  const [toggle, setToggle] = useState(false);
  const [eventToggle, setEventToggle] = useState(null);
  const [events, setEvents] = useState([])
  const [visibleEvents, setVisibleEvents] = useState([])
  const [refresh, setRefresh] = useState([])
  const [loading, setLoading] = useState(false)
  const { user,logout } = useAuth();
  const [status, setStatus] = useState("all")

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
          setVisibleEvents(responseJson);
          setStatus('all');
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

  const handleStatusChange = (e) => {
    const { name, checked } = e.target;
    if(checked){
      setStatus(name)
      const vevents = []
      for(var i = 0; i < events.length; ++i){
        if(events[i].status === name || name === 'all') vevents.push(events[i])
      }
      setVisibleEvents(vevents)
    }
  };

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
          My events
          <span className={`${!toggle ? "none" : "hidden"} md:text-6xl text-3xl float-right mr-10`}>
            <FontAwesomeIcon icon={faList}></FontAwesomeIcon>
          </span>
        </div>

        <div className={`${!toggle ? "hidden" : ""} space-y-10 md:p-8 p-1 items-center`}>
          <div className="mx-auto items-center">
            {displayStatuses.map((s) =>
              <span key={s.id} className="p-5 inline-block">
                <span className="text-white p-1 sm:p-3 md:text-base sm:text-sm text-xs">{s.name}</span>
                <input name={s.id} type="radio" checked={s.id === status} onChange={handleStatusChange} 
                  className="md:w-4 md:h-4 w-2 h-2 my-5 cursor-pointer"></input>
              </span>
            )}
          </div>
          {
            loading
              ?
              <div className="mx-auto w-16 h-16 border-l-4 border-b-4 border-white-900 rounded-full animate-spin" />
              :
              visibleEvents.length > 0 ?
                visibleEvents.map((event) => <EventComponent key={event.id} event={event} eventToggle={eventToggle}
                  setEventToggle={setEventToggle} token={token}
                  refresh={refresh} setRefresh={setRefresh} />)
                :
                <div className="text-center py-10 md:text-xl text-lg text-white">There is no events.</div>
          }
        </div>

      </div>
    </section>
  );
}

export default Events;