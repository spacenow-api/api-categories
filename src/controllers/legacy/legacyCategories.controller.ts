import { Router, Request, Response, NextFunction } from "express";

import authMiddleware from '../../helpers/middlewares/auth-middleware';
import sequelizeErrorMiddleware from "../../helpers/middlewares/sequelize-error-middleware";

import LegacyCategoriesService from "../../services/legacyCategories.service";

import { ListSettings } from "../../models";

import { ICategoryLegacy } from "../../interfaces/category.interface";

const REFERENCE_CATEGORIES_ID: number = 111;

class LegacyCategoriesController {

  private service: LegacyCategoriesService = new LegacyCategoriesService();

  private router: Router = Router();

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.get(`/categories/legacy`, authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
      try {
        const categories: any = await ListSettings.findAll({
          where: { typeId: REFERENCE_CATEGORIES_ID },
          raw: true
        });
        const categoriesTree: Array<ICategoryLegacy> = await this.service.fetchCategories(0, categories, []);
        res.send(categoriesTree)
      } catch (err) {
        sequelizeErrorMiddleware(err, req, res, next);
      }
    });
  }
}

export default LegacyCategoriesController;
