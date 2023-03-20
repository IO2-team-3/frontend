import React from "react";
import "../style.css";
const LogBox = () => {
    return (
        <div className="log-container bg-white-transparent rounded-3xl p-5">
            <form>
                <label htmlFor="email" className="form-control">Email</label>
                <input
                    id="email"
                    type="email"
                    className="form-control form-input p-3 rounded-3xl md:w-7/12 w-3/4"
                    autoFocus/>
                <label htmlFor="password" className="form-control">Password</label>
                <input
                    id="password"
                    type="password"
                    className="form-control form-input p-3 rounded-3xl md:w-7/12 w-3/4"
                    />
                <button className="form-control form-button p-3 rounded-3xl md:w-7/12 w-3/4">
                        Log in</button>
            </form>
        </div>
    )
}
export default LogBox;