import { Router } from 'express';
// import { getAllcontacts, getContactById } from '../services/contacts.js';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  pathContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrWrapper } from '../utils/ctrWrapper.js';

const router = Router();

router.get('/', ctrWrapper(getContactsController));
router.get('/:contactId', ctrWrapper(getContactByIdController));
router.post('/', ctrWrapper(createContactController));
router.patch('/:contactId', ctrWrapper(pathContactController));
router.delete('/:contactId', ctrWrapper(deleteContactController));

export default router;
