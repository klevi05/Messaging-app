import Cookies from 'js-cookie'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Home(){
    const navigate = useNavigate()
    useEffect(()=>{
        if(Cookies.get('user',{path:'/home'}) == undefined){
            navigate('/')
        }
    })
    function close(){
        Cookies.remove('user',{path:'/home'})
        navigate('/')
    }
    return(
        <>
            <h1>Home</h1>
            <button onClick={close}>close</button>
        </>
    )
}
export default Home