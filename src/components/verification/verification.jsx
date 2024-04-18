import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import encryption from '../encryption/enryption';
import decrypt from '../decryption/decryption';
function Verification(){
    const navigate = useNavigate()
    let count = 0;
    const [error, setError] = useState('')
    const [code, setCode] = useState('')
    const [cookie, setCookie] = useState('')
    const [data, setData] = useState('')
    useEffect(()=>{
        count++;
        if(count <= 1){
            try{
                if(Cookies.get('verification',{path:'/'}) == undefined){
                    navigate('/login', { replace: true })
                }else{
                    const data = JSON.parse(decrypt(Cookies.get('verification', {path:'/'})));
                    setCookie(data)
                    fetch('http://localhost:5000/verification', {mode: 'cors', method:"POST", headers: {'Content-Type':'application/json'}, body:JSON.stringify({
                            "email": data['email'],
                        })}).then((res)=>{
                            return res.json()
                        }).then((res)=>{
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