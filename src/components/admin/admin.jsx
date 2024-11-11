import decrypt from '../decryption/decryption';
import Cookies from 'js-cookie'
import Footer from "../footer/Footer";
import { useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';
import './admin.css'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
function Admin(){
    const navigate = useNavigate()
    const [data, setData] = useState()
    const [role, setRole] = useState("")
    const [email, setEmail] = useState("")
    const [userData , setUserData] = useState()
    const [render , setRender] = useState(false)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(()=>{
        //validate if there is a cookie to enter this page
        if(Cookies.get('user',{path:'/'}) == undefined){
            navigate('/', { replace: true })
        }else{
            const dataCookie = JSON.parse(decrypt(Cookies.get('user',{path:'/'})));
            fetch('http://localhost:5000/get-users',{mode: 'cors', method:"POST", headers: {'Content-Type':'application/json'}, body:JSON.stringify({
                "company": dataCookie['company']
            })}).then((res)=>{
                return res.json()
            }).then((res)=>{
                setData(dataCookie)
                setUserData(res)
                setRender(true)
            })
        }
    },[])
    function sendEmailToUser(e){
        e.preventDefault();
        fetch('http://localhost:5000/add-users',{mode: 'cors', method:"POST", headers:{'Content-Type':'application/json'},body:JSON.stringify({
            "email": email,
            "role": role,
            'company': data['company'],
            "senderEmail": data['email']
        })}).then((res)=>{
            return res.json()
        }).then((res)=>{
            console.log(res)
        })
    }
        return(
            <>
            {render!=true?<div className='loadingScreen'>
                <CircularProgress size="10rem" />
            </div>:<div>
                <div className='admin-page'>
                    <div className='admin-window'>
                        <div className='people-listing'>
                        <Button style={{backgroundColor:'green'}} className='newUSer' variant='contained' onClick={handleOpen}>Add User</Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                        <Box sx={style}>
                            <div className='formpopup'>
                                <div>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Sign up a user
                                    </Typography>
                                    <TextField 
                                    id="name-signup" 
                                    label="Email" 
                                    variant="standard"
                                    required
                                    onChange={(e)=> setEmail(e.target.value)}
                                    sx={{
                                        marginBottom: 2,
                                    }}
                                    />
                                    <br />
                                    <FormControl fullWidth >
                                        <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={role}
                                        label="Role"
                                        onChange={(e)=>{setRole(e.target.value)}}
                                        >
                                        <MenuItem value={"Admin"}>Admin</MenuItem>
                                        <MenuItem value={"Manager"}>Menager</MenuItem>
                                        <MenuItem value={"Worker"}>Worker</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <br />
                                    <Button
                                    variant="contained"
                                    style={{backgroundColor:"green", color:"white"}}
                                    onClick={sendEmailToUser}
                                    id='submit-button-signUp'
                                    type='submit'
                                    sx={{
                                        marginTop: 2,
                                        
                                    }}>Send Email</Button>
                                </div>
                            </div>
                            </Box>
                        </Modal>
                        </div>
                        <div className='people-acount-list'>
                            {
                                userData.map(item=>(
                                    <div className='boxListing'>
                                         <p>{item['name']}</p>
                                    </div>
                                ))
                                            
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <Footer permition={data['position']}/>
                </div>
            </div> }
            </>
        )  
}

export default Admin;