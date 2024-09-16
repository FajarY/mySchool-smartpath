"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = void 0;
const express = __importStar(require("express"));
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
const lib = __importStar(require("./modules/lib"));
const index_1 = __importDefault(require("./routes/index"));
const api_1 = __importDefault(require("./routes/api"));
const login_1 = __importDefault(require("./routes/login"));
const register_1 = __importDefault(require("./routes/register"));
dotenv.config();
const app = express.default();
app.use(lib.httpRequestListener);
app.use(express.json());
app.use('/', index_1.default);
app.use('/login', login_1.default);
app.use('/register', register_1.default);
app.use('/api', api_1.default);
//For statics
const staticPath = path_1.default.join(__dirname, 'static');
app.use(express.static(staticPath));
app.use(lib.notFoundHandler);
exports.PORT = undefined;
const server = app.listen(Number(process.env.SERVER_PORT), process.env.SERVER_HOST, () => {
    const address = server.address();
    exports.PORT = address.port;
    console.log(`Server started on ${address.address}, ${address.port}`);
});
