import { createContext, useState, useEffect, useContext } from "react";
import Cookies from 'js-cookie'
import io from "socket.io-client"
import decrypt from '../components/decryption/decryption';

const SocketContext = createContext();
export const useSocketContext = () =>{
    return useContext(SocketContext)
}
export const SocketContextProvide=({children})=>{
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    useEffect(()=>{
        if(Cookies.get('user',{path:'/'})){
            const socket = io("http://localhost:5000",
                {
                    query:{
                        userID: JSON.parse(decrypt(Cookies.get('user',{path:'/'})))['_id']
                    }
                }
            );
            setSocket(socket)
            socket.on("getOnlineUsers", (users)=>{
                setOnlineUsers(users)
            })
            return ()=> socket.close();
        }else{
            if(socket){
                socket.close();
                setSocket(null)
            }
        }
    },[])
    return <SocketContext.Provider value={{socket, onlineUsers}}>{children}</SocketContext.Provider>
}