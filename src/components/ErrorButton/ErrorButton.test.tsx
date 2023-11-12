import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import ErrorButton from './ErrorButton';

describe('ErrorButton component', () => {
  test('the component is rendered', async () => {
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
