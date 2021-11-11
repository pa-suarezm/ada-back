import { Router } from 'express'

const router: Router = Router();

import { TokenValidation } from '../src/libs/verifyToken';

import { signup, signin, profile } from '../src/controllers/auth.controller';

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile',TokenValidation, profile);

export default router;
