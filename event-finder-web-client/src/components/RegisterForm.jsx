import React, {useEffect, useState} from "react";
import "../style.css";
const RegisterForm = () => {

    return(
        <div>
            <form>
                <input
                    type="text"
                    placeholder="Name"
                    className="form-control form-input p-3 rounded-3xl md:w-7/12 w-3/4"/>
                <input
                    type="email"
                    placeholder="Email"
                    className="form-control form-input p-3 rounded-3xl md:w-7/12 w-3/4"/>
                <input
                    type="password"
                    placeholder="Password"
                    className="form-control form-input p-3 rounded-3xl md:w-7/12 w-3/4"
                />
                <button className="form-control form-button p-3 rounded-3xl md:w-7/12 w-3/4">
                    Create account</button>
            </form>
        </div>
    )
}
export default RegisterForm;