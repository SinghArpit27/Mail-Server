import express from 'express';
import UserMailController from '../controllers/userMailController.js';
import { authenticateToken } from '../../../middleware/jwtAuthorization.js';
import { mailValidation } from '../../../middleware/mailValidation.js';
import { expressValidationResult } from '../../../helper/validationError.js';
import multipleUploads from '../../../middleware/attachmentsUpload.js';

const router = express.Router();
router.use(express.static('public'));

// Middlware
router.use(authenticateToken);

router.post('/composeMail', multipleUploads, mailValidation, expressValidationResult, UserMailController.composeMail);


export default router;
