import React from 'react'
import styles from '../style'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LogBox from "../components/LogBox.jsx";
import RegisterBox from "../components/RegisterBox.jsx";

const LogIn = () => (

  <div className="background-wrapper w-full overflow-hidden bg-black-gradient ">

    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth} container`}>
            <LogBox/>
            <RegisterBox/>
          </div>
      </div>
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Footer />
      </div>
    </div>
  </div>

);

export default LogIn;