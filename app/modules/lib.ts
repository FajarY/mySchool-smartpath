import { Request, Response, NextFunction } from "express";

export function httpRequestListener(req : Request, res : Response, next : NextFunction)
{
    console.log(`[Info] Incoming ${req.method} ${req.path}`);

    next();
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