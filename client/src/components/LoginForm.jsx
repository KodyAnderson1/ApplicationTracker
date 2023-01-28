import React from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  Link,
  SvgIcon,
  useTheme,
  Tooltip,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useLoginMutation } from "state/auth/authAPISlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "state/auth/authSlice";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  // const userId = useSelector((state) => state.global.userId);
  // const [login] = useLoginMutation();
  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // Validate Form
    validationSchema: Yup.object({
      email: Yup.string()
        .max(30, "Email cannot be more than 30 characters!")
        .email("Invalid Email")
        .required("Email is Required!"),
      password: Yup.string()
        .max(50, "password cannot be more than 50 characters!")
        .min(8, "Must be at least 8 characters long!")
        .required("Password is Required!"),
    }),

    // Submit Form
    onSubmit: async (values) => {
      try {
        const { accessToken } = await login(values).unwrap();

        dispatch(setCredentials({ accessToken }));
        navigate("/dashboard");
        // formik.resetForm();
      } catch (error) {
        if (!error.status) {
          toast.error("No Server Response");
        } else if (error.status === 400) {
          toast.error("Missing Username or Password");
        } else if (error.status === 401) {
          toast.error("Wrong Username or Password");
        } else {
          toast.error(error?.data?.message);
        }
      }
    },
  });

  return (
    <Box component="form">
      <Paper elevation={20} sx={{ width: "125%", height: "30rem" }}>
        <Box justifyContent="center" alignItems="center" display="flex">
          <Typography sx={{ marginTop: "1rem" }} variant="h1">
            Log In
          </Typography>
        </Box>
        <Box justifyContent="center" alignItems="center" display="flex" marginTop=".3rem">
          <Typography variant="h5">New?</Typography>
          <Link
            underline="hover"
            to="/register"
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
              required
              error={formik.errors.email ? true : false}
              helperText={`${formik.errors.email ? formik.errors.email : " "}`}
              sx={{ width: "95%" }}
              name="email"
              id="email-logIn"
              label="Email"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              autoComplete="off"
            />
          </Box>
          <Box display="flex" justifyContent="center">
            <TextField
              required
              error={formik.errors.password ? true : false}
              helperText={`${formik.errors.password ? formik.errors.password : " "}`}
              type="password"
              sx={{ width: "95%" }}
              name="password"
              id="password-signUp"
              label="Password"
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </Box>
          <Box display="flex" justifyContent="center">
            <Button
              onClick={formik.handleSubmit}
              variant="contained"
              sx={{ width: "92%", backgroundColor: "#0d6efd", fontWeight: "bold" }}>
              Log In
            </Button>
          </Box>
          <Box justifyContent="end" display="flex" marginRight="1rem">
            <Tooltip title="Coming Soon!">
              <Button
                sx={{
                  fontStyle: "italic",
                  color: `${theme.palette.grey[300]}`,
                  marginBottom: "-1rem",
                }}
                variant="text">
                Forgot password?
              </Button>
            </Tooltip>
          </Box>
          <Divider />
          <ProviderSignIn />
        </Stack>
      </Paper>
    </Box>
  );
};

export function ProviderSignIn() {
  const gridItemStyles = {
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",
  };
  const initialText = "Sign In With";
  return (
    <>
      <Grid container sx={{ marginTop: "1rem" }}>
        <Grid item xs={4} sx={gridItemStyles}>
          <Tooltip title="Coming Soon!">
            <Button
              sx={{ width: "86%", backgroundColor: "black", fontWeight: "bold" }}
              variant="contained"
              startIcon={<GitHubIcon />}>
              {`${initialText} GitHub`}
            </Button>
          </Tooltip>
        </Grid>

        <Grid item xs={4} sx={gridItemStyles}>
          <Tooltip title="Coming Soon!">
            <Button
              variant="contained"
              sx={{ width: "86%", backgroundColor: "white", color: "black", fontWeight: "bold" }}
              startIcon={
                <SvgIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 326667 333333"
                    shapeRendering="geometricPrecision"
                    textRendering="geometricPrecision"
                    imageRendering="optimizeQuality"
                    fillRule="evenodd"
                    clipRule="evenodd">
                    <path
                      d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z"
                      fill="#4285f4"
                    />
                    <path
                      d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z"
                      fill="#34a853"
                    />
                    <path
                      d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z"
                      fill="#fbbc04"
                    />
                    <path
                      d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z"
                      fill="#ea4335"
                    />
                  </svg>
                </SvgIcon>
              }>
              {`${initialText} Google`}
            </Button>
          </Tooltip>
        </Grid>
        <Grid item xs={4} sx={gridItemStyles}>
          <Tooltip title="Coming Soon!">
            <Button
              variant="contained"
              sx={{ width: "86%", backgroundColor: "#055C9D", fontWeight: "bold" }}
              startIcon={<FacebookIcon />}>
              {`${initialText} Facebook`}
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
    </>
  );
}

export default LoginForm;
