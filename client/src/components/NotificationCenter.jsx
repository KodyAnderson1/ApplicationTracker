import { useTheme } from "@emotion/react";
import {
  Box,
  Card,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ChipComponent from "./ChipComponent";
import { useNavigate } from "react-router-dom";

const NotificationCenter = ({ data = [] }) => {
  const theme = useTheme();
  // console.log("🚀 ~ file: NotificationCenter.jsx:4 ~ NotificationCenter ~ data", data);

  if (!data || data.length === 0)
    return (
      <Typography variant="h2" sx={{ color: theme.palette.secondary[300] }}>
        No Notifications to display!
      </Typography>
    );

  return (
    <Box>
      <Typography variant="h4" sx={{ color: theme.palette.secondary[300] }}>
        These have not been updated in +7 days!
      </Typography>
      <List>
        {data.map((element) => {
          return (
            <div key={element._id}>
              <Notification data={element} />
            </div>
          );
        })}
      </List>
    </Box>
  );
};

function Notification({ data }) {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Paper elevation={12}>
      <ListItemButton
        key={data._id}
        onClick={() => navigate(`/details/${data._id}`)}
        sx={{ marginBottom: ".5rem" }}>
        <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid item xs={7} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Grid container direction={"column"}>
              <Grid item sx={{ overflow: "hidden", whiteSpace: "nowrap" }}>
                <ListItemText primary={data.companyName} />
              </Grid>
              <Grid item>
                <ListItemText
                  sx={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    display: "block",
                  }}
                  primary={data.positionTitle}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <ListItemIcon
              sx={{
                margin: ".5rem 0 0 1rem",
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}>
              <ChipComponent params={data.status} sx={{ fontSize: "0.95rem", width: "8rem" }} />
            </ListItemIcon>
          </Grid>
        </Grid>
      </ListItemButton>
    </Paper>
  );
}

export default NotificationCenter;
