import {create} from "zustand";
import toast from "react-hot-toast";
import {axiosInstance} from "../lib/axios.js";
import {useAuthStore} from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
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
    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get()
        try {
            const response = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData)
            set({messages:[ ...messages, response.data.data]})
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    },
    setSelectedUser: (selectedUser) => set({selectedUser}),
    subscribeToMessages: () => {
        const { selectedUser } = get()
        const socket = useAuthStore.getState().socket
        if(!selectedUser) return;
        socket.on("newMessage",(newMessage) => {
            if(selectedUser?._id === newMessage.senderId) {
                set({messages: [...get().messages, newMessage]})
            }
        })
    },
    unsubscribeToMessages: () => {
        const socket = useAuthStore.getState().socket
        socket.off("newMessage")
    }
}))