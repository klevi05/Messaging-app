import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import MessagesBox from './messagesBox';
import encryption from '../../encryption/enryption'
import { useEffect, useState} from 'react';
function Messaging({data, openConversation, image}){
    //state for the messages text bar
    const [newMessage, setNewMessage] = useState('')
    const [sender, setSender] = useState('');
    const [reciver, setReciver] = useState('');
    const [chatdata, setChatData] = useState()
    const [render, setRender] = useState(false)
    const [online, setOnline] = useState()
    const [alert, setAlert] = useState()
    useEffect(()=>{
        setSender(openConversation['partecipents'][0]['sender']===data["_id"]?data["_id"]:openConversation['partecipents'][0]['reciver'])
        setReciver(openConversation['partecipents'][0]['sender']!=data["_id"]?openConversation['partecipents'][0]['sender']:openConversation['partecipents'][0]['reciver'])

        fetch('http://localhost:5000/openChat',{mode: 'cors', method:"POST", headers: {'Content-Type':'application/json'}, body:JSON.stringify({
            "id": openConversation['partecipents'][0]['sender']!=data["_id"]?openConversation['partecipents'][0]['sender']:openConversation['partecipents'][0]['reciver'],
        })}).then((res)=>{
            return res.json()
        }).then((res)=>{
            setChatData(res)
            setRender(true)
        });
    },[openConversation])
    //created function to send messages
    function sendMessage(){
        if(newMessage!=""){
            fetch('http://localhost:5000/sendMessage',{mode: 'cors', method:"POST", headers: {'Content-Type':'application/json'}, body:JSON.stringify({
                "id": openConversation['messages_id'],
                "senderID": sender,
                "text": encryption(newMessage)
            })}).then((res)=>{
                return res.json()
            })
            setNewMessage("")
            setAlert('')
        }else{
            setAlert(<Alert severity="error">You cannot send an empty message!</Alert>)
        }
    }
    function getImages(item, imag){
        if(imag != undefined){
            const imageRetrived = imag?.find((images)=>{
                if(images['_id'] === item['imageId']) return images["image"];
             })
             return imageRetrived['image']
        }
    }
    return(
        <>
        {render===false?<div className='loadingScreenMessages'>
                            <CircularProgress size="5rem" />
                        </div>: 
                        <div className='chat-page'>
                            <div className="firendName">
                                <div className='imageChatDiv'>
                                    <img className={`imageChat ${online != false? "online": ""}`} src={getImages(chatdata, image)} alt="" />
                                </div>
                                <div className='usernameDiv'>
                                    <p>{chatdata['username']}</p>
                                </div>
                            </div>
                            <div>
                                {alert}
                            </div>
                            <div className="messages" >
                                <MessagesBox messages_id={openConversation['messages_id']} sender={sender} reciver={reciver} setOnline={setOnline}/>
                            </div>
                            <div className='message-area'>
                                <InputBase
                                    sx={{pl:2,color:'black', width: '95%', height:'100%'}}
                                    placeholder="Type your message..."
                                    value={newMessage}
                                    onChange={(e)=> setNewMessage(e.target.value)}
                                />
                                <IconButton onClick={sendMessage}type="button" sx={{ p: '10px', color:'#3F3F3F' }} aria-label="search">
                                    <SendIcon />
                                </IconButton>
                            </div>
                    </div>}
        
        </>
    )
}
export default Messaging