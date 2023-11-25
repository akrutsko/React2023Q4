import { createMockRouter } from '@/tests/mocks/mockRouter';
import { render, screen } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
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
});
