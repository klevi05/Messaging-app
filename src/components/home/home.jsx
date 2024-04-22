import Cookies from 'js-cookie'
import { useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import encryption from '../encryption/enryption';
import decrypt from '../decryption/decryption';
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
    function close(){
        Cookies.remove('user',{path:'/'})
        navigate('/login', { replace: true })
    }
    if(render === true){
        return(
            <>
                <div className='chating-page'>
                    <div className='chat-names'>
                        <h1>{data['name']}</h1>
                        <button onClick={close}>close</button>
                    </div>
                    <div className='chat-page'>
                        <h1>Chatt</h1>
                    </div>
                </div>
            </>
        )
    }
}
export default Home