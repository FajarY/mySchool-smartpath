import express from 'express';
import teacher, { Teacher } from '../../models/teacher';
import { getAs, handleError, handleDefaultResponseError } from '../../modules/lib';

const router = express.Router();

router.post('/', async(req, res) =>
{
    try
    {
        const name : string | undefined = getAs<string>(req.body.name, 'string');
        const password : string | undefined = getAs<string>(req.body.password, 'string');
        if(name && password)
        {
            const data : Teacher = await teacher.create(name, password);

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
        var data : Teacher | null = null;
        if(Number.isSafeInteger(id))
        {
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

router.put('/:id', async (req, res) =>
{
    try
    {
        const id = Number(req.params.id.substring(1));
        const data : Partial<Teacher> =
        {
            name:getAs<string>(req.body.name, 'string'),
            password:getAs<string>(req.body.password, 'string')
        }
        if(Number.isSafeInteger(id))
        {
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

router.delete('/:id', async (req, res) =>
{
    try
    {
        const id = Number(req.params.id.substring(1));

        if(id)
        {
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