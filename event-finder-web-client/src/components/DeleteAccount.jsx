import React from 'react';
import { useState } from "react";
import styles from "../style";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const DeleteAccount = () => {

  const [toggle, setToggle] = useState(false);

  return (
      <section className={`${styles.flexCenter} flex-row flex-wrap space-x-20 my-6`}>
          {!toggle ?
          <div className="bg-black-gradient p-3 w-9/12 rounded-3xl font-poppins cursor-pointer hover-effect"
            onClick={() => {if(!toggle) setToggle(!toggle)}}>
                <FontAwesomeIcon icon={faTrash} className="text-white"></FontAwesomeIcon> Delete account
          </div> : null}  
          {toggle ? 
          <div className="bg-red-500 p-3 w-9/12 rounded-3xl font-poppins align-center space-x-10">
              <span className='p-1'>Are you sure you want to delete account?</span>
              <span className='p-1 bg-white rounded-xl cursor-pointer hover-effect w-1/12 float-right text-center' 
                onClick={() => setToggle(!toggle)}>No</span>
              <span className='p-1 bg-white rounded-xl cursor-pointer hover:bg-red-900 w-1/12 float-right text-center' 
                onClick={() => setToggle(!toggle)}>Yes</span>
          </div> : null}
      </section>
  );
}

export default DeleteAccount;