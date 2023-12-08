import Jwt from 'jsonwebtoken';
import { TokenSecret } from '../SettingsEnv.js'

export const GenerateToken = async (data) => {
    return Jwt.sign({ data }, TokenSecret, { expiresIn: '5h' })
}

export const VerifyToken = async (token) => {
    try {
        return Jwt.verify(token, TokenSecret)
    } catch (error) {
        return null
    }
}