import React, {useState} from "react";
import "../style.css";
import RegisterForm from "./RegisterForm.jsx";
import {doneIcon} from "../constants/index.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
const RegisterBox = ({option,SetOption}) => {
    const handleClick = () => {
        SetOption(1);
    }

    return(
        <div>
            {
                option === 0 &&
                <div className="log-container bg-white-transparent rounded-3xl p-5">
                    <p style={{marginBottom: '15px'}} className="info">New to <span
                        style={{color: 'peru'}}>EventWave</span>?</p>
                    <button className="switch-button p-3 rounded-3xl md:w-7/12 w-3/4"
                              onClick={handleClick}>Register</button>
                </div>
            }
            {
                option === 1 &&
                <div className="log-container bg-white-transparent rounded-3xl p-5">
                    <p style={{marginBottom: '15px'}} className="info">New to <span
                        style={{color: 'peru'}}>EventWave</span>?</p>
                    <RegisterForm SetSuccess={SetOption}/>
                </div>
            }
            {
                option === 2 &&
                    <div className="log-container bg-white-transparent rounded-3xl p-5 text-white">
                        <FontAwesomeIcon icon={doneIcon} className="text-green-800" fade></FontAwesomeIcon>
                        <p> You've been successfully registered! Try sign in!
                        </p>
                    </div>
            }
        </div>
    )
}
export default RegisterBox;