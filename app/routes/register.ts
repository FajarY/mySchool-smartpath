import express from 'express'
import fs from 'fs';
import path from 'path';
import { PORT } from '../app';

import student, { Student } from '../models/student';
import teacher, { Teacher } from '../models/teacher';

import { handleDefaultResponseError } from '../modules/lib';

const router = express.Router();
const registerHtmlPath = path.join(path.resolve(__dirname, '../'), 'static/register.html');

router.get('/', (req, res) =>
{
    fs.readFile(registerHtmlPath, (err, data) =>
    {
        if(err)
        {
            console.error(err);
            res.status(500).json({ message:'Internal server error!' });
        }
        else
        {
            res.status(201).send(data.toString());
        }
    });
});
router.post('/', async (req, res) =>
{
    const inputType : string | undefined = req.body.registerType;
    
    if(inputType === 'student')
    {
        const data : Partial<Student> = req.body;
        if(data.name && data.password)
        {
            try
            {
                const createdData = await student.create(data.name, data.password);
                const partialData : Partial<Student> = createdData;
                partialData.password = undefined;
                partialData.register_time = undefined;

                res.status(400).json(partialData);
            }
            catch(err)
            {
                handleDefaultResponseError(res, err, 'Failed on registering, server error or invalid input!');
            }
        }
        else
        {
            res.status(400).json({ message:'Failed on parsing input!' });
        }
    }
    else if(inputType === 'teacher')
    {
        const data : Partial<Teacher> = req.body;
        if(data.name && data.password)
        {
            try
            {
                const createdData = await teacher.create(data.name, data.password);
                const partialData : Partial<Teacher> = createdData;
                partialData.password = undefined;
                partialData.register_time = undefined;

                res.status(400).json(partialData);
            }
            catch(err)
            {
                handleDefaultResponseError(res, err, 'Failed on registering, server error or invalid input!');
            }
        }
        else
        {
            res.status(400).json({ message:'Failed on parsing input!' });
        }
    }
    else
    {
        const err =
        {
            message:'Error for incoming register!',
            body:req.body
        }
        console.error(err);
        res.status(400).json({ message:'Could not process request!' });
    }
});

export default router;