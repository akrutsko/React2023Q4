import { personsResponse } from '@/tests/data/personsResponse';
import { createMockRouter } from '@/tests/mocks/mockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import Results from '../Results';
import { render, screen } from '@testing-library/react';

describe('NoResults component', () => {
  test('the message is displayed if no cards are present', async () => {
    const router = createMockRouter({});

    render(
      <RouterContext.Provider value={router}>
        <Results people={{ ...personsResponse, results: [] }} />
      </RouterContext.Provider>,
    );

    const text = await screen.findByText(/No results found/i);
    expect(text).toBeInTheDocument();
  });
});
