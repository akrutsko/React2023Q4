import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import App from '../App';
import ResultDetails from '../../components/Results/ResultDetails/ResultDetails';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path=":id" element={<ResultDetails />} />
    </Route>,
  ),
);
