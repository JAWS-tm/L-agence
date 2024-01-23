import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Contact from './components/Contact/Contact.tsx';
import Navbar from './components/Navbar/Navbar.tsx';
import ProtectedRoute from './user/ProtectedRoute.tsx';
import useUserStore from './user/useUserStore.ts';
import Accommodation from './views/Accommodation/Accommodation.tsx';
import EspacePerso from './views/EspacePerso/EspacePerso.tsx';
import OnGoingApplication from './views/EspacePerso/OnGoingApplication/OnGoingApplication.tsx';
import Login from './views/Login/Login.tsx';
import NotFound from './views/NotFound/NotFound.tsx';
import PropertiesListing from './views/PropertiesListing/PropertiesListing.tsx';
import Register from './views/Register/Register.tsx';
import RentalApplication from './views/RentalApplication/RentalApplication.tsx';
import { useEffect } from 'react';

const App = () => {
  const loadUser = useUserStore((state) => state.loadUser);

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/properties" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/properties" element={<PropertiesListing />} />
          <Route path="/property/:id" element={<Accommodation />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/my-account" element={<EspacePerso />} />
            <Route path="/property/:id/apply" element={<RentalApplication />} />
            <Route
              path="/ongoingapplication/:id"
              element={<OnGoingApplication />}
            />
          </Route>

          <Route path="*" element={<Navigate to={'/404'} />} />
          <Route path="/404" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
};

export default App;
