"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const axios_1 = __importDefault(require("axios"));
const AuthenticationTokenMissingException_1 = __importDefault(require("../exceptions/AuthenticationTokenMissingException"));
const WrongAuthenticationTokenException_1 = __importDefault(require("../exceptions/WrongAuthenticationTokenException"));
const token_1 = __importDefault(require("../utils/token"));
const config = __importStar(require("./../../config"));
const fetchUserById = (id) => __awaiter(this, void 0, void 0, function* () {
    const res = yield axios_1.default.get(`${config.USERS_AUTHENTICATION_API_HOST}/users/legancy/${id}`);
    if (res && res.data) {
        const userData = res.data;
        return Promise.resolve(userData.email);
    }
    return Promise.reject();
});
function authMiddleware(req, _, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = token_1.default.get(req);
        if (token && token !== 'undefined') {
            const secret = process.env.JWT_SECRET || 'Spacenow';
            try {
                const { id } = yield jsonwebtoken_1.default.verify(token, secret);
                const email = yield fetchUserById(id);
                console.debug(`User ${email} verified.`);
                req.userIdDecoded = id;
                next();
            }
            catch (error) {
                next(new WrongAuthenticationTokenException_1.default());
            }
        }
        else {
            next(new AuthenticationTokenMissingException_1.default());
        }
    });
}
exports.default = authMiddleware;
