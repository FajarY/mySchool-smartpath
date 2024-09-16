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
const create = (name, content, class_id_reference) => __awaiter(void 0, void 0, void 0, function* () {
    const inputClassItem = {
        name: name,
        content: content,
        created_time: new Date(Date.now()),
        class_id: class_id_reference
    };
    const [id] = yield (0, knex_1.default)('class_item').insert(inputClassItem);
    return findById(id);
});
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knex_1.default)('class_item').where('id', id).first();
});
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knex_1.default)('class_item').select('*');
});
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, knex_1.default)('class_item').where('id', id).update(data);
    return findById(id);
});
const del = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knex_1.default)('class_item').where('id', id).del();
});
exports.default = {
    create,
    findById,
    findAll,
    update,
    del
};
