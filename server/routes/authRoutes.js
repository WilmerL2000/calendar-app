import express from 'express';
import {
  createUser,
  loginUser,
  revalidateToken,
} from '../controllers/authController.js';
import validateJWT from '../middleware/validateJWT.js';

const router = express.Router();

router.post('/new', createUser);
router.post('/', loginUser);
router.get('/renew', validateJWT, revalidateToken);

export default router;
