import { getAllcontacts, getContactById, } from '../services/contacts.js';
import createHttpError from 'http-errors';
import { createContact} from '../services/contacts.js';

export const getContactsController = async (req, res) => {
    const contacts = await getAllcontacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  };

// eslint-disable-next-line no-unused-vars
export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController  = async (req,res) => {
  const contact = await createContact(req.body);
  res.status(200).json({
    status: 201,
    message: `Successfully created a contact`,
    data: contact,
  });
};

