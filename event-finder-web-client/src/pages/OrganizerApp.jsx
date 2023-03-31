import React from 'react'
import styles from '../style'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Slider from "../components/Slider.jsx";
import Statistics from "../components/Statistics.jsx";
import {Outlet} from "react-router-dom";


const OrganizerApp = () => (

    <div className="background-wrapper w-full overflow-hidden">

        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
                <Navbar />
            </div>
        </div>


        <div className={`${styles.flexStart}`}>
            <div className={`${styles.boxWidth}`}>
                <Slider />
            </div>
        </div>


        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
                <Statistics />
            </div>
        </div>

        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
                <Footer />
            </div>
        </div>

        <Outlet />
    </div>
);

export default OrganizerApp;