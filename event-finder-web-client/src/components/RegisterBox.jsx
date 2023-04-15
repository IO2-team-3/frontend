import React, {useState} from "react";
import "../style.css";
import RegisterForm from "./RegisterForm.jsx";
import {doneIcon} from "../constants/index.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Stepper from "./Stepper.jsx";
import VerificationForm from "./VerificationForm.jsx";
const RegisterBox = ({option,SetOption}) => {
    const [organizerId,SetId] = useState('')
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
                    <Stepper step={1}/>
                    <RegisterForm SetSuccess={SetOption} SetId = {SetId}/>
                </div>
            }
            {
                option === 2 &&
                <div className="log-container bg-white-transparent rounded-3xl p-5">
                    <p style={{marginBottom: '15px'}} className="info">New to <span
                        style={{color: 'peru'}}>EventWave</span>?</p>
                    <Stepper step={2}/>
                    <div className="bg-teal-500/20 rounded-2xl p-2 text-white mb-5">
                    We have sent you an email with verification code. Please check your mailbox and enter it here.
                    </div>
                    <VerificationForm id = {organizerId} SetSuccess={SetOption}/>
                </div>
            }
            {
                option === 3 &&
                    <div className="log-container bg-white-transparent rounded-3xl p-5 text-white">
                        <Stepper step={3}/>
                        <div className="bg-green-500/20 rounded-2xl p-2 text-white">
                            You've been successfully registered! Try log in! <FontAwesomeIcon
                            icon={doneIcon} className="text-green-800" fade></FontAwesomeIcon>
                        </div>
                    </div>
            }
        </div>
    )
}
export default RegisterBox;