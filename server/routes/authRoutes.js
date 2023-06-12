import express from 'express';
import {
  createUser,
  loginUser,
  revalidateToken,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/new', createUser);
router.post('/', loginUser);
router.get('/renew', revalidateToken);

export default router;
