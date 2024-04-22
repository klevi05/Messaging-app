import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import encryption from '../encryption/enryption';
import decrypt from '../decryption/decryption';
import findIp from '../findIp/findIp'
function Verification(){
    const navigate = useNavigate()
    let count = 0;
    //state for the errors
    const [error, setError] = useState('')
    //state for the code from the input
    const [code, setCode] = useState('')
    //state for the data from the cookie 
    const [cookie, setCookie] = useState('')
    //state for the data from the response of the api
    const [data, setData] = useState('')
    //state for the IP adress
    const [IPAddress, setIPAddress] = useState('')
    useEffect(()=>{
        count++;
        if(count <= 1){
            try{
                //check if the cookie is set
                if(Cookies.get('verification',{path:'/'}) == undefined){
                    navigate('/login', { replace: true })
                }else{
                    //get the data from the cookie
                    const data = JSON.parse(decrypt(Cookies.get('verification', {path:'/'})));
                    //set the cookie state with the data from the cookie 
                    setCookie(data)
                    findIp(setIPAddress);
                    //fetch to the backend to send the email
                    fetch('http://localhost:5000/verification', {mode: 'cors', method:"POST", headers: {'Content-Type':'application/json'}, body:JSON.stringify({
                            "email": data['email'],
                        })}).then((res)=>{
                            return res.json()
                        }).then((res)=>{
                            //set the response to the data state
                            setData(res)
                        })
                    console.log('succes')
                }
            }catch(error){
                console.log(error)
            }
        }
    },[]);
    function handleSubmit(e){
        e.preventDefault()
        fetch('http://localhost:5000/addIP',{mode: 'cors', method:"POST", headers: {'Content-Type':'application/json'}, body:JSON.stringify({
            "username": cookie['username'],
            "ip": encryption(IPAddress)
        })}).then((res)=>{
            if(res.status === 200){
                if(data['code'] === parseInt(code)){
                    Cookies.set('user', encryption(JSON.stringify(cookie)), {
                        expires: 1,
                        secure: true,
                        sameSite: 'strict',
                        path: '/'
                    })
                    Cookies.remove('verification',{path:'/'})
                    count = 0
                    navigate('/', { replace: true })
                }else{
                    console.log('error')
                    setError(<Alert severity="warning">The code is not right!</Alert>)
                }
            }
        })
    }
    return(
        <>
            <div className='logIn'>
                <div className='form-box' >
                    <div className='form'>
                        <h2 className='login-title'>Verify your device</h2>
                        {error}
                        <TextField 
                        id="username" 
                        label="Code send in email" 
                        type='number'
                        variant="standard"
                        required
                        onChange={(e)=> setCode(e.target.value)}
                        sx={{
                            marginBottom: 2,
                        }}
                        />
                        <Button
                         variant="outlined"
                         onClick={handleSubmit}
                         id='submit-button'
                         type='submit'
                         sx={{
                            marginTop: 2,
                            
                        }}>Submit</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Verification