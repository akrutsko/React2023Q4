import { render, screen } from '@testing-library/react';
import ErrorButton from './ErrorButton';

describe('ErrorButton component', () => {
  test('the component is rendered', async () => {
    render(<ErrorButton />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
