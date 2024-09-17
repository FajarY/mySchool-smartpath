"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpRequestListener = httpRequestListener;
exports.tokenParser = tokenParser;
exports.notFoundHandler = notFoundHandler;
exports.getAs = getAs;
exports.handleError = handleError;
exports.handleDefaultResponseError = handleDefaultResponseError;
exports.verifyType = verifyType;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function httpRequestListener(req, res, next) {
    console.log(`[Info] Incoming ${req.method} ${req.path}`);
    next();
}
function tokenParser(req, res, next) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.error(`[Info] Token parser cannot read secret!`);
        res.status(500).json({ message: 'Error on server!' });
        return;
    }
    const authArr = req.headers['authorization'];
    if (!authArr) {
        console.error(`[Info] Incoming request don't have authorization in header!`);
        res.status(400).json({ message: 'Unauthorized!' });
        return;
    }
    //Bearer {The Token}
    //So we split (' ') and take the second item
    const token = authArr.split(' ')[1];
    if (!token) {
        console.error(`[Info] Token parser cannot read incoming token!`);
        res.status(400).json({ message: 'Unauthorized!' });
        return;
    }
    jsonwebtoken_1.default.verify(token, secret, (error, payload) => {
        if (error) {
            console.error(error);
            res.status(400).json({ message: 'Unautorized!' });
        }
        else {
            console.log(`[Info] With token ${req.method} ${req.path}`);
            req.body.tokenData = verifyType(payload);
            next();
        }
    });
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
function verifyType(data) {
    const val = data;
    if (val) {
        return val;
    }
    throw new Error('Cannot verify type!');
}
