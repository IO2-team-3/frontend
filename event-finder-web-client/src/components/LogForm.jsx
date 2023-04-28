import React, {useEffect, useRef, useState} from "react";
import "../style.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useAuth} from "../hooks/useAuth.jsx";
import {api} from "../constants/index.js";


const LogForm = () => {
    const [error,SetError] = useState(false);
    const [isLoading,SetLoading] = useState(false);

    const [invalid,SetInvalid] = useState(false)
    const [invalidEmail,SetInvalidEmail] = useState(0);
    const [invalidPass,SetInvalidPass] = useState(0);

    const [email,SetEmail] = useState("");
    const [password,SetPassword] = useState("");
    const [toggle,SetToggle] = useState(false);

    const { user,login } = useAuth();

    useEffect(() => {
        if(invalid){
            if(password === ""){
                SetInvalidPass(1)
            }else if (!validatePassword()) {
                SetInvalidPass(2)
            }
            else SetInvalidPass(0)
        }

    },[invalid,password])

    useEffect(()=>{
        if(invalid) {
            if (email === "") {
                SetInvalidEmail(1)
            } else if (!validateEmail()) {
                SetInvalidEmail(2)
            } else SetInvalidEmail(0)
        }
    },[invalid,email])

    const validateEmail = () => {
        let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(email.match(emailFormat)){
            return true;
        }
        else return false;
    }

    const validatePassword = () => {
        if(password.length >= 7){
            return true;
        }
        else return false;
    }

    const handleClick = async (e) => {
        e.preventDefault();
        if(password === "" || !validateEmail() || !validatePassword()) {
            e.preventDefault();
            SetInvalid(true)
            return;
        }

        SetLoading(true)
        await fetch(api.base + `/organizer/login`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': "*",
                'email':email,
                'password':password
            }
        })
        .then(response => {
            if(response.ok){
                 let json = response.json();
                 json.then((value) => {
                    login(value)
                })
            }
            else{
                SetError(true);
            }
        })
            .finally(() => SetLoading(false))
            .catch(err => console.log(err))

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
                        className="form-control form-input p-3 rounded-3xl"
                        value={email}
                        onChange={(e) => SetEmail(e.target.value)}
                        style={invalidEmail!==0?{outlineColor:"red"}:{}}
                        autoFocus/>
                    <div className="message" hidden = {!(invalidEmail===2)}>Please enter valid email</div>
                    <div className="message" hidden  = {!(invalidEmail===1)}>Please enter email</div>
                    <label htmlFor="password" className="form-control">Password</label>
                    <div className="relative h-12">
                        <input
                            id="password"
                            type={toggle?"text":"password"}
                            value={password}
                            onChange={(e) => SetPassword(e.target.value)}
                            className="form-control form-input p-3 rounded-3xl absolute right-0"
                            style={invalidPass!=0?{outlineColor:"red"}:{}}
                        />
                        <FontAwesomeIcon
                            icon={toggle?faEye:faEyeSlash}
                            className="text-gray-200/70 cursor-pointer text-lg absolute right-4 bottom-4"
                            onClick={() => SetToggle(!toggle)}>
                        </FontAwesomeIcon>
                    </div>
                    <div className="message" hidden = {!(invalidPass===2)}>Please enter minimum 8 characters</div>
                    <div className="message" hidden={!(invalidPass===1)}>Please enter password</div>

                    {
                        isLoading
                            ?
                            <button disabled
                                    className="form-control form-button p-3 rounded-3xl md:w-7/12 w-3/4">
                                Logging in...
                                <div className="inline-flex w-5 h-5 ml-5 border-l-2 border-t-2 border-white-900 rounded-full animate-spin" >
                                </div>
                            </button>
                            :
                            <button type="submit" className="form-control cursor-pointer form-button p-3 rounded-3xl md:w-7/12 w-3/4">
                            Log in</button>
                    }
                </form>
            </div>
        </div>
    )
}
export default LogForm;