import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHourglassEnd, faHourglassStart, faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import {cancelledIcon, doneIcon, inFutureIcon, pendingIcon} from "../constants/index.js";
import { useLocation } from "react-router-dom";
import Select from "./Select.jsx";

const EditForm = () => {
    const location = useLocation();
    const event = location.state;
    return (
        <div>
        <div className="float-left bg-gradient-to-r from-indigo-500 p-2 w-full h-full rounded-3xl text-white ">
            <form>
                <div className=" md:text-sm text-xs items-stretch">
                    <div className="px-5 font-semibold"> Start: </div>
                    <div className="px-5">{event.startTime}</div>
                    <div className="px-5 font-semibold"> End: </div>
                    <div className="px-5"> {event.endTime}</div>
                </div>

                <div className=" md:text-sm text-xs md:space-x-10">
                    <div className="px-5 font-semibold">
                        Status:
                        <div className="flex w-max gap-4">
                            <Select color="red" text="Cancelled" checked={event.status=="cancelled"}/>
                            <Select color="pink" text="Pending" checked={event.status=="pending"}/>
                            <Select color="teal" text="In future" checked={event.status=="inFuture"}/>
                            <Select color="green" text="Done" checked={event.status=="done"}/>
                        </div>
                    </div>
                </div>

                <div className="md:text-sm text-xs md:space-x-10">
                    <div className="px-5 font-semibold">Description: </div>
                    <div className="p-5">{event.name} </div>
                </div>

                <div className="md:text-sm text-xs md:space-x-10 space-y-2">
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
        <div className="float-right mt-10 text-white md:text-3xl hover:bg-indigo-400
                                font-semibold cursor-pointer border-2 border-solid p-3 rounded-lg">
            <button onClick={()=>{}}>
                Save
            </button>
        </div>
        </div>
    )
}
export default EditForm;