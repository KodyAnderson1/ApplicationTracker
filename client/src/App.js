import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";

import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Applications from "scenes/applications";
import { NewApplicationForm } from "components/NewApplicationForm";
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
              <Route path="/add_new" element={<NewApplicationForm />} />
              <Route path="/applications" element={<Applications />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
