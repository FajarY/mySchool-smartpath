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
const student_1 = __importDefault(require("../models/student"));
const teacher_1 = __importDefault(require("../models/teacher"));
const lib_1 = require("../modules/lib");
const router = express_1.default.Router();
const registerHtmlPath = path_1.default.join(path_1.default.resolve(__dirname, '../'), 'static/register.html');
router.get('/', (req, res) => {
    fs_1.default.readFile(registerHtmlPath, (err, data) => {
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
    const inputType = req.body.registerType;
    if (inputType === 'student') {
        const data = req.body;
        if (data.name && data.password) {
            try {
                data.password = yield bcryptjs_1.default.hash(data.password, 10);
                const createdData = yield student_1.default.create(data.name, data.password);
                const partialData = createdData;
                partialData.password = undefined;
                partialData.register_time = undefined;
                res.status(200).json(partialData);
            }
            catch (err) {
                (0, lib_1.handleDefaultResponseError)(res, err, 'Failed on registering, server error or invalid input!');
            }
        }
        else {
            res.status(400).json({ message: 'Failed on parsing input!' });
        }
    }
    else if (inputType === 'teacher') {
        const data = req.body;
        if (data.name && data.password) {
            try {
                data.password = yield bcryptjs_1.default.hash(data.password, 10);
                const createdData = yield teacher_1.default.create(data.name, data.password);
                const partialData = createdData;
                partialData.password = undefined;
                partialData.register_time = undefined;
                res.status(200).json(partialData);
            }
            catch (err) {
                (0, lib_1.handleDefaultResponseError)(res, err, 'Failed on registering, server error or invalid input!');
            }
        }
        else {
            res.status(400).json({ message: 'Failed on parsing input!' });
        }
    }
    else {
        const err = {
            message: 'Error for incoming register!',
            body: req.body
        };
        console.error(err);
        res.status(400).json({ message: 'Could not process request!' });
    }
}));
exports.default = router;
