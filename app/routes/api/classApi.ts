import express from 'express';
import _class, { Class } from '../../models/class';
import { getAs, handleDefaultResponseError } from '../../modules/lib';
import { JWTokenData } from '../login';

const router = express.Router();

router.post('/', async (req, res) =>
{
    try
    {
        const data : Partial<Class> = req.body;
        const tokenData : JWTokenData = req.body.tokenData;
        if(tokenData.loginType !== 'teacher')
        {
            res.status(400).json({ message:'Unauthorized!' });
            return;
        }

        if(data.name && data.password && data.maximum_student_count && data.maximum_teacher_count)
        {
            const inputData : Class = await _class.create(data.name, data.password, data.maximum_student_count, data.maximum_teacher_count, data.description);

            res.status(201).json(inputData);
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
        const id : number = Number(req.params.id.substring(1));
        if(Number.isSafeInteger(id))
        {
            const data = await _class.findById(id);

            if(data)
            {
                res.status(201).json(data);
            }
            else
            {
                res.status(201).json({ message:'Class not found!' });
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
        const inputData : Partial<Class> = req.body;

        if(Number.isSafeInteger(id))
        {
            const data = await _class.update(id, inputData);
            if(data)
            {
                res.status(201).json(data);
            }
            else
            {
                res.status(400).json({ message:'Class not found!' });
            }
        }
        else
        {
            res.status(400).json({ message:'Invalid params!' })
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

        if(Number.isSafeInteger(id))
        {
            const status = await _class.del(id);
            if(status)
            {
                res.status(201).json({ status:status });
            }
            else
            {
                res.status(400).json({ message:'Class not found!' });
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

export default router;