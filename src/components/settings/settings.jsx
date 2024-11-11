import Button from '@mui/material/Button';
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import decrypt from '../decryption/decryption';
import Footer from '../footer/Footer';
import './settings.css'
function Settings(){
    const navigate = useNavigate()
    const [data, setData] = useState("")
    useEffect(()=>{
        //validate if there is a cookie to enter this page
        if(Cookies.get('user',{path:'/'}) == undefined){
            navigate('/login', { replace: true })
        }else{
            setData(JSON.parse(decrypt(Cookies.get('user',{path:'/'}))))
        }
    },[])
    function exit(){
        Cookies.remove('user',{path:'/'})
        window.location.reload(false);
    }
    return(
        <>
        <div className='setting-page'>
        <Button
        variant="outlined"
        onClick={exit}
        id='submit-button'
        type='submit'
        sx={{
        marginTop: 2,
            
        }}>Log out</Button>
        </div>
        <div>
            <Footer permition={data['position']}/>
        </div>
        </>
    )
}
export default Settings