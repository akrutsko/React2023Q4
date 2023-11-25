import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner component', () => {
  test('the spinner is displayed', () => {
    render(<Spinner />);

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });
});
