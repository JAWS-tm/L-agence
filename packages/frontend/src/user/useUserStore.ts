import { create } from 'zustand';
import { User } from './type';

type UserStore = {
  user?: User;
  setUser: (user: User) => void;
  isAuthenticated?: boolean;
  login: () => void;
  logout: () => void;
};

const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  isAuthenticated: false,

  setUser: (user: User) => set({ user }),
  login: () => set({ isAuthenticated: true }),
  logout: () => {
    console.log('logout called');

    set({ user: undefined, isAuthenticated: false });
  },
}));

export default useUserStore;
