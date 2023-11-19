import { render, screen } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { limitChanged } from '../../features/limitSlice';
import { searchChanged } from '../../features/searchSlice';
import { store } from '../../store/store';
import { personsResponse } from '../../tests/data/personsResponse';
import { server } from '../../tests/mocks/server';
import Results from './Results';
import { peopleApi } from '../../features/api/peopleApi';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => {
  peopleApi.util.resetApiState();
  server.resetHandlers();
});
afterAll(() => server.close());

describe('Results component', () => {
  test('the message is displayed if no cards are present', async () => {
    server.use(
      http.get('https://swapi.dev/api/people', () =>
        HttpResponse.json({ ...personsResponse, results: [] }),
      ),
    );
    store.dispatch(searchChanged('uknown'));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Results />
        </BrowserRouter>
      </Provider>,
    );

    const text = await screen.findByText(/No results found/i);
    expect(text).toBeInTheDocument();
  });

  test('the component renders the specified number of cards', async () => {
    const limit = 3;
    store.dispatch(limitChanged(3));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Results />
        </BrowserRouter>
      </Provider>,
    );

    const listItems = await screen.findAllByRole('listitem');
    expect(listItems).toHaveLength(limit);
  });
});
