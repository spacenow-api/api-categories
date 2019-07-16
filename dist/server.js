"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const App_1 = __importDefault(require("./App"));
const category_controller_1 = __importDefault(require("./controllers/category.controller"));
const legacyCategories_controller_1 = __importDefault(require("./controllers/legacyCategories.controller"));
const app = new App_1.default([new category_controller_1.default(), new legacyCategories_controller_1.default()], config_1.PORT, '0.0.0.0');
app.listen();
