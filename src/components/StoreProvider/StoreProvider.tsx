import { wrapper } from '@/store/store';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

export default function StoreProvider({ children }: PropsWithChildren) {
  const { store } = wrapper.useWrappedStore({});
  return <Provider store={store}>{children}</Provider>;
}
