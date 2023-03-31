import React, {useState} from 'react'
import styles from '../style'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegisterBox from "../components/RegisterBox.jsx";
import LogBox from "../components/LogBox.jsx";
import {Home} from "../components/Home.jsx";

const LogIn = () => {
    const [toggle,SetToggle] = useState(false)

    return (
        <div className="background-wrapper w-full overflow-hidden bg-black-gradient ">

            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Navbar/>
                </div>
            </div>
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth} container`}>
                    <LogBox isNR = {toggle} switch = {SetToggle}/>
                    <RegisterBox  isNR = {toggle} switch = {SetToggle}/>
                </div>
            </div>
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Footer/>
                </div>
            </div>
        </div>
    )
};

export default LogIn;