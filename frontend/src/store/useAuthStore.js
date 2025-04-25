import {create} from "zustand"
import {axiosInstance} from "../lib/axios.js";
import toast from "react-hot-toast";

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
            set({authUser: response.data.data})
        } catch (error) {
            console.log("Error in check auth", error)
            set({authUser: null})
        } finally {
            set({isCheckingAuth: false})
        }
    },
    signup: async (payload) =>{
        set({isSigningUp: true})
        try {
            const response = await axiosInstance.post("/auth/signup", payload)
            set({authUser: response.data.data})
            toast.success("Account created successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({isSigningUp: false})
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout")
            set({authUser: null})
            toast.success("Logged out successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    login: async (payload) => {
        set({isLoggingIn: true})
        try {
            const response = await axiosInstance.post("/auth/login", payload)
            console.log('login response', response)
            set({authUser: response.data.data.user})
            toast.success("Logged in successfully")
            return true
        } catch (error) {
            toast.error(error.response.data.message)
            return false
        } finally {
            set({isLoggingIn: false})
        }
    }
}))

export {useAuthStore}