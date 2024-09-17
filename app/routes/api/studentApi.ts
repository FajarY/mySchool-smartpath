import express from 'express';
import student, { Student } from '../../models/student';
import { getAs, handleError, handleDefaultResponseError } from '../../modules/lib';
import { JWTokenData } from '../login';

const router = express.Router();

router.post('/', async(req, res) =>
{
    try
    {
        const inputData : Partial<Student> = req.body;

        if(inputData.name && inputData.password)
        {
            const data : Student = await student.create(inputData.name, inputData.password);
            res.status(201).json(data);
        }
        else
        {
            res.status(400).json({ message:'Invalid input!' });
        }
    }
    catch(err)
    {
        handleDefaultResponseError(res, err);
    }
});

router.get('/:id', async (req, res) =>
{
    try
    {
        const id = Number(req.params.id.substring(1));
        var data : Student | null = null;

        const tokenData : JWTokenData = req.body.tokenData;

        if(Number.isSafeInteger(id))
        {
            if(tokenData.loginType !== 'student' || tokenData.id !== id)
            {
                res.status(400).json({ message:'Unauthorized' });
                return;
            }

            data = await student.findById(id);

            if(data)
            {
                res.status(201).json(data);
            }
            else
            {
                res.status(400).json({ message:'Student not found!' });
            }
        }
        else
        {
            res.status(400).json({ message:'Invalid params!' });
        }
    }
    catch(err)
    {
        handleDefaultResponseError(res, err);
    }
});

router.put('/:id', async (req, res) =>
{
    try
    {
        const id = Number(req.params.id.substring(1));
        const data : Partial<Student> = 
        {
            name: req.body.name,
            password: req.body.password
        }

        const tokenData : JWTokenData = req.body.tokenData;

        if(Number.isSafeInteger(id))
        {
            if(tokenData.loginType !== 'student' || tokenData.id !== id)
            {
                res.status(400).json({ message:'Unauthorized' });
                return;
            }

            const newData : Student = await student.update(id, data);

            if(newData)
            {
                res.status(201).json(newData);
            }
            else
            {
                res.status(400).json({ message:'Student not found!' });
            }
        }
        else
        {
            res.status(400).json({message:'Invalid params!'});
        }
    }
    catch(err)
    {
        handleDefaultResponseError(res, err);
    }
});

router.delete('/:id', async (req, res) =>
{
    try
    {
        const id = Number(req.params.id.substring(1));
        const tokenData : JWTokenData = req.body.tokenData;

        if(Number.isSafeInteger(id))
        {
            if(tokenData.loginType !== 'student' || tokenData.id !== id)
            {
                res.status(400).json({ message:'Unauthorized' });
                return;
            }

            const status : boolean = await student.del(id);
            if(status)
            {
                res.status(201).json({ status:status });
            }
            else
            {
                res.status(400).json({ message:'Student not found!' });
            }
        }
        else
        {
            res.status(400).json({message:'Student not found!'});
        }
    }
    catch(err)
    {
        handleDefaultResponseError(res, err);
    }
});

export default router;