import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import validator from 'validator'
import hashing from '../hashing/hashing';
import './signin.css';
function Signin(){
    //setting state variables
    const [name, setName] = useState('')    
    const [lastname, setLastname] = useState('')
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [IPAddress, setIPAddress] = useState('')
    //initializing useNavigate
    const navigate= useNavigate()
    //fetch to find the api of the device
    useEffect(() => {
        fetch('https://api.ipify.org?format=json')
          .then(response => response.json())
          .then(data =>{
            setIPAddress(String(data.ip))
            })
          .catch(error => console.log(error))
      }, []);
    //envent handle for submiting the data of the signin form
    function  handleSubmit(e){
        e.preventDefault();
        if(name, lastname,username, password, email != ''){
            //validating the email
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
                setError(<Alert severity="warning">Please enter a valid email!</Alert>)
            }else{
                if(validator.isStrongPassword(password, { 
                    minLength: 8, minLowercase: 1, 
                    minUppercase: 1, minNumbers: 1, minSymbols: 1 
                })){ //hashing sensitive data
                    const id = hashing(username)
                    const passwordHash = hashing(password)
                    //fetch the data to the backend to save them 
                    fetch(import.meta.env.VITE_SIGNIN, {mode: 'cors', method:"POST", headers:{'Content-Type':'application/json'}, body: JSON.stringify({
                        "_id": id,
                        "name": name,
                        "lastname": lastname,
                        "email": email,
                        "username": username,
                        "password": passwordHash,
                        "ip": [
                            {
                                "ip_adress": IPAddress
                            }
                        ],
                        "messages": []
                    })})
                    .then((res) => {
                        if(res.status === 200){
                            if (res.status  !== 404){
                                navigate('/login')
                            }else{
                                console.log('problem with the server')
                            }
                        }else if(res.status === 401){
                            setError(<Alert severity="warning">Username already exists!</Alert>)
                        }else if(res.status === 402){
                            setError(<Alert severity="warning">Email already used!</Alert>)
                        }
                    }).catch(error=>{
                        console.log(error)
                    })
            }else{
                setError(<Alert severity="warning">The password is not strong enough!</Alert>)
            }
            }
        }else{
            setError(<Alert severity="warning">Please fill all your fields!</Alert>)
        }
    }
    return(
        <>
            <div className='logIn'>
                <div className='form-box' >
                    <div className='form'>
                        <h2 className='login-title'>SignUp</h2>
                        {error}
                        <TextField 
                        id="name-signup" 
                        label="Name" 
                        variant="standard"
                        required
                        onChange={(e)=> setName(e.target.value)}
                        sx={{
                            marginBottom: 2,
                        }}
                        />
                        <TextField 
                        id="lastname-signup" 
                        label="Lastname" 
                        variant="standard"
                        required
                        onChange={(e)=> setLastname(e.target.value)}
                        sx={{
                            marginBottom: 2,
                        }}
                        /> 
                        <TextField 
                        id="username-signup" 
                        label="Username" 
                        variant="standard"
                        required
                        onChange={(e)=> setUsername(e.target.value)}
                        sx={{
                            marginBottom: 2,
                        }}
                        />
                        <TextField 
                        id="email-signup" 
                        label="Email" 
                        variant="standard"
                        type='email'
                        required
                        onChange={(e)=> setEmail(e.target.value)}
                        sx={{
                            marginBottom: 2,
                        }}
                        />
                        <TextField 
                        id="password-signup" 
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
                         id='submit-button-signUp'
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
export default Signin