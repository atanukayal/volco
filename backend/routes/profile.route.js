import express, { Router } from 'express';
import authmiddleware from '../middlewares/authmiddleware';
import { updateProfile } from '../controllers/profile.controller';
import upload from "../middleware/multer.config.js";

const router = Router();

router.put('/profile-set', authmiddleware ,upload.single("avatar"),updateProfile);

export default router;