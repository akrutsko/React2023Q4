import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { store } from '../../../store/store';
import { personsData } from '../../../tests/data/personsData';
import { server } from '../../../tests/msw/server';
import ResultDetails from './ResultDetails';
import Results from '../Results';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());

describe('ResultDetails component', () => {
  test('a loading indicator is displayed while fetching data', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/1']}>
          <Routes>
            <Route path=":id" element={<ResultDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const spinner = await screen.findByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  test('the detailed card component correctly displays the detailed card data', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/1']}>
          <Routes>
            <Route path=":id" element={<ResultDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    await screen.findByRole('button', { name: 'Close' });

    const { gender, height, skin_color, hair_color, eye_color } =
      personsData[0];

    expect(screen.getByText(gender, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(height, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(skin_color, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(hair_color, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(eye_color, { exact: false })).toBeInTheDocument();
  });

  test('clicking the close button hides the component', async () => {
    user.setup();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/1']}>
          <Routes>
            <Route path="/" element={<Results />}>
              <Route path=":id" element={<ResultDetails />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const button = await screen.findByRole('button', { name: 'Close' });
    await user.click(button);

    expect(
      screen.queryByRole('button', { name: 'Close' }),
    ).not.toBeInTheDocument();
  });
});
