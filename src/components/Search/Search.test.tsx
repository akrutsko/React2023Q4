import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { getSearchTerm, setSearchTerm } from '../../services/local-storage';
import { store } from '../../store/store';
import Search from './Search';

describe('Search component', () => {
  test('the component retrieves the value from the local storage upon mounting', async () => {
    const searchTerm = 'Darth';
    setSearchTerm(searchTerm);

    const { mockStore } = await import('../../tests/mocks/mockStore');

    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </Provider>,
    );

    const input = await screen.findByRole<HTMLInputElement>('textbox');
    expect(input).toHaveValue(searchTerm);
  });

  test('clicking the Search button saves the entered value to the local storage', async () => {
    const searchTerm = 'Luke';
    user.setup();

    render(
      <BrowserRouter>
        <Provider store={store}>
          <Search />
        </Provider>
      </BrowserRouter>,
    );

    const searchBtn = screen.getByRole('button', { name: 'Search' });
    const input = screen.getByRole('textbox');
    await user.type(input, searchTerm);
    await user.click(searchBtn);
    expect(getSearchTerm()).toEqual(searchTerm);
  });
});
