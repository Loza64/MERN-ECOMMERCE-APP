import { Session } from "../Config.js";  
import { decrypt } from "../Libraries/crypto.js";  
import { VerifyToken } from "../Libraries/jsonwebtoken.js";  
import { Users } from "../Models/Model.js";  

const handleError = (req, res, status, message) => {  
    if (status === 401 || status === 410) req.session.destroy();  
    return res.status(status).json({ state: false, message });  
};  

export const isAuthenticate = async (req, res, next) => {  
    try {  
        if (!req.session || !req.session.user) return handleError(req, res, 401, "Session expired.");  

        const { token, agent, ip } = await decrypt(req.session.user);  

        if (ip !== (req.headers['x-forwarded-for'] || req.socket.remoteAddress)) {  
            console.log(ip)
            return handleError(req, res, 401, "Ip invalid to your session.");  
        }  

        if (agent !== req.headers['user-agent']) {  
            return handleError(req, res, 401, "Agent invalid for your session.");  
        }  

        const profile = await authenticateUser(token);  
        if (!profile) {  
            return handleError(req, res, 410, "Account removed due to policy violations.");  
        }  

        next();  
        Session("authorized");  
    } catch (error) {  
        return res.status(500).json({ state: false, message: error.message});  
    }  
};  

const authenticateUser = async (token) => {  
    const decoded = await VerifyToken(token);  
    return decoded ? await Users.findById(decoded) : null;  
};