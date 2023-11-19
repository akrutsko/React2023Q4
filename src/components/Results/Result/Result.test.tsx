import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { store } from '../../../store/store';
import { personsMock } from '../../../tests/data/personsMock';
import { server } from '../../../tests/mocks/server';
import ResultDetails from '../ResultDetails/ResultDetails';
import Results from '../Results';
import Result from './Result';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());

describe('Result component', () => {
  test('clicking triggers an additional API call to fetch detailed information', async () => {
    user.setup();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Results />
        </BrowserRouter>
      </Provider>,
    );

    const links = await screen.findAllByRole<HTMLAnchorElement>('link');
    await user.click(links[0]);
    expect(server.listHandlers()[0].isUsed).toBeTruthy();
  });

  test('clicking on a card opens a detailed card component', async () => {
    user.setup();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Results />}>
              <Route path=":id" element={<ResultDetails />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const links = await screen.findAllByRole<HTMLAnchorElement>('link');
    await user.click(links[0]);

    const closeButton = await screen.findByRole('button', { name: 'Close' });
    expect(closeButton).toBeInTheDocument();
  });

  test('the card component renders the relevant card data', () => {
    const { name, birth_year, url } = personsMock[0];

    render(
      <BrowserRouter>
        <Result name={name} birth_year={birth_year} url={url} />
      </BrowserRouter>,
    );

    expect(screen.getByText(name)).toBeInTheDocument();
  });
});
