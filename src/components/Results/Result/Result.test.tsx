import { createMockRouter } from '@/tests/mocks/mockRouter';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { personsData } from '../../../tests/data/personsData';
import Result from './Result';

describe('Result component', () => {
  test('the card component renders the relevant card data', () => {
    const router = createMockRouter({});
    const { name, birth_year, url } = personsData[0];

    render(
      <RouterContext.Provider value={router}>
        <Result name={name} birth_year={birth_year} url={url} />
      </RouterContext.Provider>,
    );

    expect(screen.getByText(name)).toBeInTheDocument();
  });

  test('clicking on a card navigates to a detailed card page', async () => {
    const router = createMockRouter({});
    const { name, birth_year, url } = personsData[0];
    user.setup();

    render(
      <RouterContext.Provider value={router}>
        <Result name={name} birth_year={birth_year} url={url} />
      </RouterContext.Provider>,
    );

    const link = screen.getByRole<HTMLAnchorElement>('link');
    await user.click(link);

    expect(router.push).toHaveBeenCalledWith(
      '/1',
      expect.anything(),
      expect.anything(),
    );
  });
});
