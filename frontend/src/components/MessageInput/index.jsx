import React, {useRef, useState} from 'react';
import {Image, Send, X} from "lucide-react";
import toast from "react-hot-toast";
import {useChatStore} from "../../store/useChatStore.js";

const MessageInput = () => {

    const {sendMessage} = useChatStore()

    const [text, setText] = useState("")
    const [imagePreview, setImagePreview] = useState(null);
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null)

    const handleImageChange = (e) => {
        const file = e.target?.files?.[0]
        if(!file) return;
        if(!file.type.startsWith('image/')) {
            toast.error('Please select an image file')
            return;
        }
        setImage(file)
        const reader = new FileReader()
        reader.onloadend = ()=>{
            setImagePreview(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const removeImage = () => {
        setImagePreview(null)
        setImage(null)
        if(fileInputRef.current) fileInputRef.current.value = ""
    }

    const handleSendMessage = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('text', text)
        if(image){
            formData.append('image', image)
        }
        try {
            await sendMessage(formData)
            removeImage()
            setText("")
        } catch (error) {
            console.log("Failed to send message ", error)
        }

    }
    return (
        <div className="p-4 w-full">
            {
                imagePreview && (
                    <div className="mb-3 flex items-center gap-2">
                        <div className="relative">
                            <img
                                src={imagePreview}
                                alt=""
                                className="size-20 object-cover rounded-lg border border-zinc-700"
                            />
                            <button
                                type="button"
                                onClick={removeImage}
                                className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-base-300 flex items-center justify-center"
                            >
                                <X className="size-3"/>
                            </button>
                        </div>

                    </div>
                )
            }
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className="flex-1 flex gap-2">
                    <input
                        className="w-full input input-bordered rounded-lg input-sm sm:input-md"
                        type="text"
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                    <button
                        type="button"
                        className={`hidden sm:flex btn btn-circle ${imagePreview?'text-green-500': 'text-zinc-400'}`}
                        onClick={() => fileInputRef?.current?.click()}
                    >
                        <Image size={20}/>
                    </button>
                </div>
                <button
                    type="submit"
                    className="btn btn-circle"
                    disabled={!text.trim() && !imagePreview}
                >
                    <Send size={22}/>
                </button>
            </form>
        </div>
    );
};

export default MessageInput;