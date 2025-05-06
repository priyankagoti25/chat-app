import {create} from "zustand";
import toast from "react-hot-toast";

export const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,
    getUsers: async () => {
        set({isUserLoading: true})
        try {

        } catch (error) {

        }
    }
}))