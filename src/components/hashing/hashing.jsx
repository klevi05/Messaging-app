import bcrypt from 'bcryptjs'

function hashing(arg){
    const encryption = bcrypt.hashSync(arg, parseInt(import.meta.env.VITE_SALT))
    return encryption

}
export default hashing