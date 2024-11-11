import Cookies from 'js-cookie'
import { useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import decrypt from '../decryption/decryption';
import Names from './items/names';
import Footer from '../footer/Footer';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';
import './home.css';
function Home() {
    //defining the navigation which will be used to navigate through pages
    const navigate = useNavigate()
    //dummy data 
    const users = [{"username": "klevi", "lastMessage": "Klevi"}, {'username':'erlisi', 'lastMessage': 'erlis'}]
    //this will be used to render the page or not
    const [render , setRender] = useState(false)
    //state for the search bar 
    const [search, setSearch] = useState('')
    //state for the messages text bar
    const [newMessage, setNewMessage] = useState('')
    const [image, setImage] = useState()
    //this will be used to store the data from the cookie 
    const [data, setData] = useState()
    useEffect(()=>{
        //validate if there is a cookie to enter this page
        if(Cookies.get('user',{path:'/'}) == undefined){
            navigate('/login', { replace: true })
        }else{
            setData(JSON.parse(decrypt(Cookies.get('user',{path:'/'}))))
            fetch('http://localhost:5000/get-image',{mode: 'cors', method:"POST", headers: {'Content-Type':'application/json'}, body:JSON.stringify({
                "id": JSON.parse(decrypt(Cookies.get('user',{path:'/'})))['image']
            })}).then((res)=>{
                return res.json()
            }).then((res)=>{
                setImage(res['image'])
                setRender(true)
            })
        }
    },[])
    //created function to send messages
    function sendMessage(){
        console.log(newMessage)
    }
    //created function to search for users
    function searching(){
        console.log(search)
    }
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
                            <InputBase
                                sx={{ ml: 1, flex: 1, color:'white'}}
                                placeholder="Search by username"
                                onChange={(e)=> setSearch(e.target.value)}
                                inputProps={{ 'aria-label': 'Search' }}
                            />
                            <IconButton onClick={searching} type="button" sx={{ p: '10px', color:'white' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </div>
                        <div className='list-name'>
                            {users.map((user)=>(
                                <Names name={user['username']} lastMessage={user['lastMessage']} image={image}/>
                            ))}
                        </div>
                    </div>
                    <div className='chat-page'>
                        <div className="firendName">
                            {data['name']}
                        </div>
                        <div className="messages">
                            messages
                        </div>
                        <div className='message-area'>
                            <InputBase
                                sx={{pl:2,color:'black', width: '95%', height:'100%'}}
                                placeholder="Type your message..."
                                onChange={(e)=> setNewMessage(e.target.value)}
                            />
                            <IconButton onClick={sendMessage}type="button" sx={{ p: '10px', color:'#3F3F3F' }} aria-label="search">
                                <SendIcon />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
            <Footer permition={data['position']}/>
            </div>
            }
        </>
    )
}
export default Home