import { useEffect, useState, useRef} from "react"
import { useSocketContext } from "../../../context/SocketContext"
import decrypt from '../../decryption/decryption';
import DescriptionIcon from '@mui/icons-material/Description';
import FileDownload from 'js-file-download';
import Axios from 'axios'
function MessagesBox({messages_id, sender, reciver, setOnline}){
    const lastMessage = useRef()
    const [messages, setMessages] = useState()
    const [render, setRender] = useState()
    const [image, setImage] = useState()
    const [document, setDocument] = useState()
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
    useEffect(()=>{
        fetch('http://localhost:5000/getImagesMessages',{mode: 'cors', method:"POST", headers: {'Content-Type':'application/json'}, body:JSON.stringify({
            "id": messages_id
        })}).then((res)=>{
            return res.json()
        }).then((res)=>{
            setImage(res)
        })
    },[messages])
    useEffect(()=>{
        fetch('http://localhost:5000/getDocuments',{mode: 'cors', method:"POST", headers: {'Content-Type':'application/json'}, body:JSON.stringify({
            "id": messages_id
        })}).then((res)=>{
            return res.json()
        }).then((res)=>{
            setDocument(res)
        })
    },[messages])
    function getImages(imagID, images){
        if(image != undefined){
            const imageRetrived = images?.find((imag)=>{
                if(imag['_id'] === imagID) return imag;
             }) 
             return 'http://localhost:5000/images/'+imageRetrived['filename']
        }
    }
    function getDocuments(documentID, documents){
        if(document != undefined){
            const imageRetrived = documents?.find((doc)=>{
                if(doc['_id'] === documentID) return doc;
             }) 
             return imageRetrived['filename']
        }
    }
    function downloadDocument(filename){
        Axios({
            url: `http://localhost:5000/download/${filename}`,
            method: 'GET',
            responseType:"blob"
        }).then((res)=>{
            FileDownload(res.data, filename)
        })
    }
    return(
        <>
        {render!=true?"":
            <>
            {messages['messages'].map((item)=>{
                if(item['text']!=""){
                    if(item['type']==='text'){
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
                    }else if(item['type']==='image'){
                        if(item['senderID'] === sender){
                            return(
                            <div ref={lastMessage} className='messageContentSender' key={item['_id']}>
                                <div className="imageBoxMessages">
                                    <img className="imageMessage" src={getImages(item['text'], image)} alt="" />
                                    <p className="timeSender">{item['createdAt']}</p>
                                </div>
                            </div>)
                        }else{
                            return(
                            <div ref={lastMessage} className='messageContentReciver' key={item['_id']}>
                                <div className="imagexBoxMessagesReciver">   
                                    <img className="imageMessage" src={getImages(item['text'], image)} alt="" />
                                    <p className="timeSender">{item['createdAt']}</p>
                                </div>
                            </div>)
                        }
                    }else if(item['type']==='document'){
                        if(item['senderID'] === sender){
                            return(
                            <div ref={lastMessage} className='messageContentSender' key={item['_id']}>
                                <div className="imageBoxMessages">
                                    <button onClick={()=>{downloadDocument(getDocuments(item['text'], document))}} className="downloadButton">
                                        <DescriptionIcon/>
                                        {getDocuments(item['text'], document)}
                                        </button>
                                </div>
                            </div>)
                        }else{
                            return(<div ref={lastMessage} className='messageContentReciver'key={item['_id']}>
                                <div>
                                <button className="downloadButtonReciver">
                                        <DescriptionIcon/>
                                        {getDocuments(item['text'], document)}
                                        </button>
                                </div>
                            </div>)
                        }
                    }
                }
            })}
            </>
        }
        </>
    )
}
export default MessagesBox