import React, { createContext, ReactNode, useContext } from 'react';
import { RootStore, rootStore } from './RootStore';

const StoreContext = createContext<RootStore | undefined>(undefined);

interface StoreProviderProps {
  children: ReactNode;
  store?: RootStore;
}

export function StoreProvider({
  children,
  store = rootStore,
}: StoreProviderProps) {
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = (): RootStore => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return store;
};

export const useAppStore = () => useStore().appStore;

export const useAuthStore = () => useStore().authStore;
