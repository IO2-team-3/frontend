import React from "react";
import { useState } from "react";

import { close, menu, logo } from "../assets";
import { navLinks } from "../constants";

import 'font-awesome/css/font-awesome.min.css';

const Navbar = () => {
    const [active, setActive] = useState("Home");
    const [toggle, setToggle] = useState(false);

    return (
        <nav className="w-full flex w-full justify-between items-center navbar">

            <div className="p-3">
                <a href={'home'}>
                    <img
                        src={logo}
                        alt="EventWave"
                        className="w-[300px] h-[100px] object-contain hover:w-[320px] h-[120px]"
                    />
                </a>
            </div>


            <ul className="list-none sm:flex hidden justify-end items-center flex-1 py-6">
                {navLinks.map((nav, index) => (
                    <li
                        key={nav.id}
                        className={`font-poppins font-normal cursor-pointer navbar-element text-[16px] 
                            ${active === nav.title ? "text-white" : "text-dimWhite"} 
                            ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
                        onClick={() => setActive(nav.title)}
                    >
                        <a href={`./#${nav.id}`}><i className={nav.icon}/> {nav.title}</a>
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
                                className={`font-poppins font-medium cursor-pointer text-[16px] ${active === nav.title ? "text-white" : "text-dimWhite"
                                    } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                                onClick={() => setActive(nav.title)}
                            >
                                <a href={`./#${nav.id}`}><i className={nav.icon}/> {nav.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;