import Jwt from 'jsonwebtoken';
import { TokenSecret } from '../Config.js'

export const GenerateToken = async (result) => {
    return Jwt.sign({ result }, TokenSecret, { expiresIn: '1h' })
}

export const VerifyToken = async (token) => {
    try {
        return Jwt.verify(token, TokenSecret).result //El .result es como se guardo el token con el metodo sign
    } catch (error) {
        return null
    }
}