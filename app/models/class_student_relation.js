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
;
const create = (class_id_ref, student_id_ref) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        class_id: class_id_ref,
        student_id: student_id_ref
    };
    const [class_id, student_id] = yield (0, knex_1.default)('class_student_relation').insert(data);
    return { class_id: class_id, student_id: student_id };
});
const findById = (class_id, student_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knex_1.default)('class_student_relation').where({ class_id, student_id }).first();
});
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knex_1.default)('class_student_relation').select('*');
});
const update = (class_id, student_id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, knex_1.default)('class_student_relation').where({ class_id, student_id }).update(data);
    return findById(data.class_id, data.student_id);
});
const del = (class_id, student_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knex_1.default)('class_student_relation').where({ class_id, student_id }).del();
});
exports.default = {
    create,
    findById,
    findAll,
    update,
    del
};
