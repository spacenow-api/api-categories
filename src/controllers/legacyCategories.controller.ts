import { Router, Request, Response, NextFunction } from 'express';

import sequelizeErrorMiddleware from '../helpers/middlewares/sequelize-error-middleware';

import {
  ListSettings,
  ListSettingsParent,
  SubcategoryBookingPeriod
} from '../models';

const REFERENCE_CATEGORIES_ID: number = 111;

class LegacyCategoriesController {
  private router = Router();

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    /**
     * Get list settings by listing id.
     */
    this.router.get(
      `/legacy/categories`,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const categories = await ListSettings.findAll({
            where: { typeId: REFERENCE_CATEGORIES_ID },
            raw: true
          });
          const categoriesTree = await this.fetchCategories(0, categories, []);
          res.send(categoriesTree);
        } catch (error) {
          sequelizeErrorMiddleware(error, req, res, next);
        }
      }
    );
  }

  private async fetchCategories(
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

export default LegacyCategoriesController;
