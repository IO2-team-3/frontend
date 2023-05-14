import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglassEnd, faHourglassStart, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { api, cancelledIcon, doneIcon, inFutureIcon, pendingIcon } from "../constants/index.js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../style";

const EventComponent = ({ event, eventToggle, setEventToggle, token, refresh, setRefresh }) => {
    const navigate = useNavigate();
    const [deleteToggle, SetDeleteToggle] = useState(false);

    useEffect(() => {
        if (eventToggle === event.id) {
            document.getElementById(`${event.id}`).scrollIntoView()
        }
    }, [])

    const handleTrash = () => {
        fetch(api.base + `/events/${event.id}`, {
            method: 'DELETE',
            headers: {
                'sessionToken': token,
            }
        })
            .then((response) => {
                if (response.ok) {
                    SetDeleteToggle(!deleteToggle);
                    setEventToggle(event.id);
                    setRefresh(!refresh);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div>
            {
                deleteToggle
                    ?
                    <div key={event.id} id={event.id} className="bg-red-500 p-3 w-full rounded-3xl flex flex-wrap content-start">
                        <span className='p-1 grow'>Are you sure you want to delete {event.title}?</span>
                        <div className='flex space-x-5 w-32'>
                            <span className='p-1 bg-white rounded-xl cursor-pointer hover-effect text-center text-black w-full'
                                onClick={() => { SetDeleteToggle(!deleteToggle); setEventToggle(null); }}>No</span>
                            <span className='p-1 bg-white rounded-xl cursor-pointer hover:bg-red-900 text-center text-black w-full'
                                onClick={() => handleTrash()}>Yes</span>
                        </div>
                    </div>
                    :

                    <div key={event.id} id={event.id} className="bg-white p-3 w-full rounded-3xl cursor-pointer hover-effect-light text-cyan-400 hover:text-white
                        space-y-6" onClick={() => {
                            if (eventToggle === event.id) setEventToggle(null)
                            else setEventToggle(event.id)
                        }}>

                        <span className="md:text-2xl text-xs font-bold p-3">{event.title}</span>
                        {event.status === 'cancelled'
                            ?
                            <span>
                                <FontAwesomeIcon icon={faTrash}
                                    className="md:text-3xl text-gray-500 text-sm float-right md:w-1/12 w-2/12"></FontAwesomeIcon>
                            </span>
                            :
                            <span onClick={() => SetDeleteToggle(true)}>
                                <FontAwesomeIcon icon={faTrash}
                                    className="md:text-3xl text-sm float-right md:w-1/12 w-2/12 hover:text-red-600"></FontAwesomeIcon>
                            </span>
                        }
                        {event.status === 'cancelled'
                            ?
                            <span>
                                <FontAwesomeIcon icon={faPenToSquare}
                                    className="md:text-3xl text-sm float-right md:w-1/12 w-2/12 text-gray-500"></FontAwesomeIcon>
                            </span>
                            :
                            <span onClick={() => navigate('/organizer/event_details', { state: event })}>
                                <FontAwesomeIcon icon={faPenToSquare}
                                    className="md:text-3xl text-sm float-right md:w-1/12 w-2/12 hover:text-yellow-500"></FontAwesomeIcon>
                            </span>
                        }

                        <div className={`${eventToggle === event.id ? null : "hidden"}`}>

                            <div className={`${styles.flexCenter} flex-row flex-wrap md:space-x-20 lg:space-x-5 mt-10 m-8 text-black md:text-sm text-xs`}>
                                <div>
                                    <div className="px-5 py-2 font-semibold md:text-lg"><FontAwesomeIcon icon={faHourglassStart}
                                        bounce></FontAwesomeIcon> Start:
                                    </div>
                                    <div className="px-5">
                                        {new Date(event.startTime * 1000).toDateString()}&nbsp;{new Date(event.startTime * 1000).toLocaleTimeString()}
                                    </div>
                                </div>
                                <div>
                                    <div className="px-5 py-2 font-semibold md:text-lg"><FontAwesomeIcon icon={faHourglassEnd}
                                        bounce></FontAwesomeIcon> End:
                                    </div>
                                    <div className="px-5">
                                        {new Date(event.endTime * 1000).toDateString()}&nbsp;{new Date(event.endTime * 1000).toLocaleTimeString()}
                                    </div>
                                </div>
                            </div>

                            <div className={`${styles.flexCenter} flex-row flex-wrap text-black md:text-lg text-xs md:space-x-10 pb-4`}>
                                <div className="px-5">
                                    <span className="font-semibold">Status: &nbsp;</span>
                                    {event.status === "cancelled" ?
                                        <span><FontAwesomeIcon icon={cancelledIcon} className="text-red-800"
                                            fade></FontAwesomeIcon>&nbsp; Cancelled</span> : null}
                                    {event.status === "pending" ?
                                        <span><FontAwesomeIcon icon={pendingIcon} className="text-green-800"
                                            fade></FontAwesomeIcon>&nbsp; Pending</span> : null}
                                    {event.status === "inFuture" ?
                                        <span><FontAwesomeIcon icon={inFutureIcon} className="text-blue-800"
                                            fade></FontAwesomeIcon>&nbsp; In future</span> : null}
                                    {event.status === "done" ?
                                        <span><FontAwesomeIcon icon={doneIcon} className="text-green-800"
                                            fade></FontAwesomeIcon>&nbsp; Done</span> : null}
                                </div>
                            </div>

                            <div className="text-black md:text-sm text-xs md:space-x-10">
                                <div className="px-5 font-semibold md:text-lg">Description:</div>
                                <div className="p-5">{event.name} </div>
                            </div>

                            <div className="text-black md:text-sm text-xs md:space-x-10 space-y-2">
                                <div className="px-5 font-semibold md:text-lg">Categories:</div>
                                <div className={`${styles.flexCenter} flex-row flex-wrap`}>
                                    {event.categories.map((c) => (
                                        <span key={c.id} className="px-5 bg-gray-400 rounded-xl m-3">
                                            {c.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
            }
        </div>
    )
}

export default EventComponent;