import { randomBytes, createCipheriv, createDecipheriv } from "crypto";
import { CryptoKey } from "../Config.js";

const algorithm = 'aes-256-gcm';
const key = Buffer.from(CryptoKey, 'hex');

export const encrypt = (data) => {  
    const iv = randomBytes(12);
    const cipher = createCipheriv(algorithm, key, iv);  
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const tag = cipher.getAuthTag();
    return { iv: iv.toString('hex'), encrypted, tag: tag.toString('hex') }; 
};  

export const decrypt = ({ iv, encrypted, tag }) => {  
    const decipher = createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));  
    decipher.setAuthTag(Buffer.from(tag, 'hex'));
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    const pre_data = JSON.parse(decrypted)
    const data = JSON.parse(pre_data)
    return data;
};