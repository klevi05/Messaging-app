import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import MessagesBox from './messagesBox';
import encryption from '../../encryption/enryption'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
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
    const [open, setOpen] = useState(false);
    const [imageMessage, setImageMessage] = useState("")
    const [showImage, setShowImage] = useState("")
    const [document, setDocument] = useState("")
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    if(imageMessage!=''){
        var reader = new FileReader();
        reader.readAsDataURL(imageMessage);
        reader.onload=()=>{setShowImage(reader.result)}
    }
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
                    "text": encryption(newMessage),
                    "type": 'text'
                })}).then((res)=>{
                    setImageMessage('')
                    setDocument('')
                    setNewMessage("")
                    setAlert('')
                    return res.json()
                })
            }else if(imageMessage != ""){
                const formData = new FormData();
                formData.append("id", openConversation['messages_id']);
                formData.append('senderID', sender);
                formData.append('file', imageMessage);
                formData.append('type', 'image')
                fetch('http://localhost:5000/addingImageMessages',{mode: 'cors', method:"POST", body:formData }).then((res)=>{
                    setImageMessage('')
                    setDocument('')
                    setNewMessage("")
                    setAlert('')
                    return res.json()
                })
            }else if(document !=""){
                const formDataDocument = new FormData();
                formDataDocument.append("id", openConversation['messages_id']);
                formDataDocument.append('senderID', sender);
                formDataDocument.append('file', document);
                formDataDocument.append('type', 'document')
                fetch('http://localhost:5000/addingDocumentMessagess',{mode: 'cors', method:"POST", body:formDataDocument}).then((res)=>{
                    setImageMessage('')
                    setDocument('')
                    setNewMessage("")
                    setAlert('')
                    return res.json()
                })
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
                            {imageMessage!=""?
                                <div className='backgroundSendImage'>                               
                                <img className="imageSend" src={showImage} alt="" />
                                <DeleteForeverIcon style={{cursor:'pointer'}} onClick={()=>{setImageMessage(''),showImage('')}}/>
                            </div>:""
                            }
                            <div className='message-area'>
                                <div className='attchments'>
                                    <button className='buttonAttachment' variant="outlined" onClick={handleClickOpen}>
                                        <AttachFileIcon />
                                    </button>
                                    <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    PaperProps={{
                                    component: 'form',
                                    }}
                                    >
                                    <DialogTitle>Add an image</DialogTitle>
                                    <DialogContent>
                                    <input onChange={(e)=>{setImageMessage(e.target.files[0]),handleClose()}} type="file" className="form-control" id="inputGroupFile01"/>
                                    </DialogContent>
                                    <DialogTitle>Add a Document</DialogTitle>
                                    <DialogContent>
                                    <input onChange={(e)=>{setDocument(e.target.files[0]),handleClose()}} type="file" className="form-control" id="inputGroupFile01"/>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button type="submit">Subscribe</Button>
                                    </DialogActions>
                                    </Dialog>
                                </div>
                                <div>
                                    {(document!='')?
                                    <InputBase
                                    sx={{pl:2,color:'black', width: '95%', height:'100%'}}
                                    placeholder="Send a document or type something..."
                                    value={document['name']}
                                    onChange={(e)=> {setNewMessage(e.target.value), setDocument('')}}
                                    />
                                    :
                                    <>
                                    {imageMessage!=''?
                                        <>
                                        <InputBase
                                        sx={{pl:2,color:'black', width: '95%', height:'100%'}}
                                        placeholder="Send the image or write something to delete it..."
                                        value={''}
                                        onChange={(e)=> {setNewMessage(e.target.value),setImageMessage('')}}
                                        />
                                        </>:
                                        <InputBase
                                        sx={{pl:2,color:'black', width: '95%', height:'100%'}}
                                        placeholder="Type your message..."
                                        value={newMessage}
                                        onChange={(e)=> setNewMessage(e.target.value)}/> 
                                    }
                                    </>
                                    }
                                    
                                </div>
                                <div>
                                <IconButton onClick={()=>{sendMessage(),setImageMessage(''),setDocument(''),setNewMessage(""),setAlert('')}}type="button" sx={{ p: '10px', color:'#3F3F3F' }} aria-label="search">
                                    <SendIcon />
                                </IconButton>
                                </div>
                            </div>
                    </div>}
        
        </>
    )
}
export default Messaging