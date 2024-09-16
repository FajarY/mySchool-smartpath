"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpRequestListener = httpRequestListener;
exports.notFoundHandler = notFoundHandler;
exports.getAs = getAs;
exports.handleError = handleError;
exports.handleDefaultResponseError = handleDefaultResponseError;
function httpRequestListener(req, res, next) {
    console.log(`[Info] Incoming ${req.method} ${req.path}`);
    next();
}
function notFoundHandler(req, res, next) {
    res.status(404);
    res.end();
    console.log(`[404] Incoming request not found handled ${req.path}`);
}
function getAs(body, type) {
    if (typeof body === type) {
        return body;
    }
    return undefined;
}
function handleError(err) {
    if (err instanceof Error) {
        const error = err;
        console.error(error);
        return error;
    }
    else {
        console.error('Unknown error occured!');
        return undefined;
    }
}
function handleDefaultResponseError(res, err, resMessage, resStatus) {
    var defaultResMessage = 'Internal server error';
    var defaultResStatus = 500;
    if (resMessage) {
        defaultResMessage = resMessage;
    }
    if (resStatus) {
        defaultResStatus = resStatus;
    }
    const errVal = handleError(err);
    res.status(defaultResStatus).json({ message: defaultResMessage });
    return errVal;
}
