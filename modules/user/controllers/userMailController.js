import { PLANS, getPlanLimits } from '../../../helper/plans.js';
import Mail from '../../../models/mailSchema.js';
import User from '../../../models/userSchema.js';
import httpResponse from '../../../helper/httpResponse.js';
import { responseMessages, responseStatus, statusCode } from '../../../core/constant/constant.js';


class UserMailController {

    static async composeMail(req,res){

        const userId = req.userId;
        // console.log("User Id: " + userId);
        const userData = await User.findById({ _id: userId });
        const plan = userData.plan;

        const { characterLimit, maxFileUploads, maxBccCount, maxCcCount } = getPlanLimits(plan);

        const { subject, message, recipients, attachments } = req.body;

        if (message.length > characterLimit) {
            return res.status(400).json({ error: 'Message exceeds character limit for the plan.' });
        }

        if (recipients.bcc.length > maxBccCount || recipients.cc.length > maxCcCount) {
            return res.status(400).json({ error: 'Recipient count exceeds plan limits.' });
        }

        if (attachments.length > maxFileUploads) {
            return res.status(400).json({ error: 'Attachment count exceeds plan limits.' });
        }

        try {
            const newMail = new Mail({
            sender: req.user._id,
            recipients,
            subject,
            message,
            attachments,
            });

            const savedMail = await newMail.save();
            httpResponse(res, statusCode.CREATED, responseStatus.SUCCESS, responseMessages.MAIL_SEND, savedMail);

        } catch (error) {
            httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessages.INTERNAL_SERVER_ERROR);
        }
    }

}

export default UserMailController;