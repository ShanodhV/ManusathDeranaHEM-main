import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import HealthCamps from "scenes/HealthCamps/index";
import SipsalPubuduwa from "scenes/SipsalPubuduwa/index";
import DeranaDaruwo from "scenes/DeranaDaruwo/index";
import Volunteer from "scenes/Volunteer/index";
import { ToastContainer } from "react-toastify";



function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
        
          <CssBaseline />
          <Routes>
         
            <Route element={<Layout />}>
              
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/Health Camps" element={<HealthCamps />} />
              <Route path="/Sipsal Pubuduwa" element={<SipsalPubuduwa />} />
              <Route path="/Derana Daruwo" element={<DeranaDaruwo />} />
              <Route path="/Volunteer" element={<Volunteer />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
