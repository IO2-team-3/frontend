import React, {useState} from "react";
import "../style.css";
import RegisterForm from "./RegisterForm.jsx";
const RegisterBox = (props) => {

    const handleClick = () => {
        props.switch(true)
    }

    return(
        <div className="register-container bg-white-transparent rounded-3xl p-5">
            <p style={{marginBottom:'15px'}} className="info">New to <span style={{color:'peru'}}>EventWave</span>?</p>
            {
                props.isNR ? <RegisterForm/>
                    :<button className="switch-button p-3 rounded-3xl md:w-7/12 w-3/4"
                            onClick={handleClick}>Register</button>
            }
        </div>
    )
}
export default RegisterBox;