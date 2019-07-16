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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
let ListSettings = class ListSettings extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ListSettings.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ListSettings.prototype, "typeId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ListSettings.prototype, "itemName", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ListSettings.prototype, "otherItemName", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ListSettings.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ListSettings.prototype, "maximum", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ListSettings.prototype, "minimum", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ListSettings.prototype, "startValue", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ListSettings.prototype, "endValue", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ListSettings.prototype, "step", void 0);
__decorate([
    sequelize_typescript_1.Default('1'),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ListSettings.prototype, "isEnable", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ListSettings.prototype, "photo", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ListSettings.prototype, "photoType", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ListSettings.prototype, "isSpecification", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], ListSettings.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], ListSettings.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ListSettings.prototype, "specData", void 0);
ListSettings = __decorate([
    sequelize_typescript_1.Table({
        tableName: 'ListSettings'
    })
], ListSettings);
exports.ListSettings = ListSettings;
