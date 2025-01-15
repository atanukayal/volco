import express, { Router } from 'express';
import auth from '../middlewares/authmiddleware';
import { updateProfile } from '../controllers/profile.controller';

const router = Router();

router.put('/profile-set', auth,updateProfile);

export default router;