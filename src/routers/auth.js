import { Router } from "express";
import { ctrWrapper } from '../utils/ctrWrapper.js';
import { registerUserSchema } from "../validation/auth.js";
import { registerUserController } from "../controllers/auth.js";
import { validateBody } from '../middlewares/validateBody.js';


const router = Router();

router.post(
    '/register',
        validateBody(registerUserSchema),
        ctrWrapper(registerUserController),
);

export default router;