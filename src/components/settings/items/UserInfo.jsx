function UserInfo({data}){
    return(
        <div className='profileData'>
            <h1 className='title'>User Info</h1>
            <br />
            <h5>Name: {data['name']}</h5>
            <h5>Lastname: {data['lastname']}</h5>
            <h5>Email: {data['email']}</h5>
        </div>
    )
}
export default UserInfo