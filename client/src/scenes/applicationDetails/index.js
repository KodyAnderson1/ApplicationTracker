import { Box, Button, Grid, useTheme } from "@mui/material";
import EditApplicationForm from "components/EditApplicationForm";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteApplicationMutation,
  useGetSingleApplicationQuery,
  useUpdateApplicationMutation,
} from "state/api";
import { Edit, EditOff, DeleteForever, Check } from "@mui/icons-material/";
import { toast } from "react-toastify";
import ListOfApplications from "components/ListOfApplications";
import { ACTION_TYPES, formReducer } from "state/formReducer";
import { stackToArray } from "utils";
import { useSelector } from "react-redux";

// ! Add a useContext for applications per user and then only make DB calls per page if ID isnt found with what is already here
// ! DONT FORGET TO UPDATE WITH _IDS!!!!! ^^^
// ! Find out why stackChips wouldn't work w/o its own state.
// ! Applications page no longer updates with state change? WHY

const ApplicationDetails = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const urlParams = useParams();
  const appId = urlParams.id;
  const userId = useSelector((state) => state.global.userId);

  const [editable, setIsEditable] = useState(false);
  const { data, isLoading } = useGetSingleApplicationQuery(appId);
  const [state, dispatch] = useReducer(formReducer, data);

  const [deleteApp] = useDeleteApplicationMutation();
  const [updateApplication, response] = useUpdateApplicationMutation();
  const [stackChips, setStackChips] = useState();

  useEffect(() => {
    if (!isLoading && data) {
      setStackChips(data.stack);
      dispatch({
        type: ACTION_TYPES.RESET,
        payload: data,
      });
    }
  }, [data, isLoading]);

  const handleEditable = () => setIsEditable(!editable);

  const handleDelete = () => {
    // console.log(state._id);
    deleteApp(state._id);
    toast.success("Application Deleted (Not really yet)");
    navigate("/applications");
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const modifiedState = { ...state, stack: stackChips, user_id: userId };
    setStackChips(modifiedState.stack);
    updateApplication(modifiedState, state._id);

    toast.success("Updated!");
  };

  const handleChange = (e) => {
    dispatch({
      type: ACTION_TYPES.UPDATE,
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  if (isLoading || !data || !state) return <h1>Loading...</h1>;

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title={`Details For  ${data.companyName}`} subtitle={`${data.positionTitle}`} />
        <Box display="flex" gap={2}>
          {editable ? (
            <>
              <Box>
                <Button
                  onClick={handleDelete}
                  sx={{
                    backgroundColor: "red",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                  }}>
                  <DeleteForever sx={{ mr: "10px" }} />
                  Delete
                </Button>
              </Box>
              <Box>
                <Button
                  color="success"
                  variant="contained"
                  onClick={handleUpdate}
                  sx={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                  }}>
                  <Check sx={{ mr: "10px" }} />
                  Save
                </Button>
              </Box>
            </>
          ) : (
            <></>
          )}
          <Button
            variant="contained"
            onClick={handleEditable}
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              marginRight: "1rem",
            }}>
            {editable ? <EditOff sx={{ mr: "10px" }} /> : <Edit sx={{ mr: "10px" }} />}
            Edit
          </Button>
        </Box>
      </FlexBetween>
      <Grid container direction="row" sx={{ height: "55vh" }}>
        <Grid item xs={9}>
          <EditApplicationForm
            isDisabled={!editable}
            data={state || {}}
            handleChange={handleChange}
            setStackChips={setStackChips}
            stackChips={stackChips}
          />
        </Grid>
        <Grid item xs={3} sx={{ height: "55vh", overflowY: "scroll" }}>
          <ListOfApplications />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ApplicationDetails;
