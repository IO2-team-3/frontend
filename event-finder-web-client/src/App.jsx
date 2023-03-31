import React from 'react'
import {BrowserRouter, Outlet} from 'react-router-dom'
import styles from './style'
import Navbar from './components/Navbar';
import Slider from './components/Slider';
import GetStarted from './components/GetStarted';
import Statistics from './components/Statistics';
import Footer from './components/Footer';
import {Home} from "./components/Home.jsx";

const App = () => (

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
        <GetStarted />
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

export default App;