import Cookies from 'js-cookie'
import { useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import decrypt from '../decryption/decryption';
import Names from './items/names';
import Footer from '../footer/Footer';
import CircularProgress from '@mui/material/CircularProgress';
import './home.css';
import Search from './items/search';
import Messaging from './items/messaging';
function Home() {
    //defining the navigation which will be used to navigate through pages
    const navigate = useNavigate()
    //this will be used to render the page or not
    const [render , setRender] = useState(false)
    //state for storing the messges 
    const [image, setImage] = useState()
    //this will be used to store the data from the cookie 
    const [data, setData] = useState()
    //state to save the conversation that is open
    let [openConversation, setOpenConversation] = useState()
    //state to get the list of chats a user has
    const [chatList, setChatList] = useState()
    //state to indicate any errors
    const [alert, setAlert] = useState()
    useEffect(()=>{
        //validate if there is a cookie to enter this page
        if(Cookies.get('user',{path:'/'}) === undefined){
            navigate('/login', { replace: true })
        }else{
            setData(JSON.parse(decrypt(Cookies.get('user',{path:'/'}))))
            fetch('http://localhost:5000/selectChat',{mode: 'cors', method:"POST", headers: {'Content-Type':'application/json'}, body:JSON.stringify({
                "company": JSON.parse(decrypt(Cookies.get('user',{path:'/'})))['company'],
                "senderID": JSON.parse(decrypt(Cookies.get('user',{path:'/'})))['_id']
            })}).then((res)=>{
                return res.json()
            }).then((res)=>{
                console.log(res)
                setChatList(res)
            })
        }
    },[chatList])
    useEffect(()=>{
        fetch('http://localhost:5000/get-images',{mode: 'cors', method:"POST", headers: {'Content-Type':'application/json'}, body:JSON.stringify({
            "company": JSON.parse(decrypt(Cookies.get('user',{path:'/'})))['company']
        })}).then((res)=>{
            return res.json()
        }).then((res)=>{
            setImage(res)
            setRender(true)
            console.log("u hap")
        })
    },[])
    return(
        <>
        {render!=true?<div className='loadingScreen'>
                <CircularProgress size="10rem" />
            </div>:
            <div className='home-page'>
            <div className="upper">
                <div className='chating-page'>
                    <div className='chat-names'>
                        <div className='searchBar'>
                            <Search setAlert={setAlert} setOpenConversation={setOpenConversation} company={data["company"]} id={data["_id"]} username={data['username']}/>
                        </div>
                        <div className='list-name'>
                            <Names chatList={chatList} image={image} setOpenConversation={setOpenConversation}/>
                        </div>
                    </div>
                    {openConversation===undefined?<div className='waiting'>
                            {alert}
                        </div>:<Messaging image={image} data={data} openConversation={openConversation} chatList={chatList}/>}
                    
                </div>
            </div>
            <Footer permition={data['position']}/>
            </div>
            }
        </>
    )
}
export default Home