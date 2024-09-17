import express from 'express'
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { handleDefaultResponseError } from '../modules/lib';
import student, { Student } from '../models/student';

import { Request, Response, NextFunction } from "express";
import teacher, { Teacher } from '../models/teacher';

const router = express.Router();
const loginHtmlPath = path.join(path.resolve(__dirname, '../'), 'static/login.html');

export interface JWTokenData
{
    loginType : string,
    id : number
};

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
    try
    {
        const loginType : string | undefined = req.body.loginType;

        if(loginType)
        {
            if(loginType === 'student')
            {
                const data : Partial<Student> = req.body;
                if(data.id && data.password)
                {
                    const getData : Student = await student.findById(data.id);
                    const secretKey : string | undefined = process.env.JWT_SECRET;
                    if(getData && getData.password && secretKey && await bcrypt.compare(data.password, getData.password))
                    {
                        const tokenData : JWTokenData =
                        {
                            loginType: loginType,
                            id: getData.id
                        };
                        const token : string = jwt.sign(tokenData, secretKey,
                            { expiresIn:'1h' }
                        );
                        res.status(201).json({ token });
                    }
                    else
                    {
                        handleInvalidCredentials(res);
                    }
                }
                else
                {
                    handleInvalidCredentials(res);
                }
            }
            else if(loginType === 'teacher')
            {
                const data : Partial<Teacher> = req.body;
                if(data.id && data.password)
                {
                    const getData : Teacher = await teacher.findById(data.id);
                    const secretKey : string | undefined = process.env.JWT_SECRET;
                    if(getData && getData.password && secretKey && await bcrypt.compare(data.password, getData.password))
                    {
                        const tokenData : JWTokenData =
                        {
                            loginType: loginType,
                            id: getData.id
                        };
                        const token : string = jwt.sign(tokenData, secretKey,
                            { expiresIn:'1h' }
                        );
                        res.status(201).json({ token });
                    }
                    else
                    {
                        handleInvalidCredentials(res);
                    }
                }
                else
                {
                    handleInvalidCredentials(res);
                }
            }
            else
            {
                handleInvalidCredentials(res);
            }
        }
        else
        {
            handleInvalidCredentials(res);
        }
    }
    catch(err)
    {
        const error =
        {
            message:'Error for incoming register!',
            body:req.body
        }
        console.error(err);
        handleDefaultResponseError(res, err);
    }
});

function handleInvalidCredentials(res : Response)
{
    res.status(401).json({ message:'Invalid credentials!' });
}

export default router;