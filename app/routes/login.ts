import express from 'express'
import fs from 'fs';
import path from 'path';

const router = express.Router();
const loginHtmlPath = path.join(path.resolve(__dirname, '../'), 'static/login.html');

router.get('/', (req, res) =>
{
    fs.readFile(loginHtmlPath, (err, data) =>
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
    res.status(201).json({ message:'Success!' });
});

export default router;