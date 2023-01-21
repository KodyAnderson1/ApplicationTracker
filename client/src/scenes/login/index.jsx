import React from "react";
import { Box } from "@mui/material";

import LoginForm from "components/LoginForm";

const Login = () => {
  return (
    <>
      <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
        <LoginForm />
      </Box>
    </>
  );
};

export default Login;
