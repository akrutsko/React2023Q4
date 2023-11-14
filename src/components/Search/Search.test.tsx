import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import PersonsProvider from '../../contexts/PersonsContext';
import SearchProvider from '../../contexts/SearchContext';
import { SEARCH_TERM_KEY } from '../../services/local-storage';
import Main from '../Main/Main';
import Search from './Search';

const setItem = vi.fn();
const getItem = vi.fn();
const localStorageMock = { setItem, getItem };
vi.stubGlobal('localStorage', localStorageMock);

describe('Search component', () => {
  test('the component retrieves the value from the local storage upon mounting', async () => {
    user.setup();

    render(
      <BrowserRouter>
        <SearchProvider>
          <Search onSearch={vi.fn} />
        </SearchProvider>
      </BrowserRouter>,
    );

    expect(getItem).toHaveBeenCalledWith(SEARCH_TERM_KEY);
  });

  test('clicking the Search button saves the entered value to the local storage', async () => {
    const searchTerm = 'Luke';
    user.setup();

    render(
      <BrowserRouter>
        <SearchProvider>
          <PersonsProvider>
            <Main />
          </PersonsProvider>
        </SearchProvider>
      </BrowserRouter>,
    );

    const searchBtn = screen.getByRole('button', { name: 'Search' });
    const input = screen.getByRole('textbox');
    await user.type(input, searchTerm);
    await user.click(searchBtn);
    expect(setItem).toHaveBeenCalledWith(SEARCH_TERM_KEY, searchTerm);
  });
});
