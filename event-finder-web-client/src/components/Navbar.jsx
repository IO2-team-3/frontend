import React from "react";
import { useState } from "react";
import {Link, Navigate, Outlet} from "react-router-dom";

import { close, menu, logo } from "../assets";
import {authNavLinks, navLinks} from "../constants";

import 'font-awesome/css/font-awesome.min.css';
import {useAuth} from "../hooks/useAuth.jsx";

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const {user,logout} = useAuth();
    return (
        <nav className="w-full flex w-full justify-between items-center navbar">

            <div className="p-3">
                <Link to='/'>
                    <img
                        src={logo}
                        alt="EventWave"
                        className="w-[300px] h-[100px] object-contain hover:w-[320px] h-[120px]"
                    />
                </Link>
            </div>

            <ul className="list-none sm:flex hidden justify-end items-center flex-1 py-6">
                {
                    user
                    ?
                    authNavLinks.map((nav, index) => (
                        <li onClick={() => { nav.id==="log_out" ? logout() : {} }}
                            key={nav.id}
                            className={`font-poppins font-normal cursor-pointer navbar-element text-[16px] 
                        ${window.location.pathname === nav.link ? "text-white" : "text-dimWhite"} 
                        ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
                        >
                            {nav.id === "log_out"
                                ? <Link onClick={logout}><i className={nav.icon}/> {nav.title}</Link>
                                : <Link to={nav.link}><i className={nav.icon}/> {nav.title}</Link>
                            }
                        </li>
                    ))
                    :
                    navLinks.map((nav, index) => (
                    <li
                        key={nav.id}
                        className={`font-poppins font-normal cursor-pointer navbar-element text-[16px] 
                            ${window.location.pathname === nav.link ? "text-white" : "text-dimWhite"} 
                            ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
                    >
                        <Link to={nav.link}><i className={nav.icon} /> {nav.title}</Link>
                    </li>
                ))}
            </ul>

            <div className="sm:hidden flex flex-1 justify-end items-center">
                <img
                    src={toggle ? close : menu}
                    alt="menu"
                    className="w-[28px] h-[28px] object-contain"
                    onClick={() => setToggle(!toggle)}
                />

                <div
                    className={`${!toggle ? "hidden" : "flex"
                        } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar z-10`}
                >
                    <ul className="list-none flex justify-end items-start flex-1 flex-col">
                        {navLinks.map((nav, index) => (
                            <li
                                key={nav.id}
                                className={`font-poppins font-medium cursor-pointer text-[16px] 
                                ${window.location.pathname === nav.link ? "text-white" : "text-dimWhite"} 
                                ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                            >
                                <Link to={nav.link}><i className={nav.icon} /> {nav.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;