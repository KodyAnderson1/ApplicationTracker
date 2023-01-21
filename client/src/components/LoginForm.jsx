import React from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
  Link,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Link as RouterLink } from "react-router-dom";

const LoginForm = () => {
  return (
    <>
      <Paper elevation={20} sx={{ width: "45rem", height: "30rem" }}>
        <Box justifyContent="center" alignItems="center" display="flex">
          <Typography sx={{ marginTop: "1rem" }} variant="h1">
            Log In
          </Typography>
        </Box>
        <Box justifyContent="center" alignItems="center" display="flex">
          <Typography variant="h5">New?</Typography>
          <Link
            underline="hover"
            to="/signup"
            variant="h5"
            component={RouterLink}
            sx={{
              fontStyle: "italic",
              color: "#ADD8E6",
              display: "inline",
              marginLeft: ".30rem",
            }}>
            Create An Account
          </Link>
        </Box>
        <Stack gap={2} sx={{ marginTop: "2rem" }}>
          <Box display="flex" justifyContent="center" color="black">
            <TextField
              sx={{ width: "95%" }}
              name="email"
              id="email-login"
              label="Email"
              variant="outlined"
            />
          </Box>
          <Box display="flex" justifyContent="center">
            <TextField
              sx={{ color: "black", width: "95%" }}
              fullWidth
              name="password"
              id="password-login"
              label="Password"
              variant="outlined"
            />
          </Box>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              sx={{
                width: "92%",
                marginTop: ".5rem",
                backgroundColor: "#0d6efd",
                fontWeight: "bold",
              }}>
              Log In
            </Button>
          </Box>
          <Box sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
            <Button sx={{ fontStyle: "italic", color: "white" }} variant="text" disabled>
              Forget your password?
            </Button>
          </Box>
          <Divider />
          <ProviderSignIn />
        </Stack>
      </Paper>
    </>
  );
};

export function ProviderSignIn() {
  return (
    <>
      <Box display="flex" justifyContent="center">
        <Typography variant="h5">Sign In through another Provider:</Typography>
      </Box>
      <Grid container>
        <Grid item xs={4} sx={{ display: "flex", justifyContent: "center" }}>
          <Button sx={{ width: "70%" }} variant="contained" startIcon={<GitHubIcon />}>
            GitHub
          </Button>
        </Grid>
        <Grid item xs={4} sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" sx={{ width: "70%" }} startIcon={<GoogleIcon />}>
            Google
          </Button>
        </Grid>
        <Grid item xs={4} sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" sx={{ width: "70%" }} startIcon={<FacebookIcon />}>
            Facebook
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default LoginForm;
