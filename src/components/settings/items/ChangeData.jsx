import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import validator from 'validator'
import hashing from '../../hashing/hashing'
import Button from '@mui/material/Button';
function ChangeData({data}){
    const [email, setEmail] = useState('')
    const [alert, setAlert] = useState('')
    const [emailAlert, setEmailAlert] = useState('')
    const [passwordAlert, setPasswordAlert] = useState('')
    const [ oldPassword, setOldPassword] = useState('')
    const [ newPassword, setNewPassword] = useState('')
    const [visiblePassword, setVisiblePassword] = useState(false)
    const [visibleEmail, setVisibleEmail] = useState(false)
    function changeEmail(){
        if(email!=''){
            if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
                setEmailAlert("")
                fetch('http://localhost:5000/updateEmail',{mode: 'cors', method:"POST", headers: {'Content-Type':'application/json'}, body:JSON.stringify({
                    "id": data['_id'],
                    'email': email
                })}).then((res)=>{
                    if(res.status === 200){
                        setAlert(<Alert severity="success">Email changed succesfully!</Alert>)
                        setVisibleEmail(false)
                        setEmail("")
                    }else if(res.status === 201){
                        setAlert(<Alert severity="error">This email already exists!</Alert>)
                    }
                    setTimeout(() => {
                        setAlert("")
                    }, 1000);
                })
            }else{
                setEmailAlert(<Alert severity="error">Enter a valid email!</Alert>)
            }
        }
    }
    function changePassword(){
        if(newPassword!='' && oldPassword!=""){
            if(validator.isStrongPassword(newPassword, { 
                minLength: 8, minLowercase: 1, 
                minUppercase: 1, minNumbers: 1, minSymbols: 1 
            })){
                setPasswordAlert("")
                fetch('http://localhost:5000/updatePassword',{mode: 'cors', method:"POST", headers: {'Content-Type':'application/json'}, body:JSON.stringify({
                    "id": data['_id'],
                    'password': hashing(newPassword),
                    "oldPassword": oldPassword
                })}).then((res)=>{
                    if(res.status === 200){
                        setAlert(<Alert severity="success">Password changed succesfully!</Alert>)
                        setVisiblePassword(false)
                        setNewPassword("")
                        setOldPassword("")
                    }else if(res.status === 201){
                        setPasswordAlert(<Alert severity="error">The old passswords don't match!</Alert>)
                    }
                    setTimeout(() => {
                        setAlert("")
                    }, 2000);
                })
            }else{
                setPasswordAlert(<Alert severity="error">Password not strong enough!</Alert>)
            }
        }else{
            console.log('error')
        }
    }
    return(
        <>
            <div className='changeData'>
                <h2 className='title'> Change Data</h2>
                <br />
                <div>{alert}</div>
                <h5 className='changeEmailLabel' onClick={()=>{setVisibleEmail(true)}}>Change Email</h5>
                <div>{emailAlert}</div>
                {visibleEmail===true?
                    <div className='changeEmail'>
                    <TextField 
                    label="New Email" 
                    placeholder='New Email...'
                    variant="standard"
                    type='email'
                    required
                    onChange={(e)=> setEmail(e.target.value)}
                    sx={{
                        marginBottom: 2,
                    }}/> 
                    <Button
                    variant="outlined"
                    id='submit-button'
                    onClick={()=>{changeEmail(true)}}
                    type='submit'
                    sx={{
                    marginTop: 2,   
                }}>Change Email</Button>
                </div>:""}
                <br />
                <h5 className='changeEmailLabel' onClick={()=>{setVisiblePassword(true)}}>Change Password</h5>
                <div>{passwordAlert}</div>
                {visiblePassword===true?
                    <div className='changeEmail'>
                    <TextField 
                    label="Old Passsword" 
                    placeholder='Old Password...'
                    variant="standard"
                    type='password'
                    required
                    onChange={(e)=> setOldPassword(e.target.value)}
                    sx={{
                        marginBottom: 2,
                    }}/>
                    <TextField 
                    label="New Passsword" 
                    placeholder='New Password...'
                    variant="standard"
                    type='password'
                    required
                    onChange={(e)=> setNewPassword(e.target.value)}
                    sx={{
                        marginBottom: 2,
                    }}/>
                    <Button
                    variant="outlined"
                    id='submit-button'
                    onClick={changePassword}
                    type='submit'
                    sx={{
                    marginTop: 2,   
                }}>Change Password</Button>
                </div>:""}
            </div>
        </>
    )
}
export default ChangeData