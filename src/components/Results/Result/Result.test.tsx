import { createMockRouter } from '@/tests/mocks/mockRouter';
import { render, screen } from '@testing-library/react';
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
});
