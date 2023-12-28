import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home.tsx';
import Navbar from './components/Navbar/Navbar.tsx';
import EspacePerso from './components/EspacePerso/EspacePerso.tsx';
import ProtectedRoute from './user/ProtectedRoute.tsx';
import Login from './views/Login/Login.tsx';
import Register from './views/Register/Register.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/espaceperso" element={<EspacePerso />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route
          path="/"
          element={
            <ProtectedRoute>
              // <MyAccount /> for exemple
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
