import {useState} from 'react';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './login.css'
//login function
function Login(){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const navigate= useNavigate()
    function handleSubmit(e){
        e.preventDefault();
        Cookies.set('user','Hello')
        navigate('/home')
    }
    return(
        <>
            <div className='logIn'>
                <div className='form-box' >
                    <div className='form'>
                        <h1 className='login-title'>Log In</h1>
                        <TextField 
                        id="username" 
                        label="Username" 
                        variant="standard"
                        onChange={(e)=> setUsername(e.target.value)}
                        sx={{
                            marginBottom: 2,
                        }}
                        />
                        <br />
                        <TextField 
                        id="password" 
                        label="Password" 
                        type='password'
                        variant="standard"
                        onChange={(e)=> setPassword(e.target.value)}
                        sx={{
                            marginBottom: 2,
                        }}
                        />
                        <br />
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
export default Login