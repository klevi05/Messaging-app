import decrypt from "../../decryption/decryption";
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
            <div onClick={()=>{setOpenConversation(list['chatData'])}} className='friendsBox'>
                <div className='picture'>
                    <img src={getImages(list, image)}/>
                </div>
                <div className='text'>
                    <p className='username'>{list['name']}</p>
                    <p className='lastMessage'>{decrypt(list['lastMessage'])}</p>
                </div>
            </div>:""}
            </>
        ))}
        </>
    )
}
export default Names