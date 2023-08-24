import jwt  from "jsonwebtoken";
import { statusCode, responseStatus, responseMessages } from "../core/constant/constant.js";
import httpResponse from "../helper/httpResponse.js";
import User from '../models/userSchema.js';


// export const isLogin = async (req,res,next) => {
//     try {
        
//         const jwtToken = req.headers.authorization;
//         if (!jwtToken || !req.headers.authorization.startsWith('Bearer')) {
//             // return res.status(statusCode.Bad_request).json({ Message: messages.TokenError, ResponseStatus: responseStatus.failure });
//             httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.TOKEN_ERROR);
//         }
//         jwtToken = (req.headers.authorization).split(' ')[1]
//         jwt.verify(jwtToken, process.env.JWT_SECRET, async (err, data) => {
//             if (err) {
//                 // return res.status(statusCode.Bad_request).json({ Messages: err.message ,ResponseStatus: responseStatus.failure});
//                 httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, err.message);
//             } else {
//                 const userData = await User.findById({ _id: data._id });
//                 console.log(userData);
//                 req._id = data._id;
//                 next()
//             }
//         })



//         const decoded = jwt.verify(token, secret);
//         return decoded._id;

//     } catch (error) {
//         httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessages.INTERNAL_SERVER_ERROR);
//     }
// }

export const authenticateToken = (req, res, next) => {

    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(403).json({ result: "Error: Invalid Token" });
            } else {
                const user = decoded; // The user data decoded from the token
                req.userId = user._id
                next();
            }
        });
    }else{
        res.send({
            result: "Token Not Found"
        })
    }
};
  
