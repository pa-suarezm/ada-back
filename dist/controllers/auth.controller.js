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
exports.holaMundo = exports.profile = exports.signin = exports.signup = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    // saving new user
    let { username, email, password } = req.body;
    const user = new User_1.default({
        username: username,
        email: email,
        password: password
    });
    user.password = yield user.encryptPassword(password);
    const saveUser = yield user.save();
    // create token
    const token = jsonwebtoken_1.default.sign({ _id: saveUser._id }, process.env.TOKEN_SECRET || 'holamundo');
    console.log('saveUser', saveUser);
    res.header('auth-token', token).json(saveUser);
});
exports.signup = signup;
// INICIAT SESION
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    let { email, password } = req.body;
    let user = yield User_1.default.findOne({ email: email });
    console.log('herr', user);
    if (!user) {
        return res.status(400).json('Usuario no encontrado');
    }
    let correctPassword = yield (user === null || user === void 0 ? void 0 : user.validatePassword(password));
    if (!correctPassword) {
        return res.status(400).json('Invalid password');
    }
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.TOKEN_SECRET || 'holamundo', {
        expiresIn: 60 * 60 * 24
    });
    return res.header('auth-token', token).json(user);
});
exports.signin = signin;
// Ver perfil
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('header', req.header('auth-token'));
    // Puedo hacer la validacion aca de auth token pero tocaría hacerlo en cada ruta y no es eficiente. Lo hacemos en libs/verifyToken
    const user = yield User_1.default.findById(req.userId, { password: 0 });
    if (!user)
        res.status(404).json('No user found');
    res.json(user);
    // res.send('Prueba PROFILE');
});
exports.profile = profile;
function holaMundo() {
    console.log(arguments);
}
exports.holaMundo = holaMundo;
//# sourceMappingURL=auth.controller.js.map