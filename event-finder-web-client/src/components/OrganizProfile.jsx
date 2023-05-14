import {api} from "../constants/index.js";
import {useAuth} from "../hooks/useAuth.jsx";
import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faEye, faEyeSlash, faUser, faUserPen} from "@fortawesome/free-solid-svg-icons";
import DeleteAccount from "./DeleteAccount.jsx";

const OrganizProfile = () => {
    const { user, logout } = useAuth();
    let token = `${user.sessionToken}`

    const [id,SetId] = useState(0);
    const [name,SetName] = useState('');
    const [email,SetEmail] = useState('');
    const [pass,SetPass] = useState('');
    const [edit,SetEdit] = useState(false);
    const [loading,SetLoading] = useState(false);
    const [saving,SetSaving] = useState(false);
    const [toggle,SetToggle] = useState(false);
    const [invalid,SetInvalid] = useState(true);

    const loadData = () => {
        SetLoading(true)
        fetch(api.base + "/organizer",{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'sessionToken': token,
            }
        }).then(response => {
            if(response.status===403) logout();
            return response.json()
        })
            .then(json => {
                SetId(json.id);
                SetName(json.name);
                SetEmail(json.email);
            })
            .finally(() => SetLoading(false))
            .catch(err => console.log(err))
    }

    const validatePassword = () => {
        if(pass.length >= 7){
            SetInvalid(false)
            return true;
        }
        else {
            SetInvalid(true);
            return false;
        }
    }

    const handleChange = (e) => {
        SetPass(e.target.value)
        validatePassword()
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(name === '' || pass === ''){
            return;
        }

        if(!validatePassword()) return;
        SetSaving(true);

        fetch(api.base + `/organizer/${id}`, {
            method: 'PATCH',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'sessionToken': token,
            },
            body: JSON.stringify({
                name: name,
                password: pass
            })
        })
            .then(result => {
                if(result.status===403) logout();
                if(result.ok) window.location.reload()
            })
            .catch(err => console.log(err))
    }

    useEffect(()=>{
        loadData();
    },[])

    return (
        <div className="bg-white-transparent rounded-3xl p-5 text-white px-4 md:px-16">
        {
            edit ?
            <form onSubmit={handleSubmit}>
                <div className="sm:flex py-8 sm:space-x-20">
                    <div className="sm:w-64 space-y-7 mb-10 sm:mb-0 sm:shrink-0">
                        <div className="bg-white-transparent border border-cyan-500 p-5 rounded-3xl flex justify-center">
                            <FontAwesomeIcon className="fa-10x" icon={faUserPen} style={{color: "#1c7b82"}}/>
                        </div>
                        <div className="text-center bg-black-gradient p-3 rounded-3xl font-poppins cursor-pointer hover-effect"
                             onClick={()=>{SetEdit(false)}}>
                            <FontAwesomeIcon icon={faArrowLeft} className="text-white"></FontAwesomeIcon> Back
                        </div>
                    </div>
                    <div className="w-full space-y-5">
                        <p className="text-xl"> New name: </p>
                        <input className="w-full text-lg bg-white-transparent border border-cyan-500 rounded p-2 text-white"
                               type="text"
                               value={name}
                               onChange={(e)=>SetName(e.target.value)}
                                required/>
                        <p className="text-xl"> New password:</p>
                        <div className="relative" style={{height: "45px"}}>
                            <input className="w-full text-lg bg-white-transparent border border-cyan-500 rounded p-2 text-white absolute right-0"
                                   type={toggle?"text":"password"}
                                   value={pass}
                                   onChange={handleChange}
                                   required/>
                            <FontAwesomeIcon
                                icon={toggle?faEye:faEyeSlash}
                                className="text-gray-200/70 cursor-pointer text-lg absolute right-4 bottom-4"
                                onClick={() => SetToggle(!toggle)}>
                            </FontAwesomeIcon>
                        </div>
                        <button className={`w-full text-center ${invalid?'bg-gray-600/30 text-gray-100/40':'bg-black-gradient hover-effect cursor-pointer'} p-3 rounded-3xl font-poppins`}
                                type="submit"
                                disabled={invalid}
                                onChange={handleChange}>
                            {saving ? "Saving" : "Save" }
                        </button>
                    </div>
                </div>
            </form>
            :
            <div>
                <div className="sm:flex py-8 sm:space-x-20">
                    <div className="sm:w-64 space-y-7 mb-10 sm:mb-0 sm:shrink-0">
                        <div className="bg-white-transparent border border-cyan-500 p-5 rounded-3xl flex justify-center">
                            <FontAwesomeIcon className="fa-10x" icon={faUser} style={{color: "#1c7b82"}}/>
                        </div>
                        <div className="text-center bg-black-gradient p-3 rounded-3xl font-poppins cursor-pointer hover-effect"
                             onClick={()=>{SetEdit(true)}}>
                            Edit profile
                        </div>
                    </div>
                    <div className="w-full space-y-5">
                        <p className="text-xl"> Name: </p>
                        <div className="bg-white-transparent border border-cyan-500 rounded p-2 text-gray-400">
                            {
                                loading ?
                                    <div className="inline-flex w-5 h-5 ml-5 border-l-2 border-t-2 border-gray-400 rounded-full animate-spin" />
                                    :
                                    <span className="text-lg">{name}</span>
                            }
                        </div>
                        <p className="text-xl"> Email:</p>
                        <div className="bg-white-transparent border border-cyan-500 rounded p-2 text-gray-400">
                            {
                                loading ?
                                    <div className="inline-flex w-5 h-5 ml-5 border-l-2 border-t-2 border-gray-400 rounded-full animate-spin" />
                                    :
                                    <span className="text-lg">{email}</span>
                            }
                        </div>
                        <DeleteAccount id={id}/>
                    </div>
                </div>
            </div>
        }
        </div>
    )
}
export default OrganizProfile;