import { makeAutoObservable, runInAction } from 'mobx';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export class AuthStore {
  user: User | null = null;

  isLoading = false;

  isAuthenticated = false;

  token: string | null = null;

  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadStoredAuth();
  }

  private loadStoredAuth() {
    try {
      const storedToken = localStorage?.getItem('auth_token');
      const storedUser = localStorage?.getItem('auth_user');

      if (storedToken && storedUser) {
        this.token = storedToken;
        this.user = JSON.parse(storedUser);
        this.isAuthenticated = true;
      }
    } catch (error) {
      this.error = 'Failed to load stored auth data';
    }
  }

  private saveAuthData(token: string, user: User) {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('auth_user', JSON.stringify(user));
      }
    } catch (error) {
      this.error = 'Failed to save auth data';
    }
  }

  private clearAuthData() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      }
    } catch (error) {
    }
  }

  async login(credentials: LoginCredentials): Promise<boolean> {
    this.setLoading(true);
    this.clearError();

    try {
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 1000);
      });

      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: credentials.email,
        avatar: 'https://via.placeholder.com/150',
      };

      const mockToken = `mock_jwt_token_${Date.now()}`;

      runInAction(() => {
        this.user = mockUser;
        this.token = mockToken;
        this.isAuthenticated = true;
      });

      this.saveAuthData(mockToken, mockUser);
      return true;
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Login failed';
      });
      return false;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async register(credentials: RegisterCredentials): Promise<boolean> {
    this.setLoading(true);
    this.clearError();

    try {
      if (credentials.password !== credentials.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 1000);
      });

      const mockUser: User = {
        id: '1',
        name: credentials.name,
        email: credentials.email,
        avatar: 'https://via.placeholder.com/150',
      };

      const mockToken = `mock_jwt_token_${Date.now()}`;

      runInAction(() => {
        this.user = mockUser;
        this.token = mockToken;
        this.isAuthenticated = true;
      });

      this.saveAuthData(mockToken, mockUser);
      return true;
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Registration failed';
      });
      return false;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  logout() {
    runInAction(() => {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      this.error = null;
    });
    this.clearAuthData();
  }

  async updateProfile(updates: Partial<User>): Promise<boolean> {
    if (!this.user) return false;

    this.setLoading(true);
    this.clearError();

    try {
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 500);
      });
      const updatedUser = { ...this.user, ...updates };
      runInAction(() => {
        this.user = updatedUser;
      });
      if (this.token) {
        this.saveAuthData(this.token, updatedUser);
      }
      return true;
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Profile update failed';
      });
      return false;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async changePassword(_currentPassword: string, _newPassword: string): Promise<boolean> {
    this.setLoading(true);
    this.clearError();

    try {
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 1000);
      });
      return true;
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Password change failed';
      });
      return false;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async forgotPassword(_email: string): Promise<boolean> {
    this.setLoading(true);
    this.clearError();
    try {
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 1000);
      });
      return true;
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Forgot password request failed';
      });
      return false;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  clearError() {
    this.error = null;
  }

  setError(error: string) {
    this.error = error;
  }

  get isLoggedIn() {
    return this.isAuthenticated && this.user !== null;
  }

  get userName() {
    return this.user?.name || '';
  }

  get userEmail() {
    return this.user?.email || '';
  }

  get userAvatar() {
    return this.user?.avatar || '';
  }
}
