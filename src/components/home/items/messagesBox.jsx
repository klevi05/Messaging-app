import { useEffect, useState, useRef} from "react"
import { useSocketContext } from "../../../context/SocketContext"
import decrypt from '../../decryption/decryption';
function MessagesBox({messages_id, sender, reciver, setOnline}){
    const lastMessage = useRef()
    const [messages, setMessages] = useState()
    const [render, setRender] = useState()

    const {onlineUsers} = useSocketContext();
    setOnline(onlineUsers.includes(reciver));
    
    useEffect(()=>{
        fetch('http://localhost:5000/retriveMessages',{mode: 'cors', method:"POST", headers: {'Content-Type':'application/json'}, body:JSON.stringify({
            "id": messages_id
        })}).then((res)=>{
            return res.json()
        }).then((res)=>{
            setMessages(res)
            setRender(true)
        })
    },[messages])
    useEffect(()=>{
        setTimeout(() => {
            lastMessage.current?.scrollIntoView({behavior: "smooth"})
        }, 100);
    })
    return(
        <>
        {render!=true?"":
            <>
            {messages['messages'].map((item)=>{
                if(item['text']!=""){
                    if(item['senderID'] === sender){
                        return(
                        <div ref={lastMessage} className='messageContentSender' key={item['_id']}>
                            <p className='messagesTextSender'>{decrypt(item['text'])}<br /><span className="timeSender">{item['createdAt']}</span></p>
                        </div>)
                    }else{
                        return(<div ref={lastMessage} className='messageContentReciver'key={item['_id']}>
                            <p className='messagesTextReciver'>{decrypt(item['text'])} <br /><span className="timeSender">{item['createdAt']}</span></p>
                        </div>)
                    }
                }
            })}
            </>
        }
        </>
    )
}
export default MessagesBox