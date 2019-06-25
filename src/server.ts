import { PORT } from './config';

import App from './App';
import CategoriesController from './controllers/category.controller';

const app = new App([new CategoriesController()], PORT, '0.0.0.0');

app.listen();
