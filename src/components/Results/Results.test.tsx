import { render, screen } from '@testing-library/react';
import Results from './Results';
import { PersonsContext } from '../../contexts/PersonsContext';
import { mockPersons } from '../../tests/data/mock-persons';

vi.mock('react-router-dom', () => {
  return {
    useLocation: () => '',
    Outlet: () => {},
    Link: () => {},
  };
});

describe('Results component', () => {
  test('the component renders the specified number of cards', () => {
    const limit = 3;

    render(
      <PersonsContext.Provider value={mockPersons}>
        <Results isLoading={false} limit={limit}>
          <></>
        </Results>
      </PersonsContext.Provider>,
    );

    expect(screen.getAllByRole('listitem').length).toEqual(limit);
  });

  test('the message is displayed if no cards are present', () => {
    render(
      <PersonsContext.Provider value={[]}>
        <Results isLoading={false} limit={10}>
          <></>
        </Results>
      </PersonsContext.Provider>,
    );
    expect(screen.getByText(/No results found/i)).toBeInTheDocument();
  });
});
