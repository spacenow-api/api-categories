"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
var Category_1;
"use strict";
const sequelize_typescript_1 = require("sequelize-typescript");
const v4_1 = __importDefault(require("uuid/v4"));
let Category = Category_1 = class Category extends sequelize_typescript_1.Model {
    static generateId(instance) {
        return __awaiter(this, void 0, void 0, function* () {
            instance.id = v4_1.default();
        });
    }
    static generateSlug(instance) {
        return __awaiter(this, void 0, void 0, function* () {
            const a = "àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœøṕŕßśșțùúüûǘẃẍÿź·/_,:;";
            const b = "aaaaaaaaceeeeghiiiimnnnooooooprssstuuuuuwxyz------";
            const p = new RegExp(a.split("").join("|"), "g");
            instance.slug = instance.name
                .toString()
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(p, c => b.charAt(a.indexOf(c)))
                .replace(/&/g, "-and-")
                .replace(/[^\w\-]+/g, "")
                .replace(/\-\-+/g, "-")
                .replace(/^-+/, "")
                .replace(/-+$/, "");
        });
    }
};
__decorate([
    sequelize_typescript_1.IsUUID(4),
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Category.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.IsAlpha,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Category.prototype, "slug", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(true),
    sequelize_typescript_1.Default(null),
    sequelize_typescript_1.ForeignKey(() => Category_1),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Category.prototype, "parentId", void 0);
__decorate([
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Category.prototype, "order", void 0);
__decorate([
    sequelize_typescript_1.Default(true),
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Category.prototype, "isActive", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Category.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Category.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Category_1, "parentId"),
    __metadata("design:type", Object)
], Category.prototype, "children", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Category]),
    __metadata("design:returntype", Promise)
], Category, "generateId", null);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Category]),
    __metadata("design:returntype", Promise)
], Category, "generateSlug", null);
Category = Category_1 = __decorate([
    sequelize_typescript_1.Table
], Category);
exports.Category = Category;
