import {create} from "zustand";
import toast from "react-hot-toast";
import {axiosInstance} from "../lib/axios.js";

export const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,
    getUsers: async () => {
        set({isUserLoading: true})
        try {
            const response = await axiosInstance.get('/auth/users')
            set({users: response.data.data})
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            set({isUserLoading: false})
        }
    },
    getMessages: async (userId) => {
        set({isMessagesLoading: true})
        try {
            const response = await axiosInstance.get(`/messages/${userId}`)
            set({messages: response.data.data})
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            set({isMessagesLoading: false})
        }
    },
    setSelectedUser: (selectedUser) => set({selectedUser}),
}))