import { PORT } from './config';

import App from './App';

import CategoriesController from './controllers/category.controller';
import LegacyCategories from './controllers/legacyCategories.controller';

const app = new App(
  [new CategoriesController(), new LegacyCategories()],
  PORT,
  '0.0.0.0'
);

app.listen();
