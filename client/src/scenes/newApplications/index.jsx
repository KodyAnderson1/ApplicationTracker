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
        <Grid item xs={12} sm={5} md={2} lg={5} sx={{ m: "2rem 2rem" }}>
          <NewApplicationForm />
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={3}></Grid>
        <Grid item xs={12} sm={3} md={6} lg={3} sx={{ m: "2rem 0 0 0" }}>
          <ListOfApplications limit={-7} height={"58vh"} title={"Last 7 Applications"} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewApplications;
