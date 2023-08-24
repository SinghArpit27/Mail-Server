import express from 'express';
import UserController from '../controllers/userController.js';
import { registerValidation, otpValidation, resendOtpValidation, loginValidation, passwordValidation, UpdateProfileValidation } from '../../../middleware/userValidation.js';
import { expressValidationResult } from '../../../helper/validationError.js';
import { authenticateToken } from '../../../middleware/jwtAuthorization.js';

const router = express.Router();

router.post('/register', registerValidation, expressValidationResult, UserController.registerUser);
router.post('/verifyUser', otpValidation, expressValidationResult, UserController.verifyUser);
router.post('/resendOTP', resendOtpValidation, expressValidationResult, UserController.resendOTP);
router.post('/login', loginValidation, expressValidationResult, UserController.loginUser);
router.post('/changePassword', passwordValidation, expressValidationResult, authenticateToken, UserController.changePassword);
router.post('/updateProfile', UpdateProfileValidation, expressValidationResult, authenticateToken, UserController.updateProfile);

export default router;