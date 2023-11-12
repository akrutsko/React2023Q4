import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { personsMock } from '../../../tests/data/personsMock';
import { server } from '../../../tests/mocks/server';
import ResultDetails from './ResultDetails';
import user from '@testing-library/user-event';

beforeAll(() => server.listen());
afterAll(() => server.close());

describe('ResultDetails component', () => {
  test('a loading indicator is displayed while fetching data', async () => {
    render(
      <MemoryRouter initialEntries={['/100']}>
        <Routes>
          <Route path=":id" element={<ResultDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    const spinner = await screen.findByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  test('the detailed card component correctly displays the detailed card data', async () => {
    render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path=":id" element={<ResultDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    await screen.findByRole('button', { name: 'Close' });

    const { gender, height, skin_color, hair_color, eye_color } =
      personsMock[0];

    expect(screen.getByText(gender, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(height, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(skin_color, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(hair_color, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(eye_color, { exact: false })).toBeInTheDocument();
  });

  test('clicking the close button hides the component', async () => {
    user.setup();

    render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path="/" element={null} />
          <Route path=":id" element={<ResultDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    const button = await screen.findByRole('button', { name: 'Close' });
    await user.click(button);

    expect(
      screen.queryByRole('button', { name: 'Close' }),
    ).not.toBeInTheDocument();
  });
});
