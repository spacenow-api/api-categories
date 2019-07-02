import {
  ListSettings,
  ListSettingsParent,
  SubcategoryBookingPeriod
} from './../models';

class LegacyCategoriesService {
  public async fetchCategories(
    index: number,
    categories: Array<ListSettings>,
    tree: Array<any>
  ): Promise<any> {
    const reference = Array.from(tree);
    if (index < categories.length) {
      const category = categories[index];
      const subCategories = await ListSettingsParent.findAll({
        where: { listSettingsParentId: category.id },
        raw: true
      });
      const subReference = await this.fetchSubCategories(subCategories);
      reference.push({
        category: {
          ...category,
          subCategories: [...subReference]
        }
      });
      return this.fetchCategories(++index, categories, reference);
    }
    return reference;
  }

  private async fetchSubCategories(
    subCategories: Array<ListSettingsParent>
  ): Promise<any[]> {
    const subCategoriesData: Array<any> = [];
    for (const subCategory of subCategories) {
      const subObj: ListSettings = await ListSettings.findOne({
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
