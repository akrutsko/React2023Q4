import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import App from '../App';
import NotFound from '../../components/NotFound/NotFound';
import ResultDetails from '../../components/Results/ResultDetails/ResultDetails';

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
