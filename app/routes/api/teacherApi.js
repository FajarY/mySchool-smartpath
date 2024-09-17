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
const teacher_1 = __importDefault(require("../../models/teacher"));
const lib_1 = require("../../modules/lib");
const lib_2 = require("../../modules/lib");
const router = express_1.default.Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inputData = req.body;
        if (inputData.name && inputData.password) {
            const data = yield teacher_1.default.create(inputData.name, inputData.password);
            res.status(201).json(data);
        }
        else {
            res.status(400).json({ message: 'Invalid input!' });
        }
    }
    catch (err) {
        (0, lib_1.handleDefaultResponseError)(res, err);
    }
}));
router.get('/count', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(201).json({ count: yield teacher_1.default.count() });
    }
    catch (err) {
        (0, lib_1.handleDefaultResponseError)(res, err);
    }
}));
router.get('/:id', lib_2.tokenParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id.substring(1));
        var data = null;
        const tokenData = req.body.tokenData;
        if (Number.isSafeInteger(id)) {
            if (tokenData.loginType !== 'teacher' || tokenData.id !== id) {
                res.status(400).json({ message: 'Unauthorized!' });
                return;
            }
            data = yield teacher_1.default.findById(id);
            if (data) {
                res.status(201).json(data);
            }
            else {
                res.status(400).json({ message: 'Teacher not found!' });
            }
        }
        else {
            res.status(400).json({ message: 'Invalid params!' });
        }
    }
    catch (err) {
        (0, lib_1.handleDefaultResponseError)(res, err);
    }
}));
router.put('/:id', lib_2.tokenParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id.substring(1));
        const data = {
            name: req.body.name,
            password: req.body.password
        };
        data.id = undefined;
        data.register_time = undefined;
        const tokenData = req.body.tokenData;
        if (Number.isSafeInteger(id)) {
            if (tokenData.loginType !== 'teacher' || tokenData.id !== id) {
                res.status(400).json({ message: 'Unauthorized!' });
                return;
            }
            const newData = yield teacher_1.default.update(id, data);
            if (newData) {
                res.status(201).json(newData);
            }
            else {
                res.status(400).json({ message: 'Teacher not found!' });
            }
        }
        else {
            res.status(400).json({ message: 'Invalid params!' });
        }
    }
    catch (err) {
        (0, lib_1.handleDefaultResponseError)(res, err);
    }
}));
router.delete('/:id', lib_2.tokenParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id.substring(1));
        const tokenData = req.body.tokenData;
        if (Number.isSafeInteger(id)) {
            if (tokenData.loginType !== 'teacher' || tokenData.id !== id) {
                res.status(400).json({ message: 'Unauthorized!' });
                return;
            }
            const status = yield teacher_1.default.del(id);
            if (status) {
                res.status(201).json({ status: status });
            }
            else {
                res.status(400).json({ message: 'Teacher not found!' });
            }
        }
        else {
            res.status(400).json({ message: 'Teacher not found!' });
        }
    }
    catch (err) {
        (0, lib_1.handleDefaultResponseError)(res, err);
    }
}));
exports.default = router;
