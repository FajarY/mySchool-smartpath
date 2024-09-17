"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentApi_1 = __importDefault(require("./api/studentApi"));
const teacherApi_1 = __importDefault(require("./api/teacherApi"));
const classApi_1 = __importDefault(require("./api/classApi"));
const lib_1 = require("../modules/lib");
const router = express_1.default.Router();
router.use('/student', lib_1.tokenParser, studentApi_1.default);
router.use('/teacher', lib_1.tokenParser, teacherApi_1.default);
router.use('/class', lib_1.tokenParser, classApi_1.default);
exports.default = router;
