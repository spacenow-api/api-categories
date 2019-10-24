import { PORT } from "./config";

import App from "./App";

import HealthController from "./controllers/health/health.controller";
import LegacyCategories from "./controllers/legacy/legacyCategories.controller";

const app = new App(
  [
    new HealthController(),
    new LegacyCategories()
  ], PORT, "0.0.0.0"
);

app.listen();
