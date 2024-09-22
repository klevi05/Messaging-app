import bcrypt from 'bcryptjs'
//function used to hash the data that will be used to enter the database or be send with cookies
function hashing(arg){
    const encryption = bcrypt.hashSync(arg, parseInt(import.meta.env.VITE_SALT))
    return encryption

}
export default hashing