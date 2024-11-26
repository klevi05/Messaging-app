import decrypt from "../../decryption/decryption";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DescriptionIcon from '@mui/icons-material/Description';
function Names({chatList,image, setOpenConversation}){
    function getImages(item, imag){
        if(imag != undefined){
            const imageRetrived = imag?.find((image)=>{
                if(image['_id'] === item['image']) return image["image"];
             })
             return imageRetrived['image']
        }
    }
    return(
        <>
        {chatList.map(list => (
            <>
            {list['lastMessage']!=""?
            <>
            <div onClick={()=>{setOpenConversation(list['chatData'])}} className='friendsBox'>
                <div className='picture'>
                    <img src={getImages(list, image)}/>
                </div>
                <div className='text'>
                    <p className='username'>{list['name']}</p>
                    {list['lastMessage']['type']==='text'?
                        <p className='lastMessage'>{decrypt(list['lastMessage']['text'])}</p>:
                        <>
                        {list['lastMessage']['type']==='image'?
                            <>
                            <p className="lastMessage">{<CameraAltIcon/>} Image</p>
                            </>:
                            <>
                            {list['lastMessage']['type']==='document'?
                            <p className="lastMessage">{<DescriptionIcon/>} Document</p>:
                             ""
                            }
                            </>
                        }
                        </>
                    }
                </div>
            </div>
            </>:""}
            </>
        ))}
        </>
    )
}
export default Names