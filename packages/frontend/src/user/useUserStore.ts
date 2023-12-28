import { create } from 'zustand';
import { User } from './type';
import Cookies from 'js-cookie';

type UserStore = {
  user?: User;
  setUser: (user: User) => void;
  token?: string;
  setToken: (token: string) => void;
  isAuthenticated?: boolean;
};

const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  token: undefined,
  isAuthenticated: false,

  setUser: (user: User) => set({ user }),
  setToken: (token: string) => {
    set({ isAuthenticated: true, token }),
      Cookies.set('token', token, { expires: 7, secure: true });
  },
  logout: () => {
    set({ user: undefined, token: undefined, isAuthenticated: false });
    Cookies.remove('token');
  },
}));

export default useUserStore;
