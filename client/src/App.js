import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Applications from "scenes/applications";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApplicationDetails from "scenes/applicationDetails";
import NewApplications from "scenes/newApplications";
import Login from "scenes/login";
import SignUp from "scenes/signup";
import PersistLogin from "state/auth/PersistLogin";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route>
              <Route path="/register" element={<SignUp />} />
              <Route index path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Route>

            <Route element={<Layout />}>
              <Route element={<PersistLogin />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add_new" element={<NewApplications />} />
                <Route path="/applications" element={<Applications />} />
                <Route path="/details/:id" element={<ApplicationDetails />} />
              </Route>
            </Route>
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme="dark"
          />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
