import { personsResponse } from '@/tests/data/personsResponse';
import { createMockRouter } from '@/tests/mocks/mockRouter';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { personsData } from '../../../tests/data/personsData';
import Results from '../Results';
import ResultDetails from './ResultDetails';

describe('ResultDetails component', () => {
  test('the detailed card component correctly displays the detailed card data', async () => {
    const router = createMockRouter({});

    render(
      <RouterContext.Provider value={router}>
        <ResultDetails person={personsData[0]} />
      </RouterContext.Provider>,
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

  test('clicking the close button navigates to the index page', async () => {
    const router = createMockRouter({});
    user.setup();

    render(
      <RouterContext.Provider value={router}>
        <Results people={personsResponse}>
          <ResultDetails person={personsData[0]} />
        </Results>
      </RouterContext.Provider>,
    );

    const button = await screen.findByRole('button', { name: 'Close' });
    await user.click(button);
    expect(router.push).toHaveBeenCalledWith(
      expect.objectContaining({ pathname: '/' }),
    );
  });
});
