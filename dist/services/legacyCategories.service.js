"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./../models");
class LegacyCategoriesService {
    fetchCategories(index, categories, tree) {
        return __awaiter(this, void 0, void 0, function* () {
            const reference = Array.from(tree);
            if (index < categories.length) {
                const category = categories[index];
                const subCategories = yield models_1.ListSettingsParent.findAll({
                    where: { listSettingsParentId: category.id },
                    raw: true
                });
                const subReference = yield this.fetchSubCategories(subCategories);
                reference.push(Object.assign({}, category, { subCategories: [...subReference] }));
                return this.fetchCategories(++index, categories, reference);
            }
            return reference;
        });
    }
    fetchSubCategories(subCategories) {
        return __awaiter(this, void 0, void 0, function* () {
            const subCategoriesData = [];
            for (const subCategory of subCategories) {
                const subObj = yield models_1.ListSettings.findOne({
                    where: { id: subCategory.listSettingsChildId },
                    raw: true
                });
                const bookingPeriodObj = yield models_1.SubcategoryBookingPeriod.findOne({
                    where: { listSettingsParentId: subCategory.id },
                    raw: true
                });
                if (bookingPeriodObj)
                    subCategoriesData.push(Object.assign({}, subObj, { bookingPeriod: bookingPeriodObj }));
            }
            return subCategoriesData;
        });
    }
}
exports.default = LegacyCategoriesService;
