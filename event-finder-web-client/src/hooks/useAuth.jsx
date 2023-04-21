import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage.jsx";
import {api} from "../constants/index.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage("user", null);
    const navigate = useNavigate();

    // call this function when you want to authenticate the user
    // const refreshToken = async (data) => {
    //     await fetch(api.base + `/organizer/login`,{
    //         method: 'GET',
    //         headers: {
    //             'Accept': 'application/json',
    //             'email': data.email,
    //             'password': data.password
    //         }
    //     })
    //         .then(response => {
    //             if(response.ok){
    //                 let json = response.json();
    //                 json.then((value) => {
    //                     console.log(value);
    //                     login(value)
    //                 })
    //             }
    //         })
    //         .catch(err => console.log(err))
    // }
    const login = async (data) => {
        setUser(data);
        navigate("organizer/my_events");
    };

    // call this function to sign out logged in user
    const logout = () => {
        setUser(null);
        navigate("/", { replace: true });
    };

    const value = useMemo(
        () => ({
            user,
            login,
            logout
        }),
        [user]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};