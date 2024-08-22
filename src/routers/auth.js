import { Router } from "express";
import { ctrWrapper } from '../utils/ctrWrapper.js';
import { registerUserSchema } from "../validation/auth.js";
import { registerUserController } from "../controllers/auth.js";
import { validateBody } from '../middlewares/validateBody.js';

import { loginUserSchema } from "../validation/auth.js";
import { loginUserController } from "../controllers/auth.js";
import { logoutUserController } from "../controllers/auth.js";


const router = Router();

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

export default router;