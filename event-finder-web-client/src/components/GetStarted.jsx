import React from 'react'
import { Link } from 'react-router-dom';
import { mainPageAnimationText } from '../constants';


const GetStarted = () =>{

    return (
        <div className="flow-root flex">
            <div className="float-left lg:mx-20 mx-10 text-reveal-container">
                <div className="reflection text-base md:text-3xl uppercase text-animation tracking-normal">
                    <span className="first-text-animation-period">{mainPageAnimationText.at(0).text}</span>
                    <span className="animation-slide">
                        <span className="second-text-animation-period">&nbsp;{mainPageAnimationText.at(1).text}</span>
                    </span>
                </div>
            </div>
            <div className="float-right lg:my-6 my-20 p-10">
                <Link to='/log_in'>
                    <div className="link-effect text-lg md:text-3xl font-bold cursor-pointer border-2 border-solid p-3 rounded-lg 
                        uppercase shadow-md shadow-slate-100">
                        Get started
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default GetStarted;