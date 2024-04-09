import {useState, useEffect} from 'react';
import Cookies from 'js-cookie'
import { useNavigate, Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import './login.css'
//login function
function Login(){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [error, setError] = useState('')
    const [IPAddress, setIPAddress] = useState('')
    const navigate= useNavigate()
    useEffect(() => {
        fetch('https://api.ipify.org?format=json')
          .then(response => response.json())
          .then(data =>{
             setIPAddress(data.ip)
            })
          .catch(error => console.log(error))
      }, []);
    function handleSubmit(e){
        e.preventDefault();
        if(username, password != ''){
                fetch('http://localhost:5000/signin', {mode: 'cors'})
                .then((res) => {
                    res.json()
                }).then((res)=> {
                    console.log(IPAddress)
                    Cookies.set('user','Hello')
                    navigate('/home')
                })
        }else{
            setError(<Alert severity="warning">Please fill all the fields!</Alert>)
        }
    }
    return(
        <>
            <div className='logIn'>
                <div className='form-box' >
                    <div className='form'>
                        <h2 className='login-title'>Log In</h2>
                        {error} 
                        <TextField 
                        id="username" 
                        label="Username" 
                        variant="standard"
                        required
                        onChange={(e)=> setUsername(e.target.value)}
                        sx={{
                            marginBottom: 2,
                        }}
                        />
                        <TextField 
                        id="password" 
                        label="Password" 
                        type='password'
                        variant="standard"
                        required
                        onChange={(e)=> setPassword(e.target.value)}
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
                        <p>If you don't have an accont <Link to={'/signup'}>create one</Link></p>
                    </div>
                </div>
            </div>
        </>
        
    )
}
export default Login