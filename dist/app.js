"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
//Routes
const auth_1 = __importDefault(require("./routes/auth"));
const project_1 = __importDefault(require("./routes/project"));
const app = express_1.default();
// settings
app.set('port', 8080);
//middlewares
app.use(morgan_1.default('dev'));
// Para formatear la data que noe llegue
app.use(express_1.default.json());
// routes
app.use('/api/auth', auth_1.default);
app.use('/api/project', project_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map