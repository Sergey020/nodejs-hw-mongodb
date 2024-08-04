import { Router } from "express";
import {getAllcontacts, getContactById} from "../servises/contacts.js";
import {
    getContactsController,
    getContactsByIdController,
} from '../controllers/contacts.js';

const router = Router();

router.get('/contacts', getContactsController);
router.get('/contatcs/:contactId', getContactsByIdController)

router.get('/contacts', async (req, res) => {
    const contacts = await getAllcontacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  // eslint-disable-next-line no-unused-vars
  router.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      res.status(404).json({
        message: 'Contact not found',
      });
      return;
    }
    res.status(200).json({
      status: 200,
      message: 'Successfully found contact with id {**contactId**}!',
      data: contact,
    });
  });

export default router;