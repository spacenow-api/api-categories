import {
  ListSettings,
  ListSettingsParent,
  SubcategoryBookingPeriod
} from './../models';

import {
  ICategoryLegacy,
  ISubCategoryLegacy
} from '../interfaces/category.interface';

class LegacyCategoriesService {
  public async fetchCategories(
    index: number,
    categories: Array<ICategoryLegacy>,
    tree: Array<ICategoryLegacy>
  ): Promise<Array<ICategoryLegacy>> {
    const reference = Array.from(tree);
    if (index < categories.length) {
      const category = categories[index];
      const subCategories = await ListSettingsParent.findAll({
        where: { listSettingsParentId: category.id },
        raw: true
      });
      const subReference = await this.fetchSubCategories(subCategories);
      reference.push({
        ...category,
        subCategories: [...subReference]
      });
      return this.fetchCategories(++index, categories, reference);
    }
    return reference;
  }

  private async fetchSubCategories(
    subCategories: Array<ListSettingsParent>
  ): Promise<Array<ISubCategoryLegacy>> {
    const subCategoriesData: Array<ISubCategoryLegacy> = [];
    for (const subCategory of subCategories) {
      const subObj = await ListSettings.findOne({
        where: { id: subCategory.listSettingsChildId },
        raw: true
      });
      const bookingPeriodObj = await SubcategoryBookingPeriod.findOne({
        where: { listSettingsParentId: subCategory.id },
        raw: true
      });
      subCategoriesData.push({
        ...subObj,
        bookingPeriod: bookingPeriodObj
      });
    }
    return subCategoriesData;
  }
}

export default LegacyCategoriesService;
