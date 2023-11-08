// @ts-nocheck
import { useState,useEffect, useRef } from 'react'
import { Server } from "../utils/Server"
import io from 'socket.io-client'
import { User } from '../types'

// setting socket.io to listen on server url
const socket = io(import.meta.env.VITE_BASE_URL)

function ChatPage() {
  const [messages, setMessages] = useState<string[]>([])
  const [message, setMessage] = useState("")
  const [isLoading,setIsLoading] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))

  // configuration for user jwt token to auth 
  const config = {
    headers: { 
      Authorization: `Bearer ${user.token}`
    }
  }

  // function to handle state change of form elements
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setMessage(value)
  }

  // submitting user chat to the server and saving with chat response
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try{
      setIsLoading(true)
      // initializing role of chat and sending to the chat
      socket.emit('message', {role:"user",message:message})
      // resetting message state after submission
      setMessage("")
      // posting message to the server endpoint /message with configuration for auth
      const {data} = await Server.post("/message", { message },config)
      // setting response to the existing chat
      setMessages(prevstate => ([...prevstate,data.response]))
    }catch(e:any){
      // console.log for logging error if occurred
      console.log(e)
    }
    finally{
      // setting loading state on error or fullfillment of request event
      setIsLoading(false)
    }
  }

  // listening message event to get message in real-time
  useEffect(() => {
    socket.on('message', (message) => {
      // setting real-time response to the chat
      setMessages((prevMessages) => ([...prevMessages, message]));
    });
  }, []);

  // function to fetch user previous chats
  const fetchChats = async() => {
      const {data} = await Server.get('/user/messages',config)
      const oldMessages = data.messages.messages
      // setting chats to user previous chats
      setMessages(prevState => ([...prevState,...oldMessages.flat()]))
  }

  useEffect(() => {
    // fetching user chats on initial render
    fetchChats()
  },[])


  return (
    <main className="px-8 pt-4 pb-3 flex flex-col h-[88vh] justify-between">
      <div id="container" className="h-full  overflow-y-scroll pb-4">
        <div className="flex  flex-col">
          {/* mapping through user chats */}
        {messages.map((item,idx) => (
          <h1 className={`even:mb-4 ${item.role === 'user' ? "font-bold" : ""}`} key={idx}>{item.message}</h1>
        ))}
        </div>
        {isLoading && "loading..."}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center  md:mx-8 ">
        <input className="input" type="text" value={message} placeholder="start typing here..." onChange={handleChange} />
        <button className="bg-emerald-400 text-white px-4 py-1 rounded-md mx-2">Send</button>
      </form>
    </main>
  )
}

export default ChatPage
