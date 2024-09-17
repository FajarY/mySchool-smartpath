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
const knex_1 = __importDefault(require("./knex"));
const create = function (name, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = {
            name: name,
            password: password,
            register_time: new Date(Date.now())
        };
        const [id] = yield (0, knex_1.default)('student').insert(data);
        return findById(id);
    });
};
const findById = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, knex_1.default)('student').where('id', id).first();
        return data;
    });
};
const findAll = function () {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, knex_1.default)('student').select('*');
    });
};
const count = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, knex_1.default)('student').count('* as count');
        const count = result[0].count;
        return Number(count);
    });
};
const update = function (id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, knex_1.default)('student').where('id', id).update(data);
        return findById(id);
    });
};
const del = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, knex_1.default)('student').where('id', id).del();
    });
};
exports.default = {
    create,
    findById,
    findAll,
    count,
    update,
    del
};
