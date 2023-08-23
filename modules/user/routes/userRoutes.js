import express from 'express';
import UserController from '../controllers/userController.js';
import { registerValidation, otpValidation, resendOtpValidation } from '../../../middleware/userValidation.js';
import { expressValidationResult } from '../../../helper/validationError.js';

const router = express.Router();

router.post('/register', registerValidation, expressValidationResult, UserController.registerUser);
router.post('/verifyUser', otpValidation, expressValidationResult, UserController.verifyUser);
router.post('/resendOTP', resendOtpValidation, expressValidationResult, UserController.resendOTP);

export default router;