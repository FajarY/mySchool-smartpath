import express from 'express';
import student, { Student } from '../../models/student';
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
            const data : Student = await student.create(name, password);
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
        if(Number.isSafeInteger(id))
        {
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
            name:getAs<string>(req.body.name, 'string'),
            password:getAs<string>(req.body.password, 'string')
        }
        if(Number.isSafeInteger(id))
        {
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

        if(id)
        {
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