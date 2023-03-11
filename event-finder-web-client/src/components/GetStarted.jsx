import React from 'react'
import { mainPageAnimationText } from '../constants';

const GetStarted = () =>{

    return (
        <div className="flow-root flex">
            <div className="float-left lg:mx-20 mx-10 text-reveal-container">
                <div className="reflection text-base md:text-3xl uppercase text-animation tracking-normal">
                    <span class="first-text-animation-period">{mainPageAnimationText.at(0).text}</span>
                    <span class="animation-slide">
                        <span class="second-text-animation-period">&nbsp;{mainPageAnimationText.at(1).text}</span>
                    </span>
                </div>
            </div>
            <div className="float-right lg:my-6 my-20 p-10">
                <a>
                    <div className="link-effect text-lg md:text-3xl font-semibold cursor-pointer border-2 border-solid p-3 rounded-lg">
                        <a href="./register">Get started</a>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default GetStarted;