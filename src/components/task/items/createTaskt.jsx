import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
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
function TaskButton({data}){
    const [title, setTitle] = useState()
    const [subject, setSubject] = useState()
    const [alert, setAlert] = useState()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    function handleCreateTask(){
        fetch('http://localhost:5000/createTask',{mode: 'cors', method:"POST", headers: {'Content-Type':'application/json'}, body:JSON.stringify({
            "company": data['company'],
            "title": title,
            "description": subject,
            "creator": data['username']
        })}).then((res)=>{
            if(res.status === 200){
                setAlert(<Alert severity="success">Task succesfully created!</Alert>)
            }
            return res.json()
        })
        setTimeout(() => {
            setAlert('')
            setTitle('')
            setSubject('')
            handleClose()
            window.location.reload(true)
        }, 1000);
    }
    return(
        <div className="create-task">
    <Button style={{backgroundColor:'green'}} className='newUSer' variant='contained' onClick={handleOpen}>Create Task</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <div className='formpopup'>
                <div className='formpopup'>
                    <div>{alert}</div>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create a Task
                    </Typography>
                    <TextField 
                    id="name-signup" 
                    label="Title" 
                    variant="standard"
                    type='text'
                    required
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
                    sx={{
                        marginBottom: 2,
                    }}
                    />
                    <br />
                    <TextField
                    id="filled-multiline-static"
                    label="Context"
                    multiline
                    required
                    rows={4}
                    variant="standard"
                    value={subject}
                    onChange={(e)=> setSubject(e.target.value)}
                    sx={{
                        marginBottom: 2,
                        width: 200
                    }}
                    />
                    <br />
                    <Button
                    variant="contained"
                    style={{backgroundColor:"green", color:"white"}}
                    onClick={handleCreateTask}
                    id='submit-button-signUp'
                    type='submit'
                    sx={{
                        marginTop: 2,
                        
                    }}>Create Task</Button>
                </div>
            </div>
            </Box>
        </Modal>
    </div>
    )
}
export default TaskButton