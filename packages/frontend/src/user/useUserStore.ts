import { create } from 'zustand';
import { User } from './type';
import { authService } from '../services';

type UserStore = {
  user?: User;
  isAuthenticated?: boolean;
  setUser: (user: User) => void;
  logout: () => void;
};

const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  isAuthenticated: false,

  setUser: (user: User) => set({ user, isAuthenticated: true }),
  logout: () => {
    console.log('logout called');
    authService.logout();
    set({ user: undefined, isAuthenticated: false });
  },
}));

export default useUserStore;
