import { create } from 'zustand';
import { User } from './type';

type UserStore = {
  user?: User;
  isAuthenticated?: boolean;
  login: (user: User) => void;
  logout: () => void;
};

const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  isAuthenticated: false,

  login: (user: User) => set({ user, isAuthenticated: true }),
  logout: () => {
    console.log('logout called');

    set({ user: undefined, isAuthenticated: false });
  },
}));

export default useUserStore;
