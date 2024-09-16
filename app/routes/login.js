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
const router = express_1.default.Router();
const loginHtmlPath = path_1.default.join(path_1.default.resolve(__dirname, '../'), 'static/login.html');
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
    res.status(201).json({ message: 'Success!' });
}));
exports.default = router;
