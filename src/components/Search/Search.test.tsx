import { createMockRouter } from '@/tests/mocks/mockRouter';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import Search from './Search';

describe('Search component', () => {
  test('a value from the url is displayed in the component', () => {
    const searchTerm = 'Luke';
    const router = createMockRouter({ query: { search: searchTerm } });
    render(
      <RouterContext.Provider value={router}>
        <Search />
      </RouterContext.Provider>,
    );

    const input = screen.getByRole<HTMLInputElement>('textbox');
    expect(input).toHaveValue(searchTerm);
  });

  test('the component updates "search" URL query parameter on search', async () => {
    const router = createMockRouter({});
    const searchTerm = 'Luke';
    user.setup();

    render(
      <RouterContext.Provider value={router}>
        <Search />
      </RouterContext.Provider>,
    );

    const input = screen.getByRole<HTMLInputElement>('textbox');
    await user.type(input, searchTerm);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(router.push).toHaveBeenCalledWith(
      expect.objectContaining({
        query: expect.objectContaining({ search: searchTerm }),
      }),
    );
  });

  test('clicking on the logo navigates to the index page and clears input', async () => {
    const router = createMockRouter({});
    user.setup();

    render(
      <RouterContext.Provider value={router}>
        <Search />
      </RouterContext.Provider>,
    );

    const input = screen.getByRole<HTMLInputElement>('textbox');
    await user.type(input, 'Luke');

    const logo = screen.getByRole('img');
    await user.click(logo);

    expect(router.push).toHaveBeenCalledWith(
      expect.objectContaining({ pathname: '/' }),
    );
    expect(input.value).toBe('');
  });
});
