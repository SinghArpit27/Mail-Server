import express from 'express';
import UserMailController from '../controllers/userMailController.js';
import { authenticateToken } from '../../../middleware/jwtAuthorization.js';
// import upload from '../../../middleware/attachmentsUpload';

const router = express.Router();

// Middlware
router.use(authenticateToken);

router.post('/composeMail', UserMailController.composeMail);


export default router;
