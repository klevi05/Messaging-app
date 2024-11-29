import {useState, useEffect} from 'react';
import Cookies from 'js-cookie'
import { useNavigate, Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import encryption from '../encryption/enryption';
import decrypt from '../decryption/decryption';
import findIp from '../findIp/findIp'
import './login.css'
//login function
function Login(){
    //setting up all the states for the page
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [error, setError] = useState('')
    const [IPAddress, setIPAddress] = useState('')
    const navigate= useNavigate()
    //finding the ip of the device that is loging in
    useEffect(() => {
        if(Cookies.get('user',{path:'/'}) == undefined){
            findIp(setIPAddress);
        }else{
            navigate('/', { replace: true });
        }
      }, []);
    //event handler when the submit button is pressed
    function handleSubmit(e){
        e.preventDefault();
        if(username, password != ''){
                const loginUsername = username.split("/")
                fetch('http://localhost:5000/login/', {mode: 'cors', method:"POST", headers: {'Content-Type':'application/json'}, body:JSON.stringify({
                    "company" : loginUsername[0],
                    "username": loginUsername[1],
                    "password": password
                })})
                .then((res) => {
                    if(res.status === 401){
                        setError(<Alert severity="warning">The password is incorrect!</Alert>);
                        return res == '';
                    }else if(res.status === 402){
                        setError(<Alert severity="warning">This acount does not exist!</Alert>)
                    }else{
                        return res.json();
                    }
                }).then((res)=>{
                    if(res != ''){
                        let exist = false;
                        for (let i of res.ip)  {
                            if((decrypt(i['ip_adress'])===IPAddress)==true){
                                exist = true;
                            }
                        }
                        if( exist === false){
                            Cookies.set('verification', encryption(JSON.stringify(res, IPAddress)), {
                                expires: 1,
                                secure: true,
                                sameSite: 'strict',
                                path: '/'
                            });
                            navigate('/verification', {replace:true});
                        }else{
                            Cookies.set('user', encryption(JSON.stringify(res)), {
                                expires: 1,
                                secure: true,
                                sameSite: 'strict',
                                path: '/'
                            });
                            navigate('/', { replace: true });
                        }
                    }else{
                        console.log('empty response');
                    }
                })
        }else{
            setError(<Alert severity="warning">Please fill all the fields!</Alert>);
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
                        label="company/Username" 
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