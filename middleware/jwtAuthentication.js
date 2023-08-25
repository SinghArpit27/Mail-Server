import jwt from 'jsonwebtoken'
// import User from '../models/userSchema.js';
// const secret = 'employee_management_system';
// const secret = process.env.JWT_SECRET;

export const createToken = async (userData) => {
    try {
        // console.log(process.env.JWT_SECRET);
        const token = await jwt.sign({ _id: userData._id }, process.env.JWT_SECRET, { expiresIn: '30h' });
        return token;

    } catch (error) {
        console.log(error.message);
    }
}

// export const decodeToken = (token) => {
//     try {
//         const decoded = jwt.verify(token, secret);
//         return decoded._id;
//     } catch (error) {
//         throw new Error('Invalid token');
//     }
// };
