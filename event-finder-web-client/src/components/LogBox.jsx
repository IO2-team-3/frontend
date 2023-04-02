import React, {useState} from "react";
import "../style.css";
import LogForm from "./LogForm.jsx";

const LogBox = ({option,SetOption}) => {
    const handleClick = () => {
        SetOption(0)
    }

    return(
        <div>
        {
            (option === 0 || option === 2) &&
            <LogForm/>
        }
        {
            option === 1 &&
            <div className="log-container bg-white-transparent rounded-3xl p-5">
                <p style={{marginBottom:'15px'}} className="info">Already have an account?</p>
                <button className="switch-button p-3 rounded-3xl md:w-7/12 w-3/4"
                        onClick={handleClick}>Sign in</button>
            </div>
        }
        </div>
    )
}
export default LogBox;