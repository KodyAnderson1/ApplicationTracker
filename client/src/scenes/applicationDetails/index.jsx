import { Box, Button, Grid, useTheme } from "@mui/material";
import EditApplicationForm from "components/EditApplicationForm";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteApplicationMutation,
  useGetApplicationsQuery,
  useGetSingleApplicationQuery,
  useUpdateApplicationMutation,
} from "state/api";
import { Edit, EditOff, DeleteForever, Check } from "@mui/icons-material/";
import { toast } from "react-toastify";
import ListOfApplications from "components/ListOfApplications";
import { ACTION_TYPES, formReducer } from "state/formReducer";
import { useSelector } from "react-redux";

// ! Move state and form management into the actual form. Pass data down still? Or just URL params?
const ApplicationDetails = ({ appId }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const urlParams = useParams();

  appId = urlParams.id;
  // console.log("🚀 ~ file: index.jsx:25 ~ ApplicationDetails ~ appId", appId);
  // const isLoading = false;
  const [editable, setIsEditable] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  // const { data: application, isLoading } = useGetSingleApplicationQuery(appId);
  const { application, isLoading } = useGetApplicationsQuery("Applications", {
    selectFromResult: ({ data, error, isLoading }) => ({
      application: data?.filter((d) => d._id === appId),
      isLoading,
    }),
  });

  const [state, dispatch] = useReducer(formReducer, application);

  const [deleteApp] = useDeleteApplicationMutation();
  const [updateApplication] = useUpdateApplicationMutation();
  const [stackChips, setStackChips] = useState();

  useEffect(() => {
    if (application) {
      const d = { ...application };
      console.log("🚀 ~ file: index.jsx:47 ~ useEffect ~ application", d[0]);
      setStackChips(application.stack);
      dispatch({
        type: ACTION_TYPES.RESET,
        payload: d[0],
      });
    }
  }, [isLoading, appId]);

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
    const modifiedState = { ...state, stack: stackChips };
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

  if (!application || !state) return <h1>Loading...</h1>;

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title={`Update ${state.companyName} Application`}
          subtitle={`${state.positionTitle}`}
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
            currId={state?._id || application?._id || null}
            title={"All Applications"}
            height={"70vh"}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ApplicationDetails;
