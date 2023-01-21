import { useTheme } from "@emotion/react";
import { Grid, Box, Typography } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import ListOfApplications from "components/ListOfApplications";
import { NewApplicationForm } from "components/NewApplicationForm";
import React from "react";

const NewApplications = () => {
  const theme = useTheme();
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title={`Add Application`} subtitle={`Add An Application To Track!`} />
      </FlexBetween>
      <Grid container>
        <Grid item xs={2} sx={{ m: "2rem 2rem" }}>
          <NewApplicationForm />
        </Grid>
        <Grid item xs={6}>
          {/* <Typography
            variant="h3"
            color={theme.palette.secondary[300]}
            sx={{ display: "flex", justifyContent: "center" }}>
            Common Resume Questions
          </Typography> */}
        </Grid>
        <Grid item xs={3}>
          <Typography
            variant="h3"
            color={theme.palette.secondary[300]}
            sx={{ display: "flex", justifyContent: "center" }}>
            Last 5 Applications
          </Typography>
          <ListOfApplications limit={-5} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewApplications;
