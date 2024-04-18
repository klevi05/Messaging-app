import * as CryptoJS from 'crypto-js'
function encryption(args){
    const secretKey = import.meta.env.VITE_REACT_APP_SECRET_KEY
    const cipherText = CryptoJS.AES.encrypt(args, secretKey).toString()
    return cipherText
}
export default encryption