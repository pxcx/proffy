import {Request, Response} from 'express';

import db from "../database/connection";
import convertHourToMinutes from "../utils/convertHourToMinutes";

// schedule type
interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController {
    // list classes according query params
    async index(request: Request, response: Response) {
        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if(!week_day || !subject || !time) {
            return response.status(400).json({
                status: 'error',
                message: 'Missing filters to search classes'
            })
        }

        const timeInMinutes = convertHourToMinutes(time);

        try{
            const classes = await db('classes')
                .whereExists(function() {
                    this.select('class_schedule.*')
                        .from('class_schedule')
                        .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                        .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                        .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                        .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
                })
                .where('classes.subject', '=', subject)
                .join('users', 'classes.user_id', '=', 'users.id')
                .select(['classes.*', 'users.*']);

            return response.json(classes);
        } catch (error) {
            // returning error
            return response.status(400).json({ status: 'error', message: error.message, error});
        }
    }

    // create a user, a classe and add class schedule to database
    async create(request: Request, response: Response) {
        // capturing data from request
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;

        // creating transaction
        const trx = await db.transaction();

        try{
            // inserting data from user in users table
            const insertedUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio
            });
            // getting inserted user id
            const user_id = insertedUsersIds[0];

            // inserting data from class in classes table
            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id
            });
            // getting inserted class id
            const class_id = insertedClassesIds[0];

            // preparing data for class schecedule
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                };
            })

            // inserting data from class schedule in class_schedule table
            await trx('class_schedule').insert(classSchedule);

            // commit
            await trx.commit();

            // returning success
            return response.status(201).json({ status: 'success' });
        } catch (error) {
            // rollback
            await trx.rollback();

            // returning error
            return response.status(400).json({ status: 'error', message: error.message, error});
        }
    }
}