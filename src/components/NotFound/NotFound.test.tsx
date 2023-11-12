import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { server } from '../../tests/mocks/server';
import ResultDetails from '../Results/ResultDetails/ResultDetails';

beforeAll(() => server.listen());
afterAll(() => server.close());

describe('NotFound component', () => {
  test('the 404 page is displayed when navigating to an invalid route', async () => {
    render(
      <MemoryRouter initialEntries={['/invalid-route']}>
        <Routes>
          <Route path=":id" element={<ResultDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    const img = await screen.findByAltText('no person data');
    expect(img).toBeInTheDocument();
  });
});
