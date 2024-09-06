//В ньому буде знаходитись логіка роботи вашого express-серверу.
import cors from 'cors';
import express from 'express';
import pino from 'pino-http';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

//import contactsRouter from './routers/contacts.js'
import router from './routers/index.js';
import { env } from './utils/env.js';
import { errorHendler } from './middlewares/errorHendler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { UPLOAD_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

dotenv.config();

const PORT = Number(env('PORT', '3000'));

export function startServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(router);
  app.use('/contacts', router);

  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());

  app.use('*', notFoundHandler);

  app.use(errorHendler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
