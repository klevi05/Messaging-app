import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
function Search({company,setOpenConversation, id, setAlert, username}){
    const [search, setSearch] = useState('')
    function findUser(e){
        e.preventDefault();
        if(search!= username){
            fetch('http://localhost:5000/newChatCreator',{mode: 'cors', method:"POST", headers: {'Content-Type':'application/json'}, body:JSON.stringify({
                "company": company,
                "username": search,
                "senderID": id
            })}).then((res)=>{
                if(res.status === 404){
                    setAlert(<Alert severity="error">There is no acount under this name</Alert>)
                }else{
                    setAlert('')
                    setSearch("")
                    return res.json()
                }
            }).then((res)=>{
                setOpenConversation(res)
            })
        }else{
            setAlert(<Alert severity="error">You cant open a conversation with yourself!</Alert>)
        }
    }
    return(
        <>
        <div className='searchBar'>
            <InputBase
                sx={{ ml: 1, flex: 1, color:'white'}}
                placeholder="Search by username"
                value={search}
                onChange={(e)=> setSearch(e.target.value)}
                inputProps={{ 'aria-label': 'Search' }}
            />
            <IconButton onClick={findUser} type='button' sx={{ p: '10px', color:'white' }} aria-label="search">
                <SearchIcon sx={{color:'whitesmoke'}}/>
            </IconButton>
        </div>
        </>
    )
}
export default Search