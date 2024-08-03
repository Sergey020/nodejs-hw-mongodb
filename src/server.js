//В ньому буде знаходитись логіка роботи вашого express-серверу.
import cors from 'cors';
import express from 'express';
import pino from 'pino-http';
import dotenv from 'dotenv';

import { env } from './utils/env.js';
import { getAllcontacts, getContactById } from './servises/contacts.js';

dotenv.config();

const PORT = Number(env('PORT', '3000'));

export function setupServer() {
  const app = express();

//   app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.send('API is running');
  });

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllcontacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  // eslint-disable-next-line no-unused-vars
  app.get('/contacts/:contactId', async (req, res, next) => {
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

  // eslint-disable-next-line no-unused-vars
  app.use('*', (req, res, next) => {
    res.status(404).send({ status: 404, message: 'Route not found' });
  });

  // eslint-disable-next-line no-unused-vars
  app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).send({ status: 500, message: 'Internal Server Error' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
