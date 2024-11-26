import Button from '@mui/material/Button';
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import decrypt from '../decryption/decryption';
import Footer from '../footer/Footer';
import CircularProgress from '@mui/material/CircularProgress';
import ProfilePicture from './items/profilePicture';
import UserInfo from './items/UserInfo';
import ChangeData from './items/ChangeData';
import './settings.css'
function Settings(){
    const navigate = useNavigate()
    const [data, setData] = useState("")
    const [render, setRender] = useState(false)
    const [image, setImage] = useState()
    
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
    
    function exit(){
        Cookies.remove('user',{path:'/'})
        window.location.reload(false);
    }
    return(
        <>
         {render===false?
             <div className='loadingScreen'>
                <CircularProgress size="10rem" />
            </div>
            :
            <>
            <div className='setting-page'>
            <div className='setting-page-box'>
                <div className='profilePicture'>
                    <ProfilePicture data={data} image={image} setImage={setImage}/>
                </div>
                <div className='userData'></div>
                <div>
                    <UserInfo data={data}/>
                    <br />
                    <ChangeData data={data}/>
                    <div className='logoutButton'>
                        <Button
                            variant="outlined"
                            onClick={exit}
                            id='submit-button'
                            type='submit'
                            sx={{
                            marginTop: 2,   
                        }}>Log out</Button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <Footer permition={data['position']}/>
        </div>
            </>
        }
        </>
    )
}
export default Settings