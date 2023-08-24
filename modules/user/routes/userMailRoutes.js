import express from 'express';
import UserMailController from '../controllers/userMailController';
import { authenticateToken } from '../../../middleware/jwtAuthorization';

const router = express.Router();

router.post('/composeMail', UserMailController.composeMail);


export default router;
