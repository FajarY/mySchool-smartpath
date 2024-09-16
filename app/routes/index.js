"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
const indexHtmlPath = path_1.default.join(path_1.default.resolve(__dirname, '../'), 'static/index.html');
router.get('/', (req, res) => {
    fs_1.default.readFile(indexHtmlPath, (error, data) => {
        if (error) {
            res.status(500);
            res.write(error.message);
            throw error;
        }
        else {
            res.status(200).writeHead(200, { 'Content-Type': 'text/html' }).write(data);
            res.end();
        }
    });
});
exports.default = router;
