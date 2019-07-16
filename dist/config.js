"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.DEBUG = process.env.DEBUG ? Boolean(process.env.DEBUG) : false;
exports.PORT = process.env.PORT ? parseInt(process.env.PORT) : 6003;
// Database Parameters
exports.dbSchema = process.env.DATABASE_SCHEMA;
exports.dbUsername = process.env.DATABASE_USERNAME;
exports.dbPassword = process.env.DATABASE_PASSWORD;
exports.dbHost = process.env.DATABASE_HOST;
exports.USERS_AUTHENTICATION_API_HOST = process.env.USERS_API_HOST || "http://localhost:6001";
