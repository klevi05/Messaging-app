import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
function Names({name}){
    const navigate = useNavigate()
    function close(){
        Cookies.remove('user',{path:'/'})
        navigate('/login', { replace: true })
    }
    return(
        <>
            <p>{name}</p>
            <button onClick={close}>close</button>
        </>
    )
}
export default Names