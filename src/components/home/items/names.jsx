import Background from '../../../assets/background.webp';

function Names({name, lastMessage}){
    return(
        <>
        <div className='friendsBox'>
            <div className='picture'>
                <img src={Background} alt="" />
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