import React from 'react'
import styles from '../style'
import Navbar from '../components/Navbar';
import OrganizPanel from '../components/OrganizPanel';
import CreateEvent from '../components/CreateEvent';
import Events from '../components/Events';
import DeleteAccount from '../components/DeleteAccount';
import Footer from '../components/Footer';

const MyEvents = () => (

  <div className="background-wrapper w-full overflow-hidden">

    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>


    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth} bg-white-transparent rounded-3xl p-5`}>
        <OrganizPanel/>
        <CreateEvent/>
        <Events/>
        <DeleteAccount/>
      </div>
    </div>

    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Footer />
      </div>
    </div>
  </div>

);

export default MyEvents;