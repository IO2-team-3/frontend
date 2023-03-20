import React, {useState} from "react";
import "../style.css";
import RegisterForm from "./RegisterForm.jsx";
const RegisterBox = () => {
    const [showForm, setShowForm] = useState(false);

    return(
        <div className="register-container bg-white-transparent rounded-3xl p-5">
            <p style={{marginBottom:'15px'}} className="register-info">New to <span style={{color:'peru'}}>EventWave</span>?</p>
            {
                showForm ? <RegisterForm/>
                    :<button className="register-button p-3 rounded-3xl md:w-7/12 w-3/4"
                            onClick={()=>setShowForm(true)}>Register</button>
            }
        </div>
    )
}
export default RegisterBox;