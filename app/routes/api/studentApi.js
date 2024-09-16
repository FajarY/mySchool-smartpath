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
const student_1 = __importDefault(require("../../models/student"));
const lib_1 = require("../../modules/lib");
const router = express_1.default.Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = (0, lib_1.getAs)(req.body.name, 'string');
        const password = (0, lib_1.getAs)(req.body.password, 'string');
        if (name && password) {
            const data = yield student_1.default.create(name, password);
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
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id.substring(1));
        var data = null;
        if (Number.isSafeInteger(id)) {
            data = yield student_1.default.findById(id);
            if (data) {
                res.status(201).json(data);
            }
            else {
                res.status(400).json({ message: 'Student not found!' });
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
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id.substring(1));
        const data = {
            name: (0, lib_1.getAs)(req.body.name, 'string'),
            password: (0, lib_1.getAs)(req.body.password, 'string')
        };
        if (Number.isSafeInteger(id)) {
            const newData = yield student_1.default.update(id, data);
            if (newData) {
                res.status(201).json(newData);
            }
            else {
                res.status(400).json({ message: 'Student not found!' });
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
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id.substring(1));
        if (id) {
            const status = yield student_1.default.del(id);
            if (status) {
                res.status(201).json({ status: status });
            }
            else {
                res.status(400).json({ message: 'Student not found!' });
            }
        }
        else {
            res.status(400).json({ message: 'Student not found!' });
        }
    }
    catch (err) {
        (0, lib_1.handleDefaultResponseError)(res, err);
    }
}));
exports.default = router;
