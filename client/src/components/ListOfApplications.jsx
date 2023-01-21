import React, { useEffect, useState } from "react";
import {
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetApplicationsQuery } from "state/api";
import ChipComponent from "./ChipComponent";

const ListOfApplications = ({ currId = null, limit = null }) => {
  const isNonSmallScreens = useMediaQuery("(min-width: 850px)");
  const [filteredList, setFilteredList] = useState();
  const navigate = useNavigate();
  const { data, isLoading } = useGetApplicationsQuery();

  const hideOnSmall = isNonSmallScreens ? {} : { display: "none" };

  useEffect(() => {
    if (!isLoading && limit !== null) {
      setFilteredList(data.slice(limit));
    } else if (!isLoading) {
      setFilteredList(data.filter((ele) => ele._id !== currId));
    }
  }, [currId, data, isLoading, limit]);

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <List>
      {filteredList?.map((element) => {
        return (
          <ListItemButton
            key={element._id}
            onClick={() => navigate(`/details/${element._id}`)}
            sx={{ marginBottom: ".5rem" }}>
            <Grid container>
              <Grid item xs={7}>
                <Grid container direction={"column"}>
                  <Grid item sx={{ overflow: "hidden", whiteSpace: "nowrap" }}>
                    <ListItemText primary={element.companyName} />
                  </Grid>
                  <Grid item>
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
                </Grid>
              </Grid>

              <Grid item xs={5} sx={hideOnSmall}>
                <ListItemIcon sx={{ margin: ".5rem 0 0 1rem" }}>
                  <ChipComponent
                    params={element.status}
                    sx={{ fontSize: "0.95rem", width: "8rem" }}
                  />
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
