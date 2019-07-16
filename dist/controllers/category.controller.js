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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sequelize_error_middleware_1 = __importDefault(require("../helpers/middlewares/sequelize-error-middleware"));
const auth_middleware_1 = __importDefault(require("../helpers/middlewares/auth-middleware"));
const models_1 = require("../models");
class CategoryController {
    constructor() {
        this.path = "/categories";
        this.router = express_1.Router();
        this.getRootCategories = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield models_1.Category.findAll({
                    where: { parentId: null }
                });
                response.send(categories);
            }
            catch (error) {
                sequelize_error_middleware_1.default(error, request, response, next);
            }
        });
        this.getCategory = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield models_1.Category.findOne({
                    where: { id: request.params.id },
                    include: [{ model: models_1.Category, as: "children" }]
                });
                response.send(category);
            }
            catch (error) {
                sequelize_error_middleware_1.default(error, request, response, next);
            }
        });
        this.createCategory = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const data = request.body;
            try {
                const category = yield models_1.Category.create(data);
                response.send(category);
            }
            catch (error) {
                sequelize_error_middleware_1.default(error, request, response, next);
            }
        });
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get(this.path, this.getRootCategories);
        this.router.get(`${this.path}/:id`, this.getCategory);
        this.router.post(this.path, auth_middleware_1.default, this.createCategory);
        this.router.patch(this.path, auth_middleware_1.default, this.createCategory);
    }
}
exports.default = CategoryController;
