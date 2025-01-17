import { randomBytes, createCipheriv, createDecipheriv } from "crypto";  
import { CryptoKey } from "../Config.js";  

const algorithm = 'aes-256-cbc';  
const key = Buffer.from(CryptoKey, 'hex');  

export const encrypt = (data) => {  
    const iv = randomBytes(16);
    const cipher = createCipheriv(algorithm, key, iv);  
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');  
    encrypted += cipher.final('hex');  
    return { iv: iv.toString('hex'), encrypted };
};  

export const decrypt = ({ iv, encrypted }) => {  
    const decipher = createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));  
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');  
    decrypted += decipher.final('utf8');  
    const data_json = JSON.parse(decrypted)
    const data_object = JSON.parse(data_json)
    return data_object
};