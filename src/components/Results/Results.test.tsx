import { createMockRouter } from '@/tests/mocks/mockRouter';
import { act, render, screen } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { Router } from 'next/router';
import { personsResponse } from '../../tests/data/personsResponse';
import Results from './Results';

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

  test('spinner is displayed while requesting a new page', async () => {
    const limit = '3';
    const router = createMockRouter({ query: { limit } });

    render(
      <RouterContext.Provider value={router}>
        <Results people={personsResponse} />
      </RouterContext.Provider>,
    );

    act(() => {
      Router.events.emit('routeChangeStart');
    });

    const spinner = await screen.findByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });
});
