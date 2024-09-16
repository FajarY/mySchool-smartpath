import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const indexHtmlPath = path.join(path.resolve(__dirname, '../'), 'static/index.html');

router.get('/', (req, res) =>
{
    fs.readFile(indexHtmlPath, (error, data) =>
    {
        if(error)
        {
            res.status(500);
            res.write(error.message);
            throw error;
        }
        else
        {
            res.status(200).writeHead(200, {'Content-Type' : 'text/html'}).write(data);
            res.end();
        }
    });
});

export default router;