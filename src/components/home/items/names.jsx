import Background from '../../../assets/background.webp';

function Names({name, lastMessage,image}){
    return(
        <>
        <div className='friendsBox'>
            <div className='picture'>
                <img src={image} alt="" />
            </div>
            <div className='text'>
                <p className='username'>{name}</p>
                <p className='lastMessage'>{lastMessage}</p>
            </div>
        </div>
        </>
    )
}
export default Names