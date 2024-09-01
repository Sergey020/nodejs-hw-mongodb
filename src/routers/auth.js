import { Router } from 'express';
import { ctrWrapper } from '../utils/ctrWrapper.js';
import { registerUserSchema } from '../validation/auth.js';
import { registerUserController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

import { loginUserSchema } from '../validation/auth.js';
import { loginUserController } from '../controllers/auth.js';
import { logoutUserController } from '../controllers/auth.js';
import { refreshUserSessionController } from '../controllers/auth.js';

import { requestResetEmailSchema } from '../validation/auth.js';
import { requestResetEmailController } from '../controllers/auth.js';

const router = Router();

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrWrapper(loginUserController),
);
router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrWrapper(registerUserController),
);

router.post('/logout', ctrWrapper(logoutUserController));

router.post('/refresh', ctrWrapper(refreshUserSessionController));

router.post(
  '/request-reset-email',
  validateBody(requestResetEmailSchema),
  ctrWrapper(requestResetEmailController),
);

export default router;


