import Cookies from 'js-cookie'
import { useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import encryption from '../encryption/enryption';
import decrypt from '../decryption/decryption';
import Names from './names';
import './home.css';
function Home() {
    const navigate = useNavigate()
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
    if(render === true){
        return(
            <>
            <div className="upper">
                <div className='chating-page'>
                    <div className='chat-names'>
                        <div className='searchBar'>
                            SearchBar
                        </div>
                        <div className='list-name'>
                            <Names name={data['name']}/>
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
                            messages
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
                hello
            </div>
            </>
        )
    }
}
export default Home