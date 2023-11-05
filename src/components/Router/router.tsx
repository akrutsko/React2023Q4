import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import App from '../App/App';
import NotFound from '../NotFound/NotFound';
import ResultDetails from '../Results/ResultDetails/ResultDetails';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path=":id"
        element={<ResultDetails />}
        errorElement={<NotFound />}
      />
    </Route>,
  ),
);
