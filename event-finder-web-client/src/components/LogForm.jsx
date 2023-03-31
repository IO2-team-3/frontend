import React, {useEffect, useRef, useState} from "react";
import "../style.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {useAuth} from "../hooks/useAuth.jsx";


const LogForm = () => {
    const [error,SetError] = useState(false);

    const [invalid,SetInvalid] = useState(false)
    const [invalidEmail,SetInvalidEmail] = useState(0);
    const [invalidPass,SetInvalidPass] = useState(false);

    const [email,SetEmail] = useState("");
    const [password,SetPassword] = useState("");

    const { user,login } = useAuth();

    useEffect(() => {
        if(invalid){
            if(password === ""){
                SetInvalidPass(true)
            }
            else SetInvalidPass(false)
        }

    },[invalid,password])

    useEffect(()=>{
        if(invalid) {
            if (email === "") {
                SetInvalidEmail(1)
            } else if (!validateEmail(email)) {
                SetInvalidEmail(2)
            } else SetInvalidEmail(0)
        }
    },[invalid,email])

    const validateEmail = (email) => {
        let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(email.match(emailFormat)){
            return true;
        }
        else return false;
    }

    const handleClick = (e) => {
        e.preventDefault();
        if(password === "" || !validateEmail(email)) {
            e.preventDefault();
            SetInvalid(true)
            return;
        }

        fetch(`http://localhost:8080/organizer/login?email=${email}&password=${password}`,{
            method: 'GET',
            mode: 'no-cors'
            // body: JSON.stringify({
            //     email:{email},
            //     password:{password}
            // })
        })
            .then(res => {
                //console.log(res.json())
                login({token:"8e932ceb-7979-4d60-bd44-c1af3393e4de"})
                //SetInvalid(true);
                //console.log(user)
            })
    }

    const handleXClick = () =>{
        SetError(false)
    }

    return (
        <div>
            <div id="error" className="error-container rounded-3xl p-5" hidden={!error}>
                <div className="error-message">
                    Incorrect email or password.
                </div>
                <div className="error-x">
                    <button onClick={handleXClick} hidden = {!error}>
                        <FontAwesomeIcon icon = {faXmark} style={{color: "#f50000",}} />
                    </button>
                </div>
            </div>
            <div className="log-container bg-white-transparent rounded-3xl p-5">
                <form onSubmit = {handleClick}>
                    <label htmlFor="email" className="form-control">Email</label>
                    <input
                        id="email"
                        type="text"
                        className="form-control form-input p-3 rounded-3xl md:w-7/12 w-3/4"
                        value={email}
                        onChange={(e) => SetEmail(e.target.value)}
                        style={invalidEmail!==0?{outlineColor:"red"}:{}}
                        autoFocus/>
                    <div className="message" hidden = {!(invalidEmail===2)}>Please enter valid email</div>
                    <div className="message" hidden  = {!(invalidEmail===1)}>Please enter email</div>
                    <label htmlFor="password" className="form-control">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => SetPassword(e.target.value)}
                        className="form-control form-input p-3 rounded-3xl md:w-7/12 w-3/4"
                        style={invalidPass?{outlineColor:"red"}:{}}
                    />
                    <div className="message" hidden={!invalidPass}>Please enter password</div>
                    <button type="submit" className="form-control form-button p-3 rounded-3xl md:w-7/12 w-3/4">
                        Log in</button>
                </form>
            </div>
        </div>
    )
}
export default LogForm;