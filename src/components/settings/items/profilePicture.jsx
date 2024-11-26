import { useState } from 'react';
import Button from '@mui/material/Button';
function ProfilePicture({data, image, setImage}){
    const [visible, setVisible] = useState(false)
    function converteToBase64(e){
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload =()=>{
            fetch('http://localhost:5000/updateProfilePicture',{mode: 'cors', method:"POST", headers: {'Content-Type':'application/json'}, body:JSON.stringify({
                "id": data['image'],
                'image': reader.result
            })}).then((res)=>{
                if(res.status === 200){
                    setImage(reader.result);
                    setVisible(false)
                }
            })
        }
    }
    return(
        <div className='profilePictureDiv'>
            <img style={{height:120,width:120}} src={image} alt="profilePicture" />
            <h3>{data['username']}</h3>
            <Button
                variant="outlined"
                id='submit-button'
                onClick={()=>{setVisible(true)}}
                type='submit'
                sx={{
                marginTop: 2,   
            }}>Change profile picture</Button>
            {visible===true?
            <div id='profile' className="input-group">
                <input onChange={converteToBase64} type="file" className="form-control" id="inputGroupFile01"/>
            </div>:""}
        </div>
    )
}
export default ProfilePicture