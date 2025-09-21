import { AppStore } from './AppStore';
import { AuthStore } from './AuthStore';

export class RootStore {
  appStore = new AppStore();

  authStore = new AuthStore();
}

export const rootStore = new RootStore();
