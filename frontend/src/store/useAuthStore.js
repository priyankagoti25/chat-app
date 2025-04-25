import {create} from "zustand"
import {axiosInstance} from "../lib/axios.js";

const useAuthStore = create((set)=>({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    checkAuth: async ()=>{
        set({isCheckingAuth: true})
        try {
            const response = await axiosInstance.get("/auth/check")
            set({authUser: response.data})
        } catch (error) {
            console.log("Error in check auth", error)
            set({authUser: null})
        } finally {
            set({isCheckingAuth: false})
        }
    },
    signup: async () =>{
        set({isSigningUp: true})
        try {
            const response = await axiosInstance.get("/auth/signup")
            console.log('signup response', response)
        } catch (error) {
            console.log('error-->', error)
        } finally {
            set({isSigningUp: false})
        }
    }
}))

export {useAuthStore}