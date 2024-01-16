import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './views/Home/Home.tsx';
import Navbar from './components/Navbar/Navbar.tsx';
import EspacePerso from './views/EspacePerso/EspacePerso.tsx';
import ProtectedRoute from './user/ProtectedRoute.tsx';
import Login from './views/Login/Login.tsx';
import Register from './views/Register/Register.tsx';
import Profile from './views/Profile/Profile.tsx';
import Contact from './components/Contact/Contact.tsx';
import { useEffect, useState } from 'react';
import { authService } from './services/auth.service.ts';
import useUserStore from './user/useUserStore.ts';
import { Toaster } from 'react-hot-toast';
import NotFound from './views/NotFound/NotFound.tsx';
import PropertiesListing from './views/PropertiesListing/PropertiesListing.tsx';

const App = () => {
  const [loadingUser, setLoadingUser] = useState(true);
  const login = useUserStore((state) => state.login);

  useEffect(() => {
    (async () => {
      const user = await authService.getMe();
      if (user) login(user);
      setLoadingUser(false);
    })();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <div className="content">
        {loadingUser ? (
          <div>load</div>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to={'/404'} />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/properties" element={<PropertiesListing />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/my-account" element={<EspacePerso />} />
            </Route>
          </Routes>
        )}
        <Toaster />
      </div>
    </BrowserRouter>
  );
};

export default App;
