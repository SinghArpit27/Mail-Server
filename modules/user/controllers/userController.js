import User from "../../../models/userSchema.js";
import Plan from '../../../models/planSchema.js';
import bcrypt from 'bcrypt';
import phoneOTP from '../../../helper/userVerification.js';
import { responseMessages, responseStatus, statusCode } from '../../../core/constant/constant.js';
import httpResponse from "../../../helper/httpResponse.js";


// Generate a random OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

class UserController {

    static async registerUser(req,res){
        try {
            // Generate a new OTP and set the expiration time
            const otp = generateOTP();
            const otpExp = new Date(Date.now() + 2 * 60000).getTime(); // 2 minutes

            const userEmail = await User.findOne({email: req.body.email})
            if(userEmail){
                httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.EMAIL_ALREADY_EXIST);
            }else{
                const userPhone = await User.findOne({ phone: req.body.phone })
                if(userPhone){
                    httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.PHONE_ALREADY_EXIST);
                }else{
                    const spassword = await bcrypt.hash(req.body.password, 10);
                    const user = await new User({
                        name: req.body.name,
                        email: req.body.email,
                        phone: req.body.phone,
                        password: spassword,
                        otpVerification: otp,
                        otpExpiration: otpExp
                    });

                   const userData = await user.save();
                    // console.log(userData);
                    if(userData){
                        phoneOTP(req.body.name, req.body.phone, otp);
                        httpResponse(res, statusCode.CREATED, responseStatus.SUCCESS, responseMessages.REGISTRATION_SUCCESS, userData)
                    }else{
                        httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.REGISTRATION_FAILED);
                    }
                }
            }
        } catch (error) {
            httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessages.INTERNAL_SERVER_ERROR);
        }
    }

    static async verifyUser(req,res){
        try {
            const otp = req.body.otp;
            const email = req.body.email;

            const userData = await User.findOne({ email: email});
            if(userData){
                const checkOtpExpiration = new Date(Date.now()).getTime(); // 30 minutes
                
                if(userData.otpExpiration < checkOtpExpiration){
                    httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.OTP_EXPIRED);
                }else if(userData.is_varified == 1){
                    httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.ALREADY_VERIFIED);
                }
                else if(userData.otpVerification == otp && userData.otpExpiration > checkOtpExpiration){
                    const updateInfo = await User.updateOne({ _id: userData._id}, { $set:{ is_varified:1 } });
                    httpResponse(res, statusCode.OK, responseStatus.SUCCESS, responseMessages.OTP_VERIFIED_SUCCESSFULLY);
                }
                else{
                    httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.INVALID_OTP);
                }
            }else{
                httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.EMAIL_NOT_FOUND);
            }
        } catch (error) {
            httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessages.INTERNAL_SERVER_ERROR);
        }
    }

    static async resendOTP(req,res){
        try {
            
            const email = req.body.email;

            const userData = await User.findOne({email});
            if(userData){

                if(userData.is_varified == 0){

                    // Generate a new OTP and set the expiration time
                    const otp = generateOTP();
                    const otpExp = new Date(Date.now() + 2 * 60000).getTime(); // 2 minutes

                    phoneOTP(userData.name, userData.phone, otp);

                    const updateInfo = await User.updateOne({ _id: userData._id}, { $set:{ otpExpiration: otpExp, otpVerification: otp } });

                    httpResponse(res, statusCode.CREATED, responseStatus.SUCCESS, responseMessages.OTP_SEND);

                }else{
                    httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.ALREADY_VERIFIED);
                }

            }else{
                httpResponse(res, statusCode.NOT_FOUND, responseStatus.FAILURE, responseMessages.EMAIL_NOT_FOUND);
            }

        } catch (error) {
            httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessages.INTERNAL_SERVER_ERROR);
        }
    }

    static async loginUser(req,res){
        try {
            
            const email = req.body.email;
            const password = req.body.password;

            const userData = await User.findOne({email});

            if(userData){
                const passwordMatch = await bcrypt.compare(password, userData.password);
                if(passwordMatch){

                    if(userData.is_varified === 1){

                    }else{
                        httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.NOT_VERIFIED);
                    }

                }else{
                    httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.INCORRECT_CREDENTIALS);
                }
            }else{
                httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.INCORRECT_CREDENTIALS);
            }


        } catch (error) {
            httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessages.INTERNAL_SERVER_ERROR);
        }
    }
}

export default UserController;







            // const planName = req.body.plan;
            // if(planName === "Basic"){
            //     const newPlanData = {
            //         name: 'Basic Plan',
            //         price: 0,
            //         limits: {
            //             maxCharacters: 200,
            //             maxFiles: 1,
            //             maxBCC: 2,
            //             maxCC: 2,
            //         },
            //         allowRARFiles: false,
            //     };

            //     const newPlan = new Plan(newPlanData);
            //     const savedPlan = await newPlan.save();
            //     console.log('Plan created successfully:', savedPlan);
            // }
            // else if(planName === "Intermediate"){
            //     const newPlanData = {
            //         name: 'Basic Plan',
            //         price: `10$`,
            //         limits: {
            //             maxCharacters: 350,
            //             maxFiles: 3,
            //             maxBCC: 4,
            //             maxCC: 4,
            //         },
            //         allowRARFiles: false,
            //     };

            //     const newPlan = new Plan(newPlanData);
            //     const savedPlan = await newPlan.save();
            //     console.log('Plan created successfully:', savedPlan);
            // }
            // else if(planName === "Enterprise"){
            //     const newPlanData = {
            //         name: 'Basic Plan',
            //         price: `20$`,
            //         limits: {
            //             maxCharacters: 200,
            //             maxFiles: 1,
            //             maxBCC: 2,
            //             maxCC: 2,
            //         },
            //         allowRARFiles: true,
            //     };

            //     const newPlan = new Plan(newPlanData);
            //     const savedPlan = await newPlan.save();
            //     console.log('Plan created successfully:', savedPlan);
            // }