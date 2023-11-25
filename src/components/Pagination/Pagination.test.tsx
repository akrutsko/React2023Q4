import { createMockRouter } from '@/tests/mocks/mockRouter';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import Pagination from './Pagination';

describe('Pagination component', () => {
  test('the component updates "page" URL query parameter when page changes', async () => {
    const router = createMockRouter({ query: { page: '5' } });
    user.setup();

    render(
      <RouterContext.Provider value={router}>
        <Pagination total={100} />
      </RouterContext.Provider>,
    );

    const buttonPrev = await screen.findByRole('button', { name: '←' });
    const buttonNext = await screen.findByRole('button', { name: '→' });

    await user.click(buttonPrev);
    expect(router.push).toHaveBeenCalledWith(
      expect.objectContaining({
        query: expect.objectContaining({ page: 4 }),
      }),
    );
    await user.click(buttonNext);
    await user.click(buttonNext);
    expect(router.push).toHaveBeenCalledWith(
      expect.objectContaining({
        query: expect.objectContaining({ page: 6 }),
      }),
    );
  });

  test('the component updates "limit" and "page" URL query parameters when limit changes', async () => {
    const router = createMockRouter({ query: { limit: '10' } });
    user.setup();

    render(
      <RouterContext.Provider value={router}>
        <Pagination total={100} />
      </RouterContext.Provider>,
    );

    const select = await screen.findByRole('combobox');
    await user.selectOptions(select, '5');
    expect(router.push).toHaveBeenCalledWith(
      expect.objectContaining({
        query: expect.objectContaining({ limit: '5' }),
      }),
    );
  });
});
