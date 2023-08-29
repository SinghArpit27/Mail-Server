import { PLANS, getPlanLimits } from '../../../helper/plans.js';
import Mail from '../../../models/mailSchema.js';
import User from '../../../models/userSchema.js';
import httpResponse from '../../../helper/httpResponse.js';
import { responseMessages, responseStatus, statusCode } from '../../../core/constant/constant.js';
import path from 'path';
import fs from 'fs';
import ForwardMail from '../../../models/forwardMailSchema.js';


// class UserMailController {
    
    // POST Request

    export const composeMail = async(req,res) => {

       try {
        // Sender ID and It's Plan
        const userId = req.userId;
        // console.log("User Id: " + userId);
        const userData = await User.findById({ _id: userId });
        const planName = userData.plan;
        // console.log(req.body);


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

        // console.log("User plan: ", planLimits);

        // const attachments = req.files;
        const attachments = req.files || [];
        // console.log(messageContent, receiver, ccRecipients, bccRecipients, attachments)
        
        // console.log("length error")
         // Validate message, recipients, attachment based on plan limits
        if (messageContent.length <= planLimits.characterLimit) {
            // console.log("cc length error")
            if (ccRecipients.length <= planLimits.maxCcCount){
                if (bccRecipients.length <= planLimits.maxBccCount){
                    if (attachments.length <= planLimits.maxFileUploads) {

                        // Save Email logic here
                        const newMail = await new Mail({
                            sender: req.userId,
                            receiver: receiver._id,
                            subject: req.body.subject,
                            message: req.body.message,
                            attachments: []
                        });

                        // Check if attachments were uploaded
                        if (attachments && attachments.length > 0) {
                            // Apply attachment validation logic here if needed
                            newMail.attachments = attachments.map(attachment => attachment.filename);
                        }
                        await newMail.save();

                        newMail.cc = ccRecipientIds;
                        newMail.bcc = bccRecipientIds;
                        const mailData = await newMail.save();

                        httpResponse(res, statusCode.CREATED, responseStatus.SUCCESS, responseMessages.MAIL_SEND);
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
            httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessages.INTERNAL_SERVER_ERROR, error.message);
       }

    }

    export const forwardMail = async(req,res) => {
        try {
            
            const userId = req.userId;
            const mailId = req.params.id;
            console.log(userId, mailId);

            const mailData = await Mail.findById({ _id: mailId });
            if(mailData){
                const userData = await User.findById({ _id: userId });
                if(userData){
                    const isDeleted = mailData.softDeleted.includes(userId);
                    if(!isDeleted){
                        const userAssociated = [
                            mailData.cc.includes(userId),
                            mailData.bcc.includes(userId),
                            mailData.receiver == userId,
                            mailData.sender == userId
                        ].some(Boolean);

                        if (userAssociated) {
                            const newMail = new Mail({
                                subject: `Fwd: ${mailData.subject}`,
                                message: mailData.message,
                                attachments: mailData.attachments || [],
                                sender: mailData.sender,
                                receiver: mailData.receiver,
                                cc: mailData.cc,
                                bcc: mailData.bcc,
                                softDeleted: mailData.softDeleted,
                            });
                            const newMailData = await newMail.save();

                            const receiverArray = [
                                mailData.receiver,
                                ...mailData.cc,
                                ...mailData.bcc,
                            ];
                            const newForwardMail = new ForwardMail({
                                sender: userId,
                                receiver: receiverArray,
                                mailId: mailId,
                            });
                            await newForwardMail.save();

                            httpResponse(res, statusCode.OK, responseStatus.SUCCESS, responseMessages.FORWARD_SUCCESS);

                        } else {
                            httpResponse(res, statusCode.UNAUTHORIZED, responseStatus.FAILURE, responseMessages.REPLY_ERROR);
                        }
                    }else{
                        httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.MAIL_DELETED_ERROR);
                    }
                }else{
                    httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.UNAUTHORIZED);
                }
            }else{
                httpResponse(res, statusCode.NOT_FOUND, responseStatus.FAILURE, responseMessages.EMAIL_NOT_FOUND);
            }
        } catch (error) {
            httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessages.INTERNAL_SERVER_ERROR, error.message);
        }
    }
    
    export const replyMail = async(req,res) => {
        try {
            const userId = req.userId;
            const mailId = req.params.id;
            // console.log(userId, mailId, req.body.message);

            const mailData = await Mail.findById(mailId);
            if (mailData) {
                const userData = await User.findById(userId);
                if (userData) {
                    const isDeleted = mailData.softDeleted.includes(userId);
                    if (isDeleted) {
                        httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.MAIL_DELETED_ERROR);
                    } else {
                        // Check if the user is associated with the mail (cc, bcc, receiver, or sender)
                        const userAssociated = [
                            mailData.cc.includes(userId),
                            mailData.bcc.includes(userId),
                            mailData.receiver == userId,
                            mailData.sender == userId
                        ].some(Boolean);

                        if (userAssociated) {
                            composeMail(req, res);
                        } else {
                            httpResponse(res, statusCode.UNAUTHORIZED, responseStatus.FAILURE, responseMessages.REPLY_ERROR);
                        }
                    }
                } else {
                    httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.UNAUTHORIZED);
                }
            } else {
                httpResponse(res, statusCode.NOT_FOUND, responseStatus.FAILURE, responseMessages.EMAIL_NOT_FOUND);
            }
        } catch (error) {
            httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessages.INTERNAL_SERVER_ERROR, error.message);
        }
    }

    export const deleteMail = async(req,res) => {
        try {
            
            const userId = req.userId;
            const mailId = req.params.id;

            const mailData = await Mail.findById({ _id: mailId });
            if(mailData){
                const userData = await User.findById({ _id: userId });
                if(userData){
                    const isDeleted = mailData.softDeleted.includes(userId);
                    if(!isDeleted){
                        const userAssociated = [
                            mailData.cc.includes(userId),
                            mailData.bcc.includes(userId),
                            mailData.receiver == userId,
                            mailData.sender == userId
                        ].some(Boolean);

                        if(userAssociated){
                            mailData.softDeleted.push(userId);
                            await mailData.save();
                            httpResponse(res, statusCode.OK, responseStatus.SUCCESS, responseMessages.DELETE_SUCCESS);
                        }else{
                            httpResponse(res, statusCode.UNAUTHORIZED, responseStatus.FAILURE, responseMessages.DELETE_ERROR);
                        }
                    }else{
                        httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.MAIL_DELETED_ERROR);
                    }
                }else{
                    httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.UNAUTHORIZED);
                }
            }else{
                httpResponse(res, statusCode.NOT_FOUND, responseStatus.FAILURE, responseMessages.EMAIL_NOT_FOUND);
            }
        } catch (error) {
            httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessages.INTERNAL_SERVER_ERROR, error.message);
        }
    }

    export const bookmarkMail = async(req,res) => {
        try {
            
            const userId = req.userId;
            const mailId = req.params.id;

            const mailData = await Mail.findById({ _id: mailId });
            if(mailData){
                const userData = await User.findById({ _id: userId });
                if(userData){
                    const isDeleted = mailData.softDeleted.includes(userId);
                    // const updatedIsDelete = isDeleted.length > 0;
                    if(!isDeleted){
                        if (!mailData.bookmarks.includes(userId)) {

                            const userAssociated = [
                                mailData.cc.includes(userId),
                                mailData.bcc.includes(userId),
                                mailData.receiver == userId,
                                mailData.sender == userId
                            ].some(Boolean);

                            // check User available exist in Mail Data or not
                            if(userAssociated){
                                console.log(userId);
                                mailData.bookmarks.push(userId);
                                await mailData.save();
                                httpResponse(res, statusCode.OK, responseStatus.SUCCESS, responseMessages.BOOKMARK_SUCCESS);

                            }else{
                                httpResponse(res, statusCode.UNAUTHORIZED, responseStatus.FAILURE, responseMessages.BOOKMARK_ERROR);
                            }
                        } else {
                            httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.ALREADY_BOOKMARKED);
                        }
                    }else{
                        httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.MAIL_DELETED_ERROR);
                    }
                }else{
                    httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.UNAUTHORIZED);
                }
            }else{
                httpResponse(res, statusCode.NOT_FOUND, responseStatus.FAILURE, responseMessages.EMAIL_NOT_FOUND);
            }

        } catch (error) {
            httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessages.INTERNAL_SERVER_ERROR, error.message);
        }
    }

    export const getSingleMail = async(req,res) => {
        try {
            
            const userId = req.userId;
            const mailId = req.params.id;

            // const mailData = await Mail.find({ _id: mailId });
            const mailData = await Mail.findById(mailId, { timestamp: 0, _id: 0 }); // Excluding timestamp and object ID
            if(mailData){
                const userData = await User.findById({ _id: userId });
                if(userData){
                    const isDeleted = mailData.softDeleted && mailData.softDeleted.includes(userId);
                    if(isDeleted !== undefined && !isDeleted){

                        // Getting Recipient data to get their Emails
                        const senderData = await User.findById(mailData.sender); // Assuming sender is a user ID
                        const receiverData = await User.findById(mailData.receiver); // Assuming receiver is a user ID
                        const ccUsersData = await User.find({ _id: { $in: mailData.cc } }); // Assuming cc is an array of user IDs

                        const responseData = {
                            sender: senderData.email,
                            receiver: receiverData.email,
                            cc: ccUsersData.map(user => user.email),
                            subject: mailData.subject,
                            message: mailData.message,
                            attachments: mailData.attachments
                        };
                        httpResponse(res, statusCode.OK, responseStatus.SUCCESS, responseMessages.SUCCESS, responseData);

                    }else{
                        httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.MAIL_DELETED_ERROR);
                    }
                }else{
                    httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.UNAUTHORIZED);
                }
            }else{
                httpResponse(res, statusCode.NOT_FOUND, responseStatus.FAILURE, responseMessages.EMAIL_NOT_FOUND);
            }

        } catch (error) {
            httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessages.INTERNAL_SERVER_ERROR, error.message);
        }
    }

    export const getSentMail = async(req,res) => {
        try {
            
            const userId = req.userId;
            const userData = await User.findById({ _id: userId });
            if(userData){
                const sentMails = await Mail.find({ sender: userId, softDeleted: { $ne: userId } }, { timestamp: 0, _id: 0 })
                .populate('receiver', 'email') // Populate 'receiver' field with email
                .populate('cc', 'email'); // Populate 'cc' field with email

                if (sentMails.length > 0) {
                    const responseData = sentMails.map(mailData => {
                        return {
                            receiver: mailData.receiver.email,
                            cc: mailData.cc.map(user => user.email), // Map 'cc' recipients to email addresses
                            subject: mailData.subject,
                            message: mailData.message,
                            attachments: mailData.attachments
                        };
                    });
                    httpResponse(res, statusCode.OK, responseStatus.SUCCESS, responseMessages.SUCCESS, responseData);
                } else {
                    httpResponse(res, statusCode.NOT_FOUND, responseStatus.FAILURE, responseMessages.NO_SENT_MAILS);
                }
            }else{
                httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.UNAUTHORIZED);
            }
        } catch (error) {
            httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessages.INTERNAL_SERVER_ERROR, error.message);
        }
    }
    
    export const getInboxMail = async(req,res) => {
        try {
            
            const userId = req.userId;
            const userData = await User.findById({ _id: userId });
            if(userData){
                // Retrieve emails where the user is in receiver, cc, or bcc fields and not soft deleted
                const receivedMails = await Mail.find({
                    $and: [
                        {
                            $or: [
                                { receiver: userId },
                                { cc: userId }
                            ]
                        },
                        { softDeleted: { $ne: userId } }
                    ]
                }, { timestamp: 0, _id: 0 })
                    .populate('sender', 'email') // Populate 'sender' field with email
                    .populate('cc', 'email'); // Populate 'cc' field with email
    
                if (receivedMails.length > 0) {
                    const responseData = receivedMails.map(mailData => {
                        return {
                            sender: mailData.sender.email,
                            cc: mailData.cc.map(user => user.email),
                            subject: mailData.subject,
                            message: mailData.message,
                            attachments: mailData.attachments
                        };
                    });
                    httpResponse(res, statusCode.OK, responseStatus.SUCCESS, responseMessages.SUCCESS, responseData);
                } else {
                    httpResponse(res, statusCode.NOT_FOUND, responseStatus.FAILURE, responseMessages.NO_RECEIVED_MAILS);
                }
            }else{
                httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.UNAUTHORIZED);
            }
        } catch (error) {
            httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessages.INTERNAL_SERVER_ERROR, error.message);
        }
    }

    export const getforwardedMailByUser = async(req,res) => {
        try {
            
            const userId = req.userId;

            const userData = await User.findById({ _id: userId });
            if (userData) {
                // Retrieve forwarded emails by the user
                const forwardedByUserMails = await ForwardMail.find({ sender: userId })
                    .populate('mailId', { timestamp: 0, _id: 0 }) // Excluding timestamp and object ID from the mail
                    .populate('receiver', 'email');

                // Filter out forwarded mails that have been deleted
                const filteredMails = forwardedByUserMails.filter(forwardedMailData => {
                    return !forwardedMailData.mailId.softDeleted.includes(userId);
                });

                if (filteredMails.length > 0) {
                    const responseData = filteredMails.map(forwardedMailData => {
                        return {
                            receiver: forwardedMailData.receiver.map(user => user.email),
                            subject: forwardedMailData.mailId.subject,
                            message: forwardedMailData.mailId.message,
                            attachments: forwardedMailData.mailId.attachments
                        };
                    });

                    httpResponse(res, statusCode.OK, responseStatus.SUCCESS, responseMessages.SUCCESS, responseData);
                } else {
                    httpResponse(res, statusCode.NOT_FOUND, responseStatus.FAILURE, responseMessages.NO_FORWARDED_MAILS_BY_USER);
                }
            } else {
                httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.UNAUTHORIZED);
            }
        } catch (error) {
            httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessages.INTERNAL_SERVER_ERROR, error.message);
        }
    }

    export const getForwardedMailByOthers = async(req,res) => {
        try {
            
            const userId = req.userId;
            const userData = await User.findById({ _id: userId });
            
            if (userData) {
                // Retrieve forwarded emails to the user
                const forwardedToUserMails = await ForwardMail.find({ receiver: userId })
                    .populate('mailId', { timestamp: 0, _id: 0 }) // Excluding timestamp and object ID from the mail
                    .populate('sender', 'email');

                // Filter out forwarded mails that have been deleted
                const filteredMails = forwardedToUserMails.filter(forwardedMailData => {
                    return !forwardedMailData.mailId.softDeleted.includes(userId);
                });

                if (filteredMails.length > 0) {
                    const responseData = filteredMails.map(forwardedMailData => {
                        return {
                            sender: forwardedMailData.sender.email,
                            subject: forwardedMailData.mailId.subject,
                            message: forwardedMailData.mailId.message,
                            attachments: forwardedMailData.mailId.attachments
                        };
                    });

                    httpResponse(res, statusCode.OK, responseStatus.SUCCESS, responseMessages.SUCCESS, responseData);
                } else {
                    httpResponse(res, statusCode.NOT_FOUND, responseStatus.FAILURE, responseMessages.NO_FORWARDED_MAILS_TO_USER);
                }
            } else {
                httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.UNAUTHORIZED);
            }


        } catch (error) {
            httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessages.INTERNAL_SERVER_ERROR, error.message);
        }
    }



    // GET Requests

