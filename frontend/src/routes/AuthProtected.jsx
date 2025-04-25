import React from 'react';
import {useAuthStore} from "../store/useAuthStore.js";
import {Navigate} from "react-router-dom";

const AuthProtected = (props) => {
    const {authUser, isCheckingAuth} = useAuthStore()
    console.log(authUser)
    if(authUser) {
        return (
            <>
                {props.children}
            </>
        )
    }
    return <Navigate to="/login"/>;
};

export default AuthProtected;