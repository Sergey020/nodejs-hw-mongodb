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
import { ctrWrapper } from '../utils/ctrWrapper.js';

const router = Router();

router.get('/', ctrWrapper(getContactsController));
router.get('/:contactId', ctrWrapper(getContactByIdController));
router.post(
  '/',
  validateBody(createContactSchema),
  ctrWrapper(createContactController),
);
router.patch(
  '/:contactId',
  validateBody(updateContactSchema),
  ctrWrapper(pathContactController),
);
router.delete('/:contactId', ctrWrapper(deleteContactController));

export default router;
