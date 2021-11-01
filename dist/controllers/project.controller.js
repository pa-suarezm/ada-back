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
exports.getAll = exports.create = void 0;
const Project_1 = __importDefault(require("../models/Project"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { user, type, name, date_delivery } = req.body;
        let newProject = new Project_1.default({
            user,
            type: type,
            name,
            date_delivery
        });
        let responSave = yield newProject.save();
        res.status(201).json(responSave);
    }
    catch (err) {
        res.status(401).json(err);
    }
});
exports.create = create;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let allProjects = yield Project_1.default.find({});
        res.status(200).json(allProjects);
    }
    catch (err) {
        res.status(401).json(err);
    }
});
exports.getAll = getAll;
//# sourceMappingURL=project.controller.js.map