import React, {useEffect, useState} from "react";
import "../style.css";
import {api} from "../constants/index.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
const RegisterForm = ({SetSuccess,SetId}) => {
    const [invalid,SetInvalid] = useState(false);
    const [isLoading,SetLoading] = useState(false);
    const [invalidName,SetInvalidName] = useState(false);
    const [invalidEmail,SetInvalidEmail] = useState(0);
    const [invalidPass,SetInvalidPass] = useState(0);

    const [name,SetName] = useState("");
    const [email,SetEmail] = useState("");
    const [password,SetPassword] = useState("");
    const [toggle,SetToggle] = useState(false);

    useEffect(() => {
        if(invalid) {
            if (name === "") {
                SetInvalidName(true)
            } else SetInvalidName(false)
        }

    },[invalid, name])

    useEffect(()=>{
        if(invalid) {
            if (email === "") {
                SetInvalidEmail(1)
            } else if (!validateEmail()) {
                SetInvalidEmail(2)
            } else SetInvalidEmail(0)
        }
    },[invalid,email])

    useEffect(() => {
        if(invalid) {
            if (password === "") {
                SetInvalidPass(1)
            } else if (!validatePassword()) {
                SetInvalidPass(2)
            } else SetInvalidPass(0)
        }
    },[invalid,password])

    const validateEmail = (email) => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password === "" || !validateEmail(email) || !validatePassword() || name === "") {
            SetInvalid(true);
            return false;
        }

        SetLoading(true)

        await fetch(api.base + `/organizer`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        }).then(response => {
            if(response.ok){
                SetSuccess(2);
                return response.json();
            }
        })
            .then(json => {
                SetId(json.id);
            })
            .finally(() => SetLoading(false))
            .catch(err => console.log(err))

    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => SetName(e.target.value)}
                    style={invalidName?{outlineColor:"red"}:{}}
                    className="form-control form-input p-3 rounded-3xl md:w-7/12 w-3/4"
                    autoFocus/>
                <div className="message-reg" hidden  = {!invalidName}>Please enter name</div>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => SetEmail(e.target.value)}
                    style={invalidEmail!==0?{outlineColor:"red"}:{}}
                    className="form-control form-input p-3 rounded-3xl md:w-7/12 w-3/4"/>
                <div className="message-reg" hidden = {!(invalidEmail===1)}>Please enter valid email</div>
                <div className="message-reg" hidden  = {!(invalidEmail===2)}>Please enter email</div>
                <div className="relative h-12">
                    <input
                        id="password"
                        placeholder="Password"
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
                <div className="message-reg" hidden = {!(invalidPass===1)}>Please enter password</div>
                {
                    isLoading
                        ?
                        <button disabled
                                className="form-control form-button p-3 rounded-3xl md:w-7/12 w-3/4">
                            Signing in...
                            <div
                                className="inline-flex w-5 h-5 ml-5 border-l-2 border-t-2 border-white-900 rounded-full animate-spin">
                            </div>
                        </button>
                        :
                        <button type="submit" className="form-control form-button p-3 rounded-3xl md:w-7/12 w-3/4">
                            Create account</button>
                }
            </form>
        </div>
    )
}
export default RegisterForm;