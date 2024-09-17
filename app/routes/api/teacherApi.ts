import express from 'express';
import teacher, { Teacher } from '../../models/teacher';
import { getAs, handleError, handleDefaultResponseError } from '../../modules/lib';
import { JWTokenData } from '../login';
import { tokenParser } from '../../modules/lib';

const router = express.Router();

router.post('/', async(req, res) =>
{
    try
    {
        const inputData : Partial<Teacher> = req.body;

        if(inputData.name && inputData.password)
        {
            const data : Teacher = await teacher.create(inputData.name, inputData.password);

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

router.get('/count', async (req, res) =>
{
    try
    {
        res.status(201).json({ count:await teacher.count() });
    }
    catch(err)
    {
        handleDefaultResponseError(res, err);
    }
});

router.get('/:id', tokenParser, async (req, res) =>
{
    try
    {
        const id = Number(req.params.id.substring(1));
        var data : Teacher | null = null;
        const tokenData : JWTokenData = req.body.tokenData;

        if(Number.isSafeInteger(id))
        {
            if(tokenData.loginType !== 'teacher' || tokenData.id !== id)
            {
                res.status(400).json({ message:'Unauthorized!' });
                return;
            }
            data = await teacher.findById(id);

            if(data)
            {
                res.status(201).json(data);
            }
            else
            {
                res.status(400).json({ message:'Teacher not found!' });
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

router.put('/:id', tokenParser, async (req, res) =>
{
    try
    {
        const id = Number(req.params.id.substring(1));
        const data : Partial<Teacher> = 
        {
            name: req.body.name,
            password: req.body.password
        };

        data.id = undefined;
        data.register_time = undefined;

        const tokenData : JWTokenData = req.body.tokenData;
        if(Number.isSafeInteger(id))
        {
            if(tokenData.loginType !== 'teacher' || tokenData.id !== id)
            {
                res.status(400).json({ message:'Unauthorized!' });
                return;
            }

            const newData : Teacher = await teacher.update(id, data);

            if(newData)
            {
                res.status(201).json(newData);
            }
            else
            {
                res.status(400).json({ message:'Teacher not found!' });
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

router.delete('/:id', tokenParser, async (req, res) =>
{
    try
    {
        const id = Number(req.params.id.substring(1));
        const tokenData : JWTokenData = req.body.tokenData;

        if(Number.isSafeInteger(id))
        {
            if(tokenData.loginType !== 'teacher' || tokenData.id !== id)
            {
                res.status(400).json({ message:'Unauthorized!' });
                return;
            }

            const status : boolean = await teacher.del(id);
            if(status)
            {
                res.status(201).json({ status:status });
            }
            else
            {
                res.status(400).json({ message:'Teacher not found!' });
            }
        }
        else
        {
            res.status(400).json({message:'Teacher not found!'});
        }
    }
    catch(err)
    {
        handleDefaultResponseError(res, err);
    }
});

export default router;