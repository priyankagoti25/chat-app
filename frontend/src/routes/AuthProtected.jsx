import React from 'react';
import {useAuthStore} from "../store/useAuthStore.js";
import {Navigate} from "react-router-dom";

const AuthProtected = (props) => {
    const {authUser, isCheckingAuth} = useAuthStore()
    if(!isCheckingAuth && !authUser) {
        return <Navigate to="/login"/>
    }
    return (
        <>
            {props.children}
        </>
    );
};

export default AuthProtected;