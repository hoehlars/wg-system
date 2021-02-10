import BodyParser from 'body-parser';
import cors from 'cors';
import Express from 'express';
import HTTP from 'http';
import { errorHandler } from './expressErrorHandler';
import mongoose from 'mongoose';
import { logger } from './logger';
import { registerRoutes } from './routes';

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
const db = mongoose.connection;
db.on('error', () => {
  logger.error('Failed to setup connection with DB');
})

db.once('open', () => {
  logger.info('Connected successfully to DB!')
})

const port = process.env.PORT || 5000;

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
