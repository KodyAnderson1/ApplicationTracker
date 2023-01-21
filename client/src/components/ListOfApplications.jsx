import React from "react";
import { Grid, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetApplicationsQuery } from "state/api";
import ChipComponent from "./ChipComponent";

const ListOfApplications = () => {
  const { data, isLoading } = useGetApplicationsQuery();

  const navigate = useNavigate();

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <List>
      {data?.map((element) => {
        return (
          <ListItemButton
            key={element._id}
            onClick={() => navigate(`/details/${element._id}`)}
            sx={{ marginBottom: ".5rem" }}>
            <Grid container>
              <Grid item xs={7} sx={{ overflow: "hidden", whiteSpace: "nowrap" }}>
                <ListItemText primary={element.companyName} />
                <ListItemText
                  sx={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    display: "block",
                  }}
                  primary={element.positionTitle}
                />
              </Grid>
              <Grid
                item
                xs={5}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <ListItemIcon sx={{ margin: "0 0 0 1rem" }}>
                  <ChipComponent params={element.status} sx={{ fontSize: "15px", width: "8rem" }} />
                </ListItemIcon>
              </Grid>
            </Grid>
          </ListItemButton>
        );
      })}
    </List>
  );
};

export default ListOfApplications;
