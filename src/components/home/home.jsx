import Cookies from 'js-cookie'
import { useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import encryption from '../encryption/enryption';
import decrypt from '../decryption/decryption';
import Names from './items/names';
import Footer from './items/Footer';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import './home.css';
function Home() {
    const navigate = useNavigate()
    const users = [{"username": "klevi", "lastMessage": "Klevi"}, {'username':'erlisi', 'lastMessage': 'erlis'}]
    const [render , setRender] = useState(false)
    const [data, setData] = useState()
    useEffect(()=>{
        if(Cookies.get('user',{path:'/'}) == undefined){
            console.log(encryption("hello"))
            navigate('/login', { replace: true })
        }else{
            setData(JSON.parse(decrypt(Cookies.get('user',{path:'/'}))))
            setRender(true)
        }
    },[])
    function handleSearch(e){
        console.log(e.target.value)
    }
    if(render === true){
        return(
            <div className='home-page'>
            <div className="upper">
                <div className='chating-page'>
                    <div className='chat-names'>
                        <div className='searchBar'>
                            <InputBase
                                sx={{ ml: 1, flex: 1, color:'white'}}
                                placeholder="Search by username"
                                onChange={(e)=> handleSearch(e)}
                                inputProps={{ 'aria-label': 'Search' }}
                            />
                            <IconButton type="button" sx={{ p: '10px', color:'white' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </div>
                        <div className='list-name'>
                            {users.map((user)=>(
                                <Names name={user['username']} lastMessage={user['lastMessage']}/>
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
                            />
                            <IconButton type="button" sx={{ p: '10px', color:'#3F3F3F' }} aria-label="search">
                                <SendIcon />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
            </div>
        )
    }
}
export default Home