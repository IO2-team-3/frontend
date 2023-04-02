import React, {useState} from 'react'
import styles from '../style'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegisterBox from "../components/RegisterBox.jsx";
import LogBox from "../components/LogBox.jsx";

const LogIn = () => {
    const [option,SetOption] = useState(0)

    return (
        <div className="background-wrapper w-full overflow-hidden bg-black-gradient ">

            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Navbar/>
                </div>
            </div>
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth} container`}>
                    <LogBox option = {option} SetOption = {SetOption}/>
                    <RegisterBox  option = {option} SetOption = {SetOption}/>
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