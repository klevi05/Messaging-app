import Footer from "../footer/Footer"
import Cookies from 'js-cookie'
import decrypt from '../decryption/decryption';
import TaskButton from "./items/createTaskt";
import Alert from '@mui/material/Alert';
import './task.css';
import { useEffect, useState } from "react";
import TaskBox from "./items/taskBox";

function Task(){//the route to create tasks
    //setting up the states for the page
    const [data, setData] = useState()
    const [render, setRender] = useState(false)
    const [tasks, setTasks] = useState("")
    const [alert, setAlert] = useState()
    //useEffect to store the cookie data
    useEffect(()=>{
        if(Cookies.get('user',{path:'/'}) === undefined){
            navigate('/login', { replace: true })
        }else{
            setData(JSON.parse(decrypt(Cookies.get('user',{path:'/'}))))
        }
    },[])
    //useEffect to get all the tasks form the database
    useEffect(()=>{
        fetch('http://localhost:5000/retriveTask',{mode: 'cors', method:"POST", headers: {'Content-Type':'application/json'}, body:JSON.stringify({
            "company": JSON.parse(decrypt(Cookies.get('user',{path:'/'})))['company'],
        })}).then((res)=>{
            if(res.status === 201){
                setTasks("")
                setAlert(<Alert severity="success">THERE IS NO NEW TASK!</Alert>)
                setRender(true)
            }else{
                return res.json()
            }
        }).then((res)=>{
            if(res!= undefined){
                setTasks(res['task'])
                setRender(true)
            }else{
                setTasks("")
            }
        })
    },[tasks])
    return(
        <>
        {
            render!=false? <>
            {tasks===""?<div>
                <div className="task-page">
                 <div className="task-view">
                     <h1 className="taskPageTitle">Task Page</h1>
                     {data['position']==="Worker" ? 
                     <div><Alert severity="info">If there is no sticky-note underneath, it means you are all in with your tasks.</Alert></div>:
                         <TaskButton data={data}/>
                     }
                 </div>
             </div>
             <div>
                 <Footer permition={data['position']} />
             </div>
            </div>:
             <>
             <div className="task-page">
                 <div className="task-view">
                     <h1 className="taskPageTitle">Task Page</h1>
                     {data['position']==="Worker" ? 
                     <div><Alert severity="info">If there is no sticky-note underneath, it means you are all in with your tasks.</Alert></div>:
                         <TaskButton data={data}/>
                     }
                     
                     <div>{alert}</div>
                     <div className="task-list">
                         <TaskBox tasks={tasks.sort((a,b)=> a['status'].localeCompare(b['status']))} data={data} setAlert={setAlert}/>
                     </div>
                 </div>
             </div>
             <div>
                 <Footer permition={data['position']} />
             </div>
         </>
            }
            </>: <div></div>
        }
        </>
    )
}
export default Task