import React from 'react';
import { useState, useEffect } from "react";
import styles from "../style";
import { useAuth } from "../hooks/useAuth.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import {api} from "../constants/index.js";

const DeleteAccount = ({id}) => {

  const [toggle, setToggle] = useState(false);
  const {user, logout} = useAuth();

  // useEffect(() => {
  //   let url = "http://localhost:8080/organizer";
  //   let token = `${user.sessionToken}`
  //   fetch(url, {
  //     method: 'GET',
  //     headers: {
  //       'sessionToken': token,
  //     }
  //   })
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       setOrganizer(responseJson)
  //     }).catch(error => console.log(error));
  // }, [])

  return (
    <div
        className="w-full font-poppins"
    >
      {!toggle ?
        <div className="text-center bg-black-gradient p-3 rounded-3xl cursor-pointer hover-effect mt-10 md:mt-0"
          onClick={() => { if (!toggle) setToggle(!toggle) }}>
          <FontAwesomeIcon icon={faTrash} className="text-white"></FontAwesomeIcon> Delete account
        </div> : null}
      {toggle ?
        <div className="bg-red-500 p-3 rounded-3xl flex flex-wrap">
          <span className='p-1 w-3/4'>Are you sure you want to delete account?</span>
          <div className='w-32 flex space-x-5 justify-end'>
            <span className='p-1 bg-white rounded-xl cursor-pointer hover-effect text-center text-black'
                  onClick={() => setToggle(!toggle)}>No</span>
            <span className='p-1 bg-white rounded-xl cursor-pointer hover:bg-red-900 text-center text-black'
                  onClick={() => {
                      logout();

                      let url = api.base + `/organizer/${id}`;
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
                  }>Yes</span>
          </div>
        </div> : null}
    </div>
  );
}

export default DeleteAccount;