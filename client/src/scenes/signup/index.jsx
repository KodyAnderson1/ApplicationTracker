import { Box } from "@mui/material";
import SignUpForm from "components/SignUpForm";
import React from "react";

const SignUp = () => {
  return (
    <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
      <SignUpForm />
    </Box>
  );
};

export default SignUp;
