import Cookies from 'js-cookie'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Home(){
    const navigate = useNavigate()
    useEffect(()=>{
        if(Cookies.get('user') == undefined){
            navigate('/')
        }
    })
    function refreshPage() {
        Cookies.remove('user')
        navigate('/')
    }
    window.addEventListener("beforeunload", () => 
    {  
        Cookies.remove('user')
    })
    return(
        <>
            <h1>Home</h1>
            <button onClick={refreshPage}>close</button>
        </>
    )
}
export default Home