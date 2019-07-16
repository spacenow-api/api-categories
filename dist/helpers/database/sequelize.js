"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const config = __importStar(require("../../config"));
const models_1 = require("./../../models");
let sequelize;
const initialize = () => {
    if (!sequelize) {
        console.debug('Initializing database.');
        sequelize = new sequelize_typescript_1.Sequelize({
            dialect: 'mysql',
            host: config.dbHost,
            database: config.dbSchema,
            username: config.dbUsername,
            password: config.dbPassword,
            logging: config.DEBUG ? console.debug : false
        });
        sequelize.addModels(models_1.arrayOfModels);
    }
};
exports.default = { initialize };
