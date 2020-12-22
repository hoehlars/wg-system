import BodyParser from 'body-parser';
import cors from 'cors';
import Express from 'express';
import HTTP from 'http';
import { errorHandler } from './expressErrorHandler';


import { logger } from './logger';
import { registerRoutes } from './routes';

const port = 5000;

const express = Express();
const server = new HTTP.Server(express);


express.use(BodyParser.json());
express.use(BodyParser.urlencoded({ extended: true }));
express.use(cors());

registerRoutes(express);

express.use(errorHandler);

server.listen(port, () => {
  logger.info(`Listening on ${port}`);
});
