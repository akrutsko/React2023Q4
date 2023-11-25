import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { store } from '../../../store/store';
import { server } from '../../../tests/msw/server';
import ResultDetails from '../ResultDetails/ResultDetails';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());

describe('NotFound component', () => {
  test('the 404 page is displayed when navigating to an invalid route', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/invalid-route']}>
          <Routes>
            <Route path=":id" element={<ResultDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const img = await screen.findByAltText('no person data');
    expect(img).toBeInTheDocument();
  });
});
