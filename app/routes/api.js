"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentApi_1 = __importDefault(require("./api/studentApi"));
const teacherApi_1 = __importDefault(require("./api/teacherApi"));
const classApi_1 = __importDefault(require("./api/classApi"));
const router = express_1.default.Router();
router.use('/student', studentApi_1.default);
router.use('/teacher', teacherApi_1.default);
router.use('/class', classApi_1.default);
exports.default = router;
