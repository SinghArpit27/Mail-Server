import express from 'express';
// import UserMailController from '../controllers/userMailController.js';
import { authenticateToken } from '../../../middleware/jwtAuthorization.js';
import { mailValidation } from '../../../middleware/mailValidation.js';
import { expressValidationResult } from '../../../helper/validationError.js';
import multipleUploads from '../../../middleware/attachmentsUpload.js';
import { bookmarkMail, composeMail, deleteMail, forwardMail, getInboxMail, getSentMail, getSingleMail, replyMail } from '../controllers/userMailController.js';

const router = express.Router();
router.use(express.static('public'));

// Middlware
router.use(authenticateToken);

// POST Request
// Compose Mail Route
router.post('/composeMail', multipleUploads, mailValidation, expressValidationResult, composeMail);

// Forward Mail Route
router.post('/forwardMail/:id', forwardMail);

// Reply Mail Route
router.post('/replyMail/:id', multipleUploads, mailValidation, expressValidationResult, replyMail);

// Delete Mail Route
router.post('/deleteMail/:id', deleteMail);

// Bookmark Mail Route
router.post('/bookmarkMail/:id', bookmarkMail);



// GET Request
// Get Single Mail Route
router.get('/getSingleMail/:id', getSingleMail);

// Get Sent Box Route
router.get('/getSentMails', getSentMail);

// Get Inbox Route
router.get('/getInboxMails', getInboxMail);

export default router;
