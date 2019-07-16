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
const memory_cache_1 = __importDefault(require("memory-cache"));
const sequelize_error_middleware_1 = __importDefault(require("../helpers/middlewares/sequelize-error-middleware"));
const legacyCategories_service_1 = __importDefault(require("../services/legacyCategories.service"));
const models_1 = require("../models");
const REFERENCE_CATEGORIES_ID = 111;
class LegacyCategoriesController {
    constructor() {
        this.service = new legacyCategories_service_1.default();
        this.router = express_1.Router();
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get(`/categories/legacy`, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const key = "__categories__" + req.originalUrl || req.url;
            const cachedResponse = memory_cache_1.default.get(key);
            if (cachedResponse) {
                res.send(cachedResponse);
            }
            else {
                try {
                    const categories = yield models_1.ListSettings.findAll({
                        where: { typeId: REFERENCE_CATEGORIES_ID },
                        raw: true
                    });
                    const categoriesTree = yield this.service.fetchCategories(0, categories, []);
                    console.debug(`New Category cache defined: ${key}`);
                    memory_cache_1.default.put(key, categoriesTree, 1 * 3.6e6); // Expire in 1 hour.
                    res.send(categoriesTree);
                }
                catch (error) {
                    sequelize_error_middleware_1.default(error, req, res, next);
                }
            }
        }));
    }
}
exports.default = LegacyCategoriesController;
