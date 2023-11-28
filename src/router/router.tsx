import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import HtmlForm from '../components/HtmlForm/HtmlForm';
import Main from '../components/Main/Main';
import ReactForm from '../components/ReactForm/ReactForm';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Main />} />
      <Route path="/html-form" element={<HtmlForm />} />
      <Route path="/react-hook-form" element={<ReactForm />} />
    </>,
  ),
);
