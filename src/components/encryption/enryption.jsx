import * as CryptoJS from 'crypto-js'
//encrypting data that I will be needed to send to the database or insert in the cookies
function encryption(args){
    const secretKey = import.meta.env.VITE_REACT_APP_SECRET_KEY
    const cipherText = CryptoJS.AES.encrypt(args, secretKey).toString()
    return cipherText
}
export default encryption