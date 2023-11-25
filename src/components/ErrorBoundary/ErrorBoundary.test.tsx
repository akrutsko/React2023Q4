import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

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

  // test('children are displayed if there are no error', () => {
  //   const ThrowError = () => {
  //     throw new Error('test');
  //   };

  //   render(
  //     <ErrorBoundary>
  //       <ThrowError />
  //     </ErrorBoundary>,
  //   );

  //   const text = screen.getByText('Children');
  //   expect(text).toBeInTheDocument();
  // });
});
