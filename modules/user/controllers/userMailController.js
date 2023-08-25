import { PLANS, getPlanLimits } from '../../../helper/plans.js';
import Mail from '../../../models/mailSchema.js';
import User from '../../../models/userSchema.js';
import httpResponse from '../../../helper/httpResponse.js';
import { responseMessages, responseStatus, statusCode } from '../../../core/constant/constant.js';
import path from 'path';
import fs from 'fs';


class UserMailController {

    static async composeMail(req,res){

       try {
        // Sender ID and It's Plan
        const userId = req.userId;
        // console.log("User Id: " + userId);
        const userData = await User.findById({ _id: userId });
        const planName = userData.plan;
        // console.log(req.body.to);


        // Get CC Mails and Convert it into Ids
        let ccRecipients = req.body.cc ? req.body.cc.split(',') : [];
        // Find the user IDs for the given email addresses in ccRecipients
        const ccRecipientEmails = ccRecipients.map(email => email.trim());
        const ccRecipientUsers = await User.find({ email: { $in: ccRecipientEmails } });
        // Extract the IDs from the found users
        const ccRecipientIds = ccRecipientUsers.map(user => user._id);


        // Get BCC Mails and Convert it into Ids
        let bccRecipients = req.body.bcc ? req.body.bcc.split(',') : [];
        // Find the user IDs for the given email addresses in bccRecipients
        const bccRecipientEmails = bccRecipients.map(email => email.trim());
        const bccRecipientUsers = await User.find({ email: { $in: bccRecipientEmails } });
        // Extract the IDs from the found users
        const bccRecipientIds = bccRecipientUsers.map(user => user._id);

        

        // Messsage and Receiver Data
        const messageContent = req.body.message;
        const receiver = await User.findOne({ email: req.body.to });

        // Get plan limits based on the user's subscription plan
        const planLimits = getPlanLimits(planName);

        const attachments = req.files;

         // Validate message, recipients, attachment based on plan limits
        if (messageContent.length <= planLimits.characterLimit) {
            if (ccRecipients.length <= planLimits.maxCcCount){
                if (bccRecipients.length <= planLimits.maxBccCount){
                    if (attachments.length <= planLimits.maxFileUploads) {
                        // console.log("Bofore")
                        // Save Email logic here
                        const newMail = await new Mail({
                            sender: req.userId,
                            receiver: receiver._id,
                            subject: req.body.subject,
                            message: req.body.message,
                            attachments: []
                        });
                        // console.log("After")

                        // Check if attachments were uploaded
                        if (attachments && attachments.length > 0) {
                            // Apply attachment validation logic here if needed
                            newMail.attachments = attachments.map(attachment => attachment.filename);
                        }
                        await newMail.save();

                        newMail.cc = ccRecipientIds;
                        newMail.bcc = bccRecipientIds;
                        const mailData = await newMail.save();

                        httpResponse(res, statusCode.CREATED, responseStatus.SUCCESS, responseMessages.SUCCESS);
                    } else {
                        httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.FILEUPLOAD_EXCEED);
                    }
                }else{
                    httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.BCC_EXCEED);
                }
            }else{
                httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.CC_EXCEED);
            }
        } else {
            httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.MESSAGE_EXCEED);
        }
       } catch (error) {
            httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessages.INTERNAL_SERVER_ERROR);
       }

    }
}

export default UserMailController;