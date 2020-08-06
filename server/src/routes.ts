import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();
const classesControllers = new ClassesController();
const connectionsControllers = new ConnectionsController();

// create a user, a classe and add class schedule to database
routes.post('/classes', classesControllers.create);

// list classes according query params
routes.get('/classes', classesControllers.index);

// add a connection
routes.post('/connections', connectionsControllers.create);

// return the count of all conenections
routes.get('/connections', connectionsControllers.index);

export default routes;