import {create} from "zustand"
import {axiosInstance} from "../lib/axios.js";
import toast from "react-hot-toast";
import {io} from 'socket.io-client'

const BASE_URL = 'http://localhost:5001/'

const useAuthStore = create((set, get)=>({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,
    checkAuth: async ()=>{
        set({isCheckingAuth: true})
        try {
            const response = await axiosInstance.get("/auth/check")
            set({authUser: response.data.data})
            get().connectSocket()
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
            get().disconnectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    login: async (payload) => {
        set({isLoggingIn: true})
        try {
            const response = await axiosInstance.post("/auth/login", payload)
            set({authUser: response.data.data.user})
            toast.success("Logged in successfully")
            get().connectSocket()
            return true
        } catch (error) {
            toast.error(error.response.data.message)
            return false
        } finally {
            set({isLoggingIn: false})
        }
    },
    updateProfileImage: async (data) => {
        set({isUpdatingProfile: true})
        try {
            const response = await axiosInstance.put("/auth/updateProfilePic", data)
            set({authUser: response.data.user})
            toast.success("Profile updated successfully")
            return true
        } catch (error) {
            toast.error(error.message)
            return false
        } finally {
            set({isUpdatingProfile: false})
        }
    },
    connectSocket: () => {
        const {authUser} = get()
        if(!authUser || get().socket?.connected) return;
        const socket = io(BASE_URL,{
            query: {
                userId: authUser?._id
            }
        })
        socket.connect()
        set({socket: socket})
        socket.on('getOnlineUsers', (userIds) => set({onlineUsers: userIds}))
    },
    disconnectSocket: () => {
        if(get().socket?.connected)  get().socket?.disconnect()
    }
}))

export {useAuthStore}