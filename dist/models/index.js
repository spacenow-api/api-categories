"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_model_1 = require("./category.model");
exports.Category = category_model_1.Category;
const listSettings_model_1 = require("./listSettings.model");
exports.ListSettings = listSettings_model_1.ListSettings;
const listSettingsParent_model_1 = require("./listSettingsParent.model");
exports.ListSettingsParent = listSettingsParent_model_1.ListSettingsParent;
const subcategoryBookingPeriod_model_1 = require("./subcategoryBookingPeriod.model");
exports.SubcategoryBookingPeriod = subcategoryBookingPeriod_model_1.SubcategoryBookingPeriod;
exports.arrayOfModels = [
    category_model_1.Category,
    listSettings_model_1.ListSettings,
    listSettingsParent_model_1.ListSettingsParent,
    subcategoryBookingPeriod_model_1.SubcategoryBookingPeriod
];
