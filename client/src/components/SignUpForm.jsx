import { Box, Button, Link, Paper, Stack, TextField, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import { useAddUserMutation } from "state/api";
import { useEffect } from "react";

const SignUpForm = () => {
  const [addUser, response] = useAddUserMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (response.status === "fulfilled" && response.data.message === "ok") {
      console.log("🚀 ~ file: SignUpForm.jsx:11 ~ SignUpForm ~ response", response);
      navigate("/login");
    }
  }, [response]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    // Validate Form
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(30, "Name cannot be more than 30 characters!")
        .required("First Name is Required!"),
      lastName: Yup.string()
        .max(30, "Name cannot be more than 30 characters!")
        .required("Last Name is Required!"),
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
    onSubmit: (values) => {
      // console.log(values);
      addUser(values);
      // formik.resetForm();
    },
  });

  // console.log(formik.errors);

  return (
    <Box component="form" id="signUpForm">
      <Paper elevation={20} sx={{ width: "30rem", height: "50rem" }}>
        <Box display="block" width="15rem" margin="auto" height="15rem">
          <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="white"
              d="M632.555 583.662a334.724 334.724 0 0 1 34.43 15.764c13.844 7.312 19.14 24.463 11.828 38.308-7.312 13.845-24.463 19.14-38.308 11.829-39.825-21.033-84.256-32.18-130.354-32.18-134.46 0-249.156 95.628-274.315 225.944-2.968 15.373-17.837 25.43-33.21 22.462-15.374-2.968-25.43-17.837-22.462-33.21 22.237-115.181 102.51-207.796 207.629-248.892-76.518-42.868-128.233-124.698-128.233-218.602 0-138.316 112.198-250.435 250.592-250.435 138.392 0 250.59 112.12 250.59 250.435 0 93.886-51.695 175.702-128.187 218.577z m71.487-218.577c0-106.992-86.804-193.735-193.89-193.735-107.088 0-193.892 86.742-193.892 193.735 0 106.992 86.804 193.734 193.892 193.734 107.086 0 193.89-86.743 193.89-193.734z m12.694 346.77V626.83a28.26 28.26 0 0 1 3.87-14.324 28.468 28.468 0 0 1 10.175-10.174 28.26 28.26 0 0 1 14.324-3.87 28.26 28.26 0 0 1 14.324 3.87 28.468 28.468 0 0 1 10.174 10.174 28.26 28.26 0 0 1 3.87 14.324v85.025h84.179c15.656 0 28.348 12.692 28.348 28.349 0 15.656-12.692 28.348-28.348 28.348h-84.18v84.08a28.26 28.26 0 0 1-3.87 14.324 28.468 28.468 0 0 1-10.173 10.174 28.26 28.26 0 0 1-14.324 3.87 28.26 28.26 0 0 1-14.324-3.87 28.468 28.468 0 0 1-10.175-10.174 28.26 28.26 0 0 1-3.87-14.324v-84.08h-85.124c-15.656 0-28.348-12.692-28.348-28.348 0-15.657 12.692-28.349 28.348-28.349h85.124z"
            />
          </svg>
        </Box>

        <Box justifyContent="center" alignItems="center" display="flex">
          <Typography sx={{ marginTop: "1rem" }} variant="h1">
            Register
          </Typography>
        </Box>
        <Stack gap={3} sx={{ marginTop: "2rem" }}>
          <Box display="flex" justifyContent="center" color="black">
            <TextField
              required
              error={formik.errors.firstName}
              helperText={`${formik.errors.firstName ? formik.errors.firstName : " "}`}
              sx={{ width: "75%" }}
              name="firstName"
              id="firstName-signUp"
              label="First Name"
              variant="standard"
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />
          </Box>
          <Box display="flex" justifyContent="center" color="black">
            <TextField
              required
              error={formik.errors.lastName}
              helperText={`${formik.errors.lastName ? formik.errors.lastName : " "}`}
              sx={{ width: "75%" }}
              name="lastName"
              id="lastName-signUp"
              label="Last Name"
              variant="standard"
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />
          </Box>
          <Box display="flex" justifyContent="center" color="black">
            <TextField
              required
              error={formik.errors.email}
              helperText={`${formik.errors.email ? formik.errors.email : " "}`}
              sx={{ width: "75%" }}
              name="email"
              id="email-signUp"
              label="Email"
              variant="standard"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </Box>
          <Box display="flex" justifyContent="center" color="black">
            <TextField
              required
              error={formik.errors.password}
              helperText={`${formik.errors.password ? formik.errors.password : " "}`}
              type="password"
              sx={{ width: "75%" }}
              name="password"
              id="password-signUp"
              label="Password"
              variant="standard"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </Box>
          <Box display="flex" justifyContent="center" marginTop="1rem">
            <Button
              onClick={formik.handleSubmit}
              variant="outlined"
              size="large"
              sx={{
                borderColor: "#0d6efd",
                width: "50%",
                color: "#0d6efd",
                fontWeight: "bold",
              }}>
              Create Account
            </Button>
          </Box>
          <Box justifyContent="center" alignItems="center" display="flex">
            <Link
              underline="hover"
              to="/login"
              variant="h6"
              component={RouterLink}
              sx={{
                fontStyle: "italic",
                color: "#ADD8E6",
                display: "inline",
              }}>
              Already Have An Account?
            </Link>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default SignUpForm;

{
  /* {keys.map((element) => {
            return (
              <Box key={element} display="flex" justifyContent="center" color="black">
                <TextField
                  required
                  sx={{ width: "75%" }}
                  name={`${element}`}
                  id={`${element}-login`}
                  label={`${fields[element]}`}
                  variant="standard"
                />
              </Box>
            );
          })} */
}
