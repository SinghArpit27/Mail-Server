import express from 'express';
// import UserMailController from '../controllers/userMailController.js';
import { authenticateToken } from '../../../middleware/jwtAuthorization.js';
import { mailValidation } from '../../../middleware/mailValidation.js';
import { expressValidationResult } from '../../../helper/validationError.js';
import multipleUploads from '../../../middleware/attachmentsUpload.js';
import { bookmarkMail, composeMail, deleteMail, forwardMail, replyMail } from '../controllers/userMailController.js';

const router = express.Router();
router.use(express.static('public'));

// Middlware
router.use(authenticateToken);

router.post('/composeMail', multipleUploads, mailValidation, expressValidationResult, composeMail);

router.post('/forwardMail/:id', forwardMail);

router.post('/replyMail/:id', multipleUploads, mailValidation, expressValidationResult, replyMail);

router.post('/deleteMail/:id', deleteMail);

router.post('/bookmarkMail/:id', bookmarkMail);



export default router;
