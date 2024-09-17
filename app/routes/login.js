"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const lib_1 = require("../modules/lib");
const student_1 = __importDefault(require("../models/student"));
const teacher_1 = __importDefault(require("../models/teacher"));
const router = express_1.default.Router();
const loginHtmlPath = path_1.default.join(path_1.default.resolve(__dirname, '../'), 'static/login.html');
;
router.get('/', (req, res) => {
    fs_1.default.readFile(loginHtmlPath, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error!' });
        }
        else {
            res.status(201).send(data.toString());
        }
    });
});
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginType = req.body.loginType;
        console.log(req.body);
        if (loginType) {
            if (loginType === 'student') {
                const data = req.body;
                if (data.id && data.password) {
                    const getData = yield student_1.default.findById(data.id);
                    const secretKey = process.env.JWT_SECRET;
                    if (getData && getData.password && secretKey && (yield bcryptjs_1.default.compare(data.password, getData.password))) {
                        const tokenData = {
                            loginType: loginType,
                            id: getData.id
                        };
                        const token = jsonwebtoken_1.default.sign(tokenData, secretKey, { expiresIn: '1h' });
                        res.status(201).json({ token });
                    }
                    else {
                        handleInvalidCredentials(res);
                    }
                }
                else {
                    handleInvalidCredentials(res);
                }
            }
            else if (loginType === 'teacher') {
                const data = req.body;
                if (data.id && data.password) {
                    const getData = yield teacher_1.default.findById(data.id);
                    const secretKey = process.env.JWT_SECRET;
                    if (getData && getData.password && secretKey && (yield bcryptjs_1.default.compare(data.password, getData.password))) {
                        const tokenData = {
                            loginType: loginType,
                            id: getData.id
                        };
                        const token = jsonwebtoken_1.default.sign(tokenData, secretKey, { expiresIn: '1h' });
                        res.status(201).json({ token });
                    }
                    else {
                        handleInvalidCredentials(res);
                    }
                }
                else {
                    handleInvalidCredentials(res);
                }
            }
            else {
                handleInvalidCredentials(res);
            }
        }
        else {
            handleInvalidCredentials(res);
        }
    }
    catch (err) {
        const error = {
            message: 'Error for incoming register!',
            body: req.body
        };
        console.error(err);
        (0, lib_1.handleDefaultResponseError)(res, err);
    }
}));
function handleInvalidCredentials(res) {
    res.status(401).json({ message: 'Invalid credentials!' });
}
exports.default = router;
