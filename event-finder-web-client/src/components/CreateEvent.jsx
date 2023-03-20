import React from "react";
import styles from "../style";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons'

const CreateEvent = () => {

    const [toggle, setToggle] = useState(false);

    return (
        <section className={`${styles.flexCenter} flex-row flex-wrap space-x-20 my-15`}>
            <div className={`bg-black-gradient p-8 w-9/12 rounded-3xl font-poppins ${!toggle ? "hover-effect cursor-pointer" : ""}`} 
                onClick={() => {if(!toggle) setToggle(!toggle)}}>

                <div className={`${toggle ? "none" : "hidden"}`}>
                    <div onClick={() => setToggle(!toggle)}>
                        <FontAwesomeIcon icon={faArrowRotateLeft} className="md:text-5xl text-3xl text-white cursor-pointer"></FontAwesomeIcon>
                    </div>
                </div>

                <div className={`${!toggle ? "none" : "text-center py-10"} md:text-5xl text-2xl title-shadow font-bold text-white `} 
                    onClick={() => setToggle(!toggle)}>
                    New event
                    <span className={`${!toggle ? "none" : "hidden"} md:text-6xl text-3xl float-right cursor-pointer mr-10`}>
                        <FontAwesomeIcon icon={faCirclePlus}></FontAwesomeIcon>
                    </span>
                </div>

                <div className={`${toggle ? "none" : "hidden"} text-center my-10`}>
                    <input type="text"
                        placeholder="Event title"
                        className="text-black p-3 rounded-3xl md:w-7/12 w-3/4 input-text-effect">
                    </input>
                </div>

                <div className={`${toggle ? "none" : "hidden"} text-center my-10`}>
                    <input type="number"
                        placeholder="Number of free places"
                        className="text-black p-3 rounded-3xl md:w-7/12 w-3/4 input-text-effect"
                        min="0">
                    </input>
                </div>

                <div className={`${toggle ? "none" : "hidden"} text-center my-10`}>
                    <input type="datetime-local"
                        placeholder="End time"
                        className="text-black p-3 rounded-3xl md:w-7/12 w-3/4 input-text-effect">
                    </input>
                </div>

                <div className={`${toggle ? "none" : "hidden"} text-center my-10`}>
                    <input type="datetime-local"
                        placeholder="End time"
                        className="text-black p-3 rounded-3xl md:w-7/12 w-3/4 input-text-effect">
                    </input>
                </div>

                <div className={`${toggle ? "none" : "hidden"} text-center my-10`}>
                    <input type="text"
                        placeholder="Categories"
                        className="text-black p-3 rounded-3xl md:w-7/12 w-3/4 h-full input-text-effect">
                    </input>
                </div>

                <div className={`${toggle ? "none" : "hidden"} text-center my-10`}>
                    <textarea type="text"
                        placeholder="Description"
                        className="text-black p-3 rounded-3xl md:w-7/12 w-3/4 input-text-effect h-40 text-start">
                    </textarea>
                </div>

                <div className={`${toggle ? "none" : "hidden"} text-center my-10`}>
                    <textarea type="text"
                        placeholder="Place schema"
                        className="text-black bg-white items-center p-3 rounded-3xl md:w-7/12 w-3/4 h-20 input-text-effect">
                    </textarea>
                </div>

                <div className={`${toggle ? " " : "hidden"} text-center my-10 float-right`}>
                    <div className="link-effect text-lg md:text-3xl font-semibold cursor-pointer border-2 border-solid p-3 rounded-lg">
                        Create
                    </div>
                </div>

            </div>
        </section>
    );
};

export default CreateEvent;