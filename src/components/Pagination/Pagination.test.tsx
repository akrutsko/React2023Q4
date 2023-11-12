import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import Pagination from './Pagination';

describe('Pagination component', () => {
  test('the component updates URL query parameter when page changes', async () => {
    const currentPage = 5;
    const handlePageChange = vi.fn();
    user.setup();

    render(
      <Pagination
        currentPage={currentPage}
        total={100}
        limit={10}
        onPageChange={handlePageChange}
        onLimitChage={vi.fn}
      />,
    );

    const buttonPrev = screen.getByRole('button', { name: '←' });
    const buttonNext = screen.getByRole('button', { name: '→' });

    await user.click(buttonPrev);
    expect(handlePageChange).toBeCalledWith(currentPage - 1);
    await user.click(buttonNext);
    expect(handlePageChange).toBeCalledWith(currentPage + 1);
  });

  test('the component updates the number of items shown per page when limit changes', async () => {
    const handleLimitChange = vi.fn();
    user.setup();

    render(
      <Pagination
        currentPage={1}
        total={10}
        limit={10}
        onPageChange={vi.fn}
        onLimitChage={handleLimitChange}
      />,
    );

    const select = screen.getByRole('combobox');
    await user.selectOptions(select, '5');
    expect(handleLimitChange).toBeCalled();
  });
});
