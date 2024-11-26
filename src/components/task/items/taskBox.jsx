import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
function TaskBox({tasks, data, setAlert}){
    let tasking = {}
    const[render , setRender] = useState(false)
    function handleCompletation(){
        try {
            console.log(tasking)
            fetch('http://localhost:5000/completeTask',{mode: 'cors', method:"POST", headers: {'Content-Type':'application/json'}, body:JSON.stringify({
                "company": data['company'],
                "id": tasking['_id'],
                "username": data['username']
            })}).then((res)=>{
                if(res.status === 200){
                    setAlert(<Alert severity="success">TASK WITH TITLE: {tasking['title']} IS MARKET AS COMPLETED!</Alert>)
                }else{
                    setAlert(<Alert severity="error">TASK WITH TITLE: {tasking['title']} DOES NOT EXIST!</Alert>)
                }
            })
            setTimeout(() => {
                setAlert("")
            }, 2000);
        } catch (error) {
            console.log(error)
        }
    }
    function handleDelete(){
        try {
            console.log(tasking)
            fetch('http://localhost:5000/removeTask',{mode: 'cors', method:"POST", headers: {'Content-Type':'application/json'}, body:JSON.stringify({
                "company": data['company'],
                "id": tasking['_id'],
            })}).then((res)=>{
                if(res.status === 200){
                    setAlert(<Alert severity="success">TASK WITH TITLE: {tasking['title']} IS SUCCESFULLY DELETED!</Alert>)
                }else{
                    setAlert(<Alert severity="error">TASK WITH TITLE: {tasking['title']} DOES NOT EXIST!</Alert>)
                }
            })
            setTimeout(() => {
                setAlert("")
            }, 2000);
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <>
        {tasks.map(task =>{
            return(
                <>
            {data['position']==="Worker"? <>
                {task['status']==="available"?<div className={`task-box ${task['status']==="available"? "available": "completed"}`}>
                <div className="titleTaskBox">
                    <h2>{task['title']}</h2>
                </div>
                <div className="descriptionTaskBox">
                    <p>{task['description']}</p>
                </div>
                <div className="creatorTaskBox">
                    {task['completedBy']==="" ? <p className="creatorNameAvailable">{task['creator']}</p>: <p className='creatorName'>{`Completed by ${task['completedBy']}`}</p>}
                    <p className='timeTaskBox'>{task['createdAt']}</p>
                </div>
                <div className="buttonsTaskBox">
                {task['status']==="available"?
                <Button onClick={()=>{tasking= task;handleCompletation()}} variant="contained" color="error">
                     Mark as Complete
                </Button>: 
                <Button onClick={()=>{tasking= task;handleDelete()}} variant="contained" color="error">
                    DELETE THE TASK
                </Button>} 
                </div>
            </div>:""}
            </> : <div className={`task-box ${task['status']==="available"? "available": "completed"}`}>
                <div className="titleTaskBox">
                    <h2>{task['title']}</h2>
                </div>
                <div className="descriptionTaskBox">
                    <p>{task['description']}</p>
                </div>
                <div className="creatorTaskBox">
                    {task['completedBy']==="" ? <p className="creatorNameAvailable">{task['creator']}</p>: <p className='creatorName'>{`Completed by ${task['completedBy']}`}</p>}
                    <p className='timeTaskBox'>{task['createdAt']}</p>
                </div>
                <div className="buttonsTaskBox">
                {task['status']==="available"?
                <Button onClick={()=>{tasking= task;handleCompletation()}} variant="contained" color="error">
                     Mark as Complete
                </Button>: 
                <Button onClick={()=>{tasking= task;handleDelete()}} variant="contained" color="error">
                    Delete the task
                </Button>} 
                </div>
            </div>}
            </>)    
        })}
        
        </>
    )
}
export default TaskBox