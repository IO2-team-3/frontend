import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";

const Stepper = ({step}) => {
    return (
        <div className="w-full m-auto">
            <ol className="grid grid-flow-col justify-stretch items-center w-full mb-4 p-2">
                <li className="flex items-center w-full after:content-[''] after:w-full after:h-1 after:border-b after:border-cyan-200 after:border-4 after:inline-block">
                    <div
                        className={`flex justify-center items-center ${step === 1 ? " w-12 h-12 " : " w-10 h-10 "} bg-cyan-100 rounded-full shrink-0`}>
                        <svg aria-hidden="true" className="w-6 h-6 text-cyan-600"  fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                  d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                                  clip-rule="evenodd"></path>
                        </svg>
                    </div>
                </li>
                <li className={`flex w-full items-center  before:content-[''] before:w-full before:h-1 before:border-b before:border-teal-200 before:border-4 before:inline-block
                                after:content-[''] after:w-full after:h-1 after:border-b ${step !== 1 ? "after:border-teal-200" : "after:border-gray-100"} after:border-4 after:inline-block`}>
                    <div
                        className={`flex justify-center items-center w-10 h-10 rounded-full shrink-0 
                        ${step !== 1 ? "bg-teal-100" : "bg-gray-100"}
                        ${step === 2 ? " w-12 h-12 " : " w-10 h-10 "}`}>
                        <div className={`w-6 h-6 ${step !== 1 ? "text-teal-500" : "text-gray-500"}`}>
                            <FontAwesomeIcon icon={faEnvelope} className="ml-1"/>
                        </div>
                    </div>
                </li>
                <li className={`flex items-center w-full before:content-[''] before:w-full before:h-1 before:border-b ${step !== 1 ? "before:border-green-200" : "before:border-gray-100"} before:border-4 before:inline-block`}>
                    <div
                        className={`flex justify-center items-center w-10 h-10 rounded-full shrink-0 
                        ${step === 3 ? "bg-green-100 w-12 h-12" : "bg-gray-100 w-10 h-10"}`}>
                        <svg aria-hidden="true" className={`w-6 h-6 ${step === 3 ? "text-green-600" : "text-gray-500"}`}
                             fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                            <path fill-rule="evenodd"
                                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clip-rule="evenodd"></path>
                        </svg>
                    </div>
                </li>
            </ol>
        </div>
    )
}
export default Stepper;