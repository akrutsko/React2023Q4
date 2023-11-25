import { Person } from '@/interfaces/SWApi';
import { createMockRouter } from '@/tests/mocks/mockRouter';
import { render, screen } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import ResultDetails from '../ResultDetails/ResultDetails';

describe('NoDetails component', () => {
  test('the image is displayed if no person is present', async () => {
    const router = createMockRouter({});

    render(
      <RouterContext.Provider value={router}>
        <ResultDetails person={null as unknown as Person} />
      </RouterContext.Provider>,
    );

    const img = await screen.findByAltText('no person data');
    expect(img).toBeInTheDocument();
  });
});
