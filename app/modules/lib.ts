import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { JWTokenData } from "../routes/login";

export function httpRequestListener(req : Request, res : Response, next : NextFunction)
{
    console.log(`[Info] Incoming ${req.method} ${req.path}`);

    next();
}

export function tokenParser(req : Request, res : Response, next : NextFunction)
{
    const secret : string | undefined = process.env.JWT_SECRET;
    if(!secret)
    {
        console.error(`[Info] Token parser cannot read secret!`);
        res.status(500).json({ message:'Error on server!' });
        return;
    }

    const authArr = req.headers['authorization'];
    if(!authArr)
    {
        console.error(`[Info] Incoming request don't have authorization in header!`);
        res.status(400).json({ message:'Unauthorized!' });
        return;
    }
    //Bearer {The Token}
    //So we split (' ') and take the second item
    const token : string | undefined = authArr.split(' ')[1];

    if(!token)
    {
        console.error(`[Info] Token parser cannot read incoming token!`);
        res.status(400).json({ message:'Unauthorized!' });
        return;
    }
    jwt.verify(token, secret, (error, payload) =>
    {
        if(error)
        {
            console.error(error);
            res.status(400).json({ message:'Unautorized!' });
        }
        else
        {
            console.log(`[Info] With token ${req.method} ${req.path}`);
            req.body.tokenData = verifyType<JWTokenData>(payload);
            next();
        }
    });
}

export function notFoundHandler(req : Request, res : Response, next : NextFunction)
{
    res.status(404);
    res.end();

    console.log(`[404] Incoming request not found handled ${req.path}`);
}
export function getAs<T>(body : any, type : string) : T | undefined
{
    if(typeof body === type)
    {
        return body as T;
    }

    return undefined;
}
export function handleError(err : unknown) : Error | undefined
{
    if(err instanceof Error)
    {
        const error = err as Error;
        console.error(error);

        return error;
    }
    else
    {
        console.error('Unknown error occured!');
        return undefined;
    }
}
export function handleDefaultResponseError(res : Response, err : unknown, resMessage? : string, resStatus? : number) : Error | undefined
{
    var defaultResMessage = 'Internal server error';
    var defaultResStatus = 500;

    if(resMessage)
    {
        defaultResMessage = resMessage;
    }
    if(resStatus)
    {
        defaultResStatus = resStatus;
    }

    const errVal = handleError(err);
    res.status(defaultResStatus).json({ message: defaultResMessage });

    return errVal;
}

export function verifyType<T>(data : any) : T
{
    const val : T | undefined = data;

    if(val)
    {
        return val;
    }
    throw new Error('Cannot verify type!');
}