import { PORT } from "./config";

import App from "./App";

import CategoriesController from "./controllers/category/category.controller";
import HealthController from "./controllers/health/health.controller";
import LegacyCategories from "./controllers/legacy/legacyCategories.controller";

const app = new App(
  [new CategoriesController(), new HealthController(), new LegacyCategories()],
  PORT,
  "0.0.0.0"
);

app.listen();
