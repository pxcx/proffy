import {Request, Response} from 'express';
import db from '../database/connection';

export default class ConnectionsController {
    // return the count of all conenections
    async index(request: Request, response: Response) {
        try {
            // querying db to retrieve total of connections
            const totalConnections = await db('connections').count('* as total');
            const { total } = totalConnections[0];
            // return total
            return response.status(201).json({ status: 'success', total });
        } catch (error) {
            // returning error
            return response.status(400).json({ status: 'error', message: error.message, error});
        }
    }

    // add a connection
    async create(request: Request, response: Response) {
        try {
            // getting user_id from request
            const { user_id } = request.body;
            // inserting new connection
            await db('connections').insert({ user_id });
            // returning success
            return response.status(201).json({ status: 'success' });
        } catch (error) {
            // returning error
            return response.status(400).json({ status: 'error', message: error.message, error});
        }
    }
}