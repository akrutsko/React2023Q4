import { createMockRouter } from '@/tests/mocks/mockRouter';
import { render, screen } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { personsResponse } from '../../tests/data/personsResponse';
import Results from './Results';
import user from '@testing-library/user-event';

describe('Results component', () => {
  test('the component renders the specified number of cards', async () => {
    const limit = '3';
    const router = createMockRouter({ query: { limit } });

    render(
      <RouterContext.Provider value={router}>
        <Results people={personsResponse} />
      </RouterContext.Provider>,
    );

    const listItems = await screen.findAllByRole('listitem');
    expect(listItems).toHaveLength(+limit);
  });

  test('clicking on a card navigates to a detailed card page', async () => {
    const router = createMockRouter({});
    user.setup();

    render(
      <RouterContext.Provider value={router}>
        <Results people={personsResponse} />
      </RouterContext.Provider>,
    );

    const links = await screen.findAllByRole<HTMLAnchorElement>('link');
    await user.click(links[0]);

    expect(router.push).toHaveBeenCalled();
    // expect(router.push).toHaveBeenCalledWith();
    // expect(router.push).toHaveBeenCalledWith(
    //   expect.arrayContaining([
    //     '/1?search=&page=1&limit=10',
    //     '/1?search=&page=1&limit=10',
    //     { locale: undefined, scroll: true, shallow: undefined },
    //   ]),
    // );
  });
});
