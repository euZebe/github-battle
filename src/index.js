import ReactDOM from 'react-dom';

import { makeMainRoutes } from './routes';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

const routes = makeMainRoutes();

ReactDOM.render(
  routes,
  document.getElementById('root')
);