// }

// export default UserMailController;

    // static async replyMail(req,res){
    //     try {
            
    //         const userId = req.userId;
    //         // console.log(userId);
    //         const mail_id = req.params.id;
    //         // console.log(mail_id);

    //         const mailData = await Mail.findById({ _id: mail_id });
    //         if(mailData){
    //             const userData = await User.findById({ _id: userId });
    //             if(userData){
    //                 const isDeleted = mailData.softDeleted.find((id) => id == userId);
    //                 if(isDeleted){
    //                     httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.MAIL_DELETED_ERROR);
    //                 }else{
    //                     // check user exists in cc,bcc and receiver field
    //                     const ccUser = mailData.cc.find((plan) => plan == userId);
    //                     const bccUser = mailData.bcc.find((plan) => plan == userId);
    //                     if(ccUser || bccUser || mailData.receiver == userId || mailData.sender == userId){
    //                         console.log("before function calling");
    //                         composeMail(req,res);
    //                     }else{
    //                         httpResponse(res, statusCode.UNAUTHORIZED, responseStatus.FAILURE, responseMessages.REPLY_ERROR);
    //                     }
    //                 }
    //             }else{
    //                 httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessages.UNAUTHORIZED);
    //             }
    //         }else{
    //             httpResponse(res, statusCode.NOT_FOUND, responseStatus.FAILURE, responseMessages.EMAIL_NOT_FOUND);
    //         }
    //     } catch (error) {
    //         httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessages.INTERNAL_SERVER_ERROR);
    //     }
    // }
    // httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessages.INTERNAL_SERVER_ERROR, error.message);