/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore, RootState } from '@/redux/store';

export default function StoreProvider({
  children,
  initialReduxState,
}: {
  children: React.ReactNode;
  initialReduxState?: Partial<RootState>;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore(initialReduxState);
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
