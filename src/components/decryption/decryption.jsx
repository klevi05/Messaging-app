import * as CryptoJS from 'crypto-js';
//function used for decrypting informations send from the database or the cookies
function decrypt(args){
    const bytes = CryptoJS.AES.decrypt(args, import.meta.env.VITE_REACT_APP_SECRET_KEY )
    const plainText = bytes.toString(CryptoJS.enc.Utf8)
    return plainText
}
export default decrypt