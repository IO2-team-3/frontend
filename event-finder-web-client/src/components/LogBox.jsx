import React, {useState} from "react";
import "../style.css";
import LogForm from "./LogForm.jsx";

const LogBox = (props) => {
    const handleClick = () => {
        props.switch(false)
    }

    return(
        <div>
        {
            props.isNR ?
                <div className="log-container bg-white-transparent rounded-3xl p-5">
                    <p style={{marginBottom:'15px'}} className="info">Already have an account?</p>
                        <button className="switch-button p-3 rounded-3xl md:w-7/12 w-3/4"
                            onClick={handleClick}>Sign in</button>
                </div>
                :<LogForm/>
        }
        </div>
    )
}
export default LogBox;