import { Router } from 'express';
// import { getAllcontacts, getContactById } from '../services/contacts.js';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  pathContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { ctrWrapper } from '../utils/ctrWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js'

const router = Router();
router.use(authenticate);

router.get('/', ctrWrapper(getContactsController));
router.get('/:contactId',isValidId, ctrWrapper(getContactByIdController));
router.post(
  '/',
  validateBody(createContactSchema),
  ctrWrapper(createContactController),
);
router.patch(
  '/:contactId', isValidId,
  validateBody(updateContactSchema),
  ctrWrapper(pathContactController),
);
router.delete('/:contactId', ctrWrapper(deleteContactController));

router.post(
  '/',
  isValidId,
  upload.single('photo'), 
  validateBody(createContactSchema),
  ctrWrapper(createContactController),
);

router.patch(
  '/:contactId',
  isValidId,
  upload.single('photo'), 
  validateBody(updateContactSchema),
  ctrWrapper(pathContactController),
);


export default router;
