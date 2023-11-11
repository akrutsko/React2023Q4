import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { PersonsContext } from '../../../contexts/PersonsContext';
import { fetchPerson } from '../../../services/api';
import { personsMock } from '../../../tests/data/personsMock';
import ResultDetails from '../ResultDetails/ResultDetails';
import Results from '../Results';
import Result from './Result';

vi.mock('../../../services/api', () => ({
  fetchPerson: vi.fn((id) => Promise.resolve(personsMock[id - 1])),
}));

describe('Result component', () => {
  test('the card component renders the relevant card data', () => {
    const { name, birth_year, url } = personsMock[0];

    render(
      <BrowserRouter>
        <Result name={name} birth_year={birth_year} url={url} />
      </BrowserRouter>,
    );

    expect(screen.getByText(name)).toBeInTheDocument();
  });

  test('clicking on a card opens a detailed card component', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <PersonsContext.Provider value={personsMock}>
            <Routes>
              <Route
                path="/"
                element={
                  <Results isLoading={false} limit={1}>
                    <></>
                  </Results>
                }
              >
                <Route path=":id" element={<ResultDetails />} />
              </Route>
            </Routes>
          </PersonsContext.Provider>
        </MemoryRouter>,
      );
    });

    userEvent.click(screen.getByRole('link'));
    const closeButton = await screen.findByRole('button', {
      name: 'Close',
    });

    expect(closeButton).toBeInTheDocument();
  });

  test('clicking triggers an additional API call to fetch detailed information', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <PersonsContext.Provider value={personsMock}>
            <Routes>
              <Route
                path="/"
                element={
                  <Results isLoading={false} limit={1}>
                    <></>
                  </Results>
                }
              >
                <Route path=":id" element={<ResultDetails />} />
              </Route>
            </Routes>
          </PersonsContext.Provider>
        </MemoryRouter>,
      );
    });

    userEvent.click(screen.getByRole('link'));
    await screen.findByRole('button', {
      name: 'Close',
    });

    expect(fetchPerson).toHaveBeenCalled();
  });
});
