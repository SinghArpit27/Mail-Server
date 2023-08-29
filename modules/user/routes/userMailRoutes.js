import express from 'express';
// import UserMailController from '../controllers/userMailController.js';
import { authenticateToken } from '../../../middleware/jwtAuthorization.js';
import { mailValidation } from '../../../middleware/mailValidation.js';
import { expressValidationResult } from '../../../helper/validationError.js';
import multipleUploads from '../../../middleware/attachmentsUpload.js';
import { bookmarkMail, composeMail, deleteMail, forwardMail, getForwardedMailByOthers, getInboxMail, getSentMail, getSingleMail, getforwardedMailByUser, replyMail } from '../controllers/userMailController.js';

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

// Get Forwarded Mails by the User / send by me
router.get('/getforwardedMailByUser', getforwardedMailByUser);

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4ODcxOGUwNThjMDRhYmVkYjI4ZjEiLCJpYXQiOjE2OTMyODc4NDYsImV4cCI6MTY5MzM5NTg0Nn0.FeQIK5nIf9gW6UfyxaXbOudFKIGtN53CAB3eCCddU_E/ send by others
router.get('/getForwardedMailByOthers', getForwardedMailByOthers);

export default router;
