import { makeAutoObservable } from 'mobx';

export class AppStore {
  isLoading = false;

  theme: 'light' | 'dark' = 'light';

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  setTheme(theme: 'light' | 'dark') {
    this.theme = theme;
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
  }
}
