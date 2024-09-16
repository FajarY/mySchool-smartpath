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
const create = (name, password, maximum_student_count, maximum_teacher_count, description) => __awaiter(void 0, void 0, void 0, function* () {
    const inputData = {
        name: name,
        password: password,
        description: description,
        created_time: new Date(Date.now()),
        maximum_student_count: maximum_student_count,
        maximum_teacher_count: maximum_teacher_count
    };
    const [id] = yield (0, knex_1.default)('class').insert(inputData);
    return findById(id);
});
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knex_1.default)('class').where('id', id).first();
});
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knex_1.default)('class').select('*');
});
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, knex_1.default)('class').update(data).where('id', id);
    return findById(id);
});
const del = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knex_1.default)('class').where('id', id).del();
});
exports.default = {
    create,
    findById,
    findAll,
    update,
    del
};
