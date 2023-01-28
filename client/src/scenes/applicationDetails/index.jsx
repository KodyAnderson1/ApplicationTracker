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
import { useSelector } from "react-redux";

const ApplicationDetails = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const urlParams = useParams();
  const appId = urlParams.id;
  const userId = useSelector((state) => state.global.userId);

  const [editable, setIsEditable] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { data, isLoading } = useGetSingleApplicationQuery(appId);
  const [state, dispatch] = useReducer(formReducer, data);

  const [deleteApp] = useDeleteApplicationMutation();
  const [updateApplication] = useUpdateApplicationMutation();
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

  const handleEditable = () => {
    setIsEditable(!editable);
    setConfirmDelete(false);
  };

  const handleDelete = () => {
    deleteApp(state._id);
    toast.success("Application Deleted");
    setConfirmDelete(false);
    navigate("/applications");
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const modifiedState = { ...state, stack: stackChips, user_id: userId };
    setStackChips(modifiedState.stack);
    updateApplication(modifiedState, state._id);
    handleEditable();
    setConfirmDelete(false);
    toast.success("Updated!");
  };

  const handleChange = (e) => {
    dispatch({
      type: ACTION_TYPES.UPDATE,
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const deleteButtons = confirmDelete ? (
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
          Confirm Delete
        </Button>
      </Box>
    </>
  ) : (
    <>
      <Box>
        <Button
          onClick={() => setConfirmDelete(!confirmDelete)}
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
    </>
  );

  if (isLoading || !data || !state) return <h1>Loading...</h1>;

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title={`Update ${data.companyName} Application`}
          subtitle={`${data.positionTitle}`}
        />
        <Box display="flex" gap={2}>
          {editable ? (
            <>
              {deleteButtons}
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

      <Grid container>
        <Grid item xs={9}>
          <EditApplicationForm
            isDisabled={!editable}
            data={state || {}}
            handleChange={handleChange}
            setStackChips={setStackChips}
            stackChips={stackChips}
          />
        </Grid>
        <Grid item xs={3} sx={{ marginTop: "2rem" }}>
          <ListOfApplications
            currId={state?._id || data._id || null}
            title={"All Applications"}
            height={"70vh"}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ApplicationDetails;
