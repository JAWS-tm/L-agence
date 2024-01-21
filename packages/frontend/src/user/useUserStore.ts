import { create } from 'zustand';
import { authService } from '../services';
import { User } from './type';

type UserStore = {
  user?: User;
  isAuthenticated?: boolean;
  requestedPath: string | null;
  setRequestedPath: (path: string | null) => void;
  login: (user: User) => void;
  logout: () => void;
  // try to load user by doing a /me request
  loadUser: () => Promise<void>;
};

const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  isAuthenticated: false,
  requestedPath: null,

  login: (user: User) => set({ user, isAuthenticated: true }),
  logout: () => {
    console.log('logout called');
    authService.logout();
    set({ user: undefined, isAuthenticated: false });
  },
  setRequestedPath: (path: string | null) => set({ requestedPath: path }),
  loadUser: async () => {
    try {
      const user = await authService.getMe();
      if (user) set({ user, isAuthenticated: true });
    } catch (err) {
      console.log('Error while loading user', err);
    }
  },
}));

export default useUserStore;
