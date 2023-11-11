import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PersonsContext } from '../../contexts/PersonsContext';
import { personsMock } from '../../tests/data/personsMock';
import Results from './Results';

describe('Results component', () => {
  test('the component renders the specified number of cards', () => {
    const limit = 3;

    render(
      <BrowserRouter>
        <PersonsContext.Provider value={personsMock}>
          <Results isLoading={false} limit={limit}>
            <></>
          </Results>
        </PersonsContext.Provider>
      </BrowserRouter>,
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(limit);
  });

  test('the message is displayed if no cards are present', () => {
    render(
      <BrowserRouter>
        <PersonsContext.Provider value={[]}>
          <Results isLoading={false} limit={10}>
            <></>
          </Results>
        </PersonsContext.Provider>
      </BrowserRouter>,
    );
    expect(screen.getByText(/No results found/i)).toBeInTheDocument();
  });
});
