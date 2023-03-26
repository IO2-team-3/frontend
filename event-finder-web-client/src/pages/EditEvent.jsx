import EditForm from "../components/EditForm.jsx";
import styles from "../style.js";
import Navbar from "../components/Navbar.jsx";
import React, {useEffect} from "react";
import Footer from "../components/Footer.jsx";

const EditEvent = () => {
    useEffect(()=>{
        window.scrollTo(0,0);
    },[])

    return (
    <div className="background-wrapper w-full overflow-hidden">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
                <Navbar />
            </div>
        </div>


        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth} bg-white-transparent rounded-3xl p-5`}>
                <EditForm/>
            </div>
        </div>
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
                <Footer />
            </div>
        </div>
    </div>

    )
}
export default EditEvent;