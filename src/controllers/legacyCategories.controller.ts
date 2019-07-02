import { Router, Request, Response, NextFunction } from 'express';
import memoryCache from 'memory-cache';

import sequelizeErrorMiddleware from '../helpers/middlewares/sequelize-error-middleware';

import LegacyCategoriesService from '../services/legacyCategories.service';

import { ListSettings } from '../models';

const REFERENCE_CATEGORIES_ID: number = 111;

class LegacyCategoriesController {
  private service: LegacyCategoriesService = new LegacyCategoriesService();

  private router: Router = Router();

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.get(
      `/legacy/categories`,
      async (req: Request, res: Response, next: NextFunction) => {
        const key = '__categories__' + req.originalUrl || req.url;
        const cachedResponse = memoryCache.get(key);
        if (cachedResponse) {
          res.send(cachedResponse);
        } else {
          try {
            const categories = await ListSettings.findAll({
              where: { typeId: REFERENCE_CATEGORIES_ID },
              raw: true
            });
            const categoriesTree = await this.service.fetchCategories(0, categories, []);
            console.debug(`New Category cache defined: ${key}`);
            memoryCache.put(key, categoriesTree, 1 * 3.6e+6); // Expire in 1 hour.
            res.send(categoriesTree);
          } catch (error) {
            sequelizeErrorMiddleware(error, req, res, next);
          }
        }
      }
    );
  }
}

export default LegacyCategoriesController;
