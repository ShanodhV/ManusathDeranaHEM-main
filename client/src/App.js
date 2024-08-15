import React, { useMemo } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { themeSettings } from 'theme';
import Layout from 'scenes/layout';
import HealthCamps from 'scenes/HealthCamps/index';
import SipsalPubuduwa from 'scenes/SipsalPubuduwa/index';
import DeranaDaruwo from 'scenes/DeranaDaruwo/index';
import Volunteer from 'scenes/Volunteer/index';
import { ToastContainer } from 'react-toastify';
import UsersPage from 'scenes/UsersPage';

import Admin from "scenes/admin";
import Login from "scenes/auth/Login/index";
import Signup from "scenes/auth/Singup/index";
import Logout from 'components/Logout';
import { Dashboard } from 'scenes/dashboard';

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const user = localStorage.getItem("token");

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <Routes>
            <Route path="*" element={<Navigate to="/login" />} />
            {user && (
              <Route path="/" exact element={<Layout />}>
                {" "}
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
              </Route>
            )}
            <Route path="/login" element={<Login />} />
            {/* <Route path="/signup" element={<Signup />} /> */}
            <Route path="/" element={<Navigate replace to="/login" />} />
            {user && (
              <Route element={<Layout />}>
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />              
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/Health Camps" element={<HealthCamps />} />
                <Route path="/Sipsal Pubuduwa" element={<SipsalPubuduwa />} />
                <Route path="/Derana Daruwo" element={<DeranaDaruwo />} />
                <Route path="/Volunteer" element={<Volunteer />} />
                <Route path="/logout" element={<Logout />} />

              </Route>
              )}
            </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
