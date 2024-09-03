import {
  deleteContact,
  getAllcontacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { createContact } from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const { sortBy, sortOrder } = parseSortParams(req.query);

  const filter = { ...parseFilterParams(req.query), userId: req.user._id };

  const contacts = await getAllcontacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId:req.user._id
  });
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

// eslint-disable-next-line no-unused-vars
export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId, req.user._id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const contactData = { ...req.body, userId: req.user._id }; // додаємо userId до даних контакту
  const contact = await createContact(contactData);
  res.status(200).json({
    status: 201,
    message: `Successfully created a contact`,
    data: contact,
  });
};


export const pathContactController = async (req, res, next) => {
  console.log('Received body:', req.body);
  console.log('Received file:', req.file);
  
  const { contactId } = req.params;
  const photo = req.file;

  let photoUrl;
  if (photo) {
    photoUrl = await saveFileToUploadDir(photo);
  }
  const result = await updateContact(contactId, req.user._id, {
    ...req.body,
    photo: photoUrl,
  });
  //const contact = await updateContact(contactId, req.user._id, req.body);
  if (!result) {
    next (createHttpError(404, 'Contact not found'));
    return;
  }
  res.json({
    status: 200,
    message: `Successfully patched a contact`,
    data: result.contact,
  });
};

// eslint-disable-next-line no-unused-vars
export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId, req.user._id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(202).send();
};
