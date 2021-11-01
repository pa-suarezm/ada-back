"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const project_controller_1 = require("../controllers/project.controller");
router.post('/create', project_controller_1.create);
router.get('/getAll', project_controller_1.getAll);
exports.default = router;
//# sourceMappingURL=project.js.map