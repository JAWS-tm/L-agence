import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar/Navbar.tsx';
import EspacePerso from './views/EspacePerso/EspacePerso.tsx';
import ProtectedRoute from './user/ProtectedRoute.tsx';
import Login from './views/Login/Login.tsx';
import Register from './views/Register/Register.tsx';
import Contact from './components/Contact/Contact.tsx';
import NotFound from './views/NotFound/NotFound.tsx';
import PropertiesListing from './views/PropertiesListing/PropertiesListing.tsx';
import Accommodation from './views/Accommodation/Accommodation.tsx';
import RentApply from './views/RentApply/RentApply.tsx';

const App = () => {
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
            <Route path="/property/:id/apply" element={<RentApply />} />
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
