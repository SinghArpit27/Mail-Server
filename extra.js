// import { PLANS, getPlanLimits } from '../../../helper/plans.js';
// import Mail from '../../../models/mailSchema.js';
// import User from '../../../models/userSchema.js';
// import httpResponse from '../../../helper/httpResponse.js';
// import { responseMessages, responseStatus, statusCode } from '../../../core/constant/constant.js';


// class UserMailController {

//     static async composeMail(req,res){

//        try {
//         // Sender ID and It's Plan
//         const userId = req.userId;
//         // console.log("User Id: " + userId);
//         const userData = await User.findById({ _id: userId });
//         const planName = userData.plan;



//         // Get CC Mails and Convert it into Ids
//         let ccRecipients = req.body.cc ? req.body.cc.split(',') : [];
//         // Find the user IDs for the given email addresses in ccRecipients
//         const ccRecipientEmails = ccRecipients.map(email => email.trim());
//         const ccRecipientUsers = await User.find({ email: { $in: ccRecipientEmails } });
//         // Extract the IDs from the found users
//         const ccRecipientIds = ccRecipientUsers.map(user => user._id);


//         // Get BCC Mails and Convert it into Ids
//         let bccRecipients = req.body.bcc ? req.body.bcc.split(',') : [];
//         // Find the user IDs for the given email addresses in bccRecipients
//         const bccRecipientEmails = bccRecipients.map(email => email.trim());
//         const bccRecipientUsers = await User.find({ email: { $in: bccRecipientEmails } });
//         // Extract the IDs from the found users
//         const bccRecipientIds = bccRecipientUsers.map(user => user._id);

        

//         // Messsage and Receiver Data
//         const messageContent = req.body.message;
//         const receiver = await User.findOne({ email: req.body.to });

//         // Get plan limits based on the user's subscription plan
//         const planLimits = getPlanLimits(planName);

//         if (messageContent.length <= planLimits.characterLimit) {
//             // Validate recipients based on plan limits
//             if (ccRecipients.length > planLimits.maxCcCount){
//                 return res.status(400).json({ error: 'Recipient limit exceeded for CC.' });
//                 // httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.CC_EXCEED);
//             }
//             if (bccRecipients.length > planLimits.maxBccCount){
//                 // return res.status(400).json({ error: 'Recipient limit exceeded for BCC.' });
//                 httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.BCC_EXCEED);
//             }
            
//             console.log("Before data Adding");
//             // Send the email logic here
//             const newMail = await new Mail({
//                 sender: req.userId,
//                 receiver: receiver._id,
//                 // cc: ccRecipientIds,
//                 // bcc: bccRecipientIds,
//                 subject: req.body.subject,
//                 message: req.body.message,
//             });
//             // console.log("After data Adding and new Mail data:", newMail);

//             newMail.cc = ccRecipientIds;
//             newMail.bcc = bccRecipientIds;

//             const mailData = await newMail.save();
//             // console.log("After data Saving And Saved Data: ", mailData);
    
//             httpResponse(res, statusCode.CREATED, responseStatus.SUCCESS, responseMessages.SUCCESS);
//         } else {
//             httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.MESSAGE_EXCEED);
//         }

//        } catch (error) {
//             httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessages.INTERNAL_SERVER_ERROR);
//        }

//     }
// }

// export default UserMailController;







































// // import multer from "multer";
// // import User from "../models/userSchema";

// // var storage = multer.diskStorage({
// //   destination: function (req, res, cb) {
// //     cb(null, 'public/uploads/' , function(){
// //         if (error)
// //         throw error;
// //     });
// //   },
// //   filename: function (req, file, cb) {
// //     cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname,function(error1,success){
// //         if(error1)
// //         throw error1;
// //     });
// //   },
// // });


// // const fileFilter = async (req, file, cb) => {
// //   // console.log(req.userId,"in upload");
// //   const userData = await User.findById(req.userId);
// //   if(!userData)
// //   {
// //     cb(new Error('User doesnot exists anymore'))
// //   }
// //   else{
// //     // console.log(userData,"userdataaa");
// //     const UserPlan = userData.plan;
// //     if(UserPlan == 'Basic Plan' || UserPlan == 'Intermediate Plan')
// //     {
// //       // to check rar file only these extension are provided
// //       if (file.mimetype === 'application/vnd.rar' ||
// //       file.mimetype === 'application/x-rar-compressed' ||
// //       file.originalname.endsWith('.part.rar') ||
// //       file.originalname.endsWith('.r00') ||
// //       file.originalname.endsWith('.r01') ||
// //       file.originalname.endsWith('.rev') ||
// //       file.originalname.endsWith('.rar1')) {
// //         cb(new Error('.rar files are not allowed'))
// //       } else {
// //         cb(null, true);
// //       }
// //     }else{
// //       cb(null, true);
// //     }
// //   }
// // };
// // var upload = multer({
// //   storage: storage,
// //   fileFilter: fileFilter
// // }).array('attachments');


// // export default upload;









// const multer = require("multer");
// const path = require("path");
// user_route.use(express.static('public'));

// // PDF File
// const pdfStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null,path.join(__dirname, '../public/projectUploads'));
//   },
//     filename:function(req,file,cb){
//         const name = Date.now() + '-' + file.originalname;
//         cb(null, name);
//     }
// });

// const pdfUpload = multer({storage:pdfStorage});

// const multipleUploads = pdfUpload.fields([{ name: 'image', maxCount: 1 }, { name: 'synopsis', maxCount: 1 },{ name: 'report', maxCount: 1 }]);






// // Sample Mail 700+ charchters in this mail
// "Dear Managers Name I hope this message finds you in good health. I am writing to respectfully request an extension of my current leave which was initially approved for the period from start date to end date. I understand the inconvenience my prolonged absence may cause and I deeply appreciate your understanding and consideration in this matter. Unfortunately circumstances beyond my control have arisen requiring me to extend my leave. Briefly explain the reason for the extension such as a medical condition that requires further treatment or an unforeseen family emergency. Given the situation I find myself in a position where I am unable to resume my duties as planned. I understand the importance of my role within the team and the responsibilities that come with it. Rest assured I have taken steps to ensure a smooth continuation of operations during my absence. I have thoroughly briefed colleague's name about ongoing projects and responsibilities and they have kindly agreed to manage these in my absence. I apologize for any inconvenience this may cause and assure you that I am committed to minimizing disruptions. I remain fully dedicated to the success of our team and our projects. During my extended leave I will be available via email and phone to address any urgent matters that may arise. I am truly grateful for your understanding and support during this challenging time. I will make every effort to keep you updated on my progress and provide any necessary documentation to support my request for an extension. Thank you for considering my request. I am looking forward to a swift resolution of my situation and returning to work as soon as possible. Please do not hesitate to reach out if you require any further information. Wishing you all the best. Warm regards Your Name Your Contact Information"



// 336 charchter in this text
// "Dear Managers Name I hope this message finds you in good health. I am writing to respectfully request an extension of my current leave which was initially approved for the period from [start date] to [end date]. I understand the inconvenience my prolonged absence may cause and I deeply appreciate your understanding and consideration in this matter."
