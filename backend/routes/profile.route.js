import express, { Router } from 'express';
import authmiddleware from '../middlewares/authmiddleware';
import { updateProfile } from '../controllers/profile.controller';

const router = Router();

router.put('/profile-set', authmiddleware ,updateProfile);

export default router;