import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { pageUpdated } from '../../features/pageSlice';
import { store } from '../../store/store';
import { server } from '../../tests/mocks/server';
import Results from '../Results/Results';
import Pagination from './Pagination';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());

describe('Pagination component', () => {
  test('the component updates URL query parameter when page changes', async () => {
    const page = 5;
    store.dispatch(pageUpdated(page));
    user.setup();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Pagination total={100} />
        </BrowserRouter>
      </Provider>,
    );

    const buttonPrev = await screen.findByRole('button', { name: '←' });
    const buttonNext = await screen.findByRole('button', { name: '→' });

    await user.click(buttonPrev);
    expect(window.location.search).toContain(`page=${page - 1}`);
    await user.click(buttonNext);
    await user.click(buttonNext);
    expect(window.location.search).toContain(`page=${page + 1}`);
  });

  test('the component updates the number of items shown per page when limit changes', async () => {
    const limitBefore = 10;
    const limitAfter = 5;
    user.setup();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Results />
        </BrowserRouter>
      </Provider>,
    );

    const select = await screen.findByRole('combobox');
    let listItems = await screen.findAllByRole('listitem');
    expect(listItems).toHaveLength(limitBefore);

    await user.selectOptions(select, String(limitAfter));
    listItems = await screen.findAllByRole('listitem');
    expect(listItems).toHaveLength(limitAfter);
  });
});
