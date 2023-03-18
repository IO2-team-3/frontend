import React from 'react'
import styles from '../style'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LogIn = () => (

  <div className="background-wrapper w-full overflow-hidden bg-black-gradient ">

    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
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