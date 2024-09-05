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

import { resetPasswordSchema } from '../validation/auth.js';
import { resetPasswordController } from '../controllers/auth.js';

import { getGoogleOAuthUrlController } from '../controllers/auth.js';

const router = Router();

router.get('/get-oauth-url',
  ctrWrapper(getGoogleOAuthUrlController)
);

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrWrapper(loginUserController),
);

router.post('/logout', ctrWrapper(logoutUserController));

router.post('/refresh', ctrWrapper(refreshUserSessionController));

router.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrWrapper(requestResetEmailController),
);

router.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrWrapper(resetPasswordController),
);

export default router;
