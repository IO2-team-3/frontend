import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHourglassEnd, faHourglassStart, faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import {cancelledIcon, doneIcon, inFutureIcon, pendingIcon} from "../constants/index.js";
import { useLocation } from "react-router-dom";

const EditForm = () => {
    const location = useLocation();
    const event = location.state;
    return (
        <div>
        <div className="float-left bg-cyan-400 p-2 w-full h-full rounded-3xl text-cyan-400 hover:text-white
      space-y-6">
            <form>
                <div className="text-black md:text-sm text-xs items-stretch">
                    <div className="px-5 font-semibold"> Start: </div>
                    <div className="px-5">{event.startTime}</div>
                    <div className="px-5 font-semibold"> End: </div>
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
            </form>
        </div>
        <div className="float-right mt-10 text-white md:text-3xl hover:bg-cyan-400
                                font-semibold cursor-pointer border-2 border-solid p-3 rounded-lg">
            <button onClick={()=>{}}>
                Save
            </button>
        </div>
        </div>
    )
}
export default EditForm;