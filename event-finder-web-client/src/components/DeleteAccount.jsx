import React from 'react';
import { useState, useEffect } from "react";
import styles from "../style";
import { useAuth } from "../hooks/useAuth.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const DeleteAccount = () => {

  const [toggle, setToggle] = useState(false);
  const {user, logout} = useAuth();
  const [organizer, setOrganizer] = useState(null);

  useEffect(() => {
    let url = "http://localhost:8080/organizer";
    let token = `${user.sessionToken}`
    fetch(url, {
      method: 'GET',
      headers: {
        'sessionToken': token,
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setOrganizer(responseJson)
      }).catch(error => console.log(error));
  }, [])

  return (
    <section className={`${styles.flexCenter} flex-row flex-wrap space-x-20 my-6`}>
      {!toggle ?
        <div className="bg-black-gradient p-3 w-9/12 rounded-3xl font-poppins cursor-pointer hover-effect"
          onClick={() => { if (!toggle) setToggle(!toggle) }}>
          <FontAwesomeIcon icon={faTrash} className="text-white"></FontAwesomeIcon> Delete account
        </div> : null}
      {toggle ?
        <div className="bg-red-500 p-3 w-9/12 rounded-3xl font-poppins align-center space-x-10">
          <span className='p-1'>Are you sure you want to delete account?</span>
          <span className='p-1 bg-white rounded-xl cursor-pointer hover-effect w-1/12 float-right text-center'
            onClick={() => setToggle(!toggle)}>No</span>
          <span className='p-1 bg-white rounded-xl cursor-pointer hover:bg-red-900 w-1/12 float-right text-center'
            onClick={() => {
              if(organizer != null){
              logout();

              let url = `http://localhost:8080/organizer/${organizer.id}`;
              let token = `${user.sessionToken}`
              fetch(url, {
                method: 'DELETE',
                headers: {
                  'sessionToken': token,
                }
              })
                .then((response) => response.json())
                .then((responseJson) => {
                  console.log(responseJson)
                }).catch(error => console.log(error));
              }
            }}>Yes</span>
        </div> : null}
    </section>
  );
}

export default DeleteAccount;