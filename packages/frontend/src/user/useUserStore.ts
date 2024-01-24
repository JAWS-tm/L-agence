import { create } from 'zustand';
import { authService } from '../services';
import { User } from './type';

type UserStore = {
  user?: User;
  isAuthenticated?: boolean;
  requestedPath: string | null;
  setRequestedPath: (path: string | null) => void;
  setUser: (user: User) => void;
  logout: () => void;
  // try to load user by doing a /me request
  loadUser: () => Promise<void>;
};

const useUserStore = create<UserStore>((set, get) => ({
  user: undefined,
  isAuthenticated: false,
  requestedPath: null,

  setUser: (user: User) => {
    localStorage.setItem('isAuthenticated', 'true');
    set({ user, isAuthenticated: true });
  },
  logout: () => {
    authService.logout();
    localStorage.removeItem('isAuthenticated');
    set({ user: undefined, isAuthenticated: false });
  },
  setRequestedPath: (path: string | null) => set({ requestedPath: path }),
  loadUser: async () => {
    const wasAuthenticated = localStorage.getItem('isAuthenticated'); // check if user was authenticated the last time he visited the app
    if (!wasAuthenticated) return; // avoid 401

    try {
      const user = await authService.getMe();
      if (user) {
        localStorage.setItem('isAuthenticated', 'true');
        set({ user, isAuthenticated: true });
      }
    } catch (err) {
      console.error('Error while loading user', err);
    }
  },
}));

export default useUserStore;
