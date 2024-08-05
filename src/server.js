//В ньому буде знаходитись логіка роботи вашого express-серверу.
import cors from 'cors';
import express from 'express';
import pino from 'pino-http';
import dotenv from 'dotenv';

import contactsRouter from './routers/contacts.js'
import { env } from './utils/env.js';
import { errorHendler } from './middlewares/errorHendler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';


dotenv.config();

const PORT = Number(env('PORT', '3000'));

export function setupServer() {
  const app = express();

 app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
 app.use('/contacts', contactsRouter);

 app.use('*', notFoundHandler);

 app.use(errorHendler);


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
