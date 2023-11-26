import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import ErrorButton from '../ErrorButton/ErrorButton';
import user from '@testing-library/user-event';

describe('ErrorBoundary component', () => {
  test('children are displayed if there are no error', () => {
    const Childs = () => 'Children';

    render(
      <ErrorBoundary>
        <Childs />
      </ErrorBoundary>,
    );

    const text = screen.getByText('Children');
    expect(text).toBeInTheDocument();
  });

  test('the error message is displayed', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>,
    );

    const button = screen.getByRole<HTMLButtonElement>('button');
    await user.click(button);

    const text = screen.getByText('Something went wrong! Try later.');
    expect(text).toBeInTheDocument();
  });
});
