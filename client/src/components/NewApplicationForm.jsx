import { useState, useReducer, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Box,
  useTheme,
  Tooltip,
  Autocomplete,
} from "@mui/material";
import { ACTION_TYPES, formReducer, INITIAL_STATE } from "../state/formReducer";
import { JOB_TYPE, STATUS_TYPES } from "../constants";
import { stackToArray } from "../utils";
import { useAddNewApplicationMutation, useGetApplicationsQuery } from "state/api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

/**
 *
 * Change Company and position title to Autocomplete component with a list
 *    of all previously submitted position names and company names
 *
 * https://mui.com/material-ui/react-dialog/
 * ^^ Form dialog
 */

export function NewApplicationForm() {
  const [addNewApplication] = useAddNewApplicationMutation();
  const { data, isLoading } = useGetApplicationsQuery();

  const userId = useSelector((state) => state.global.userId);
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const [previousPositions, setPreviousPositions] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      const firstStep = new Set(data.map((element) => element.positionTitle));
      setPreviousPositions(Array.from(firstStep));
    }
  }, [data, isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const modifiedState = { ...state, stack: stackToArray(state.stack), user_id: userId };

    addNewApplication(modifiedState);
    dispatch({
      type: ACTION_TYPES.RESET,
      payload: INITIAL_STATE,
    });

    toast.success("Submitted!");
  };

  const handleChange = (e, autocompleteVal = null) => {
    if (autocompleteVal) {
      dispatch({
        type: ACTION_TYPES.UPDATE,
        payload: { name: "positionTitle", value: autocompleteVal },
      });
    } else {
      dispatch({
        type: ACTION_TYPES.UPDATE,
        payload: { name: e.target.name, value: e.target.value },
      });
    }
  };

  return (
    <Box
      noValidate
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "16rem",
        gap: "1.5rem",
      }}>
      <div>
        <TextField
          fullWidth
          name="companyName"
          id="companyNameFormId"
          label="Company Name"
          variant="outlined"
          sx={{ marginTop: 1 }}
          onChange={(e) => handleChange(e)}
          value={state.companyName}
        />
      </div>
      <div>
        <Autocomplete
          name="positionTitle"
          id="positionTitleFormId"
          label="Position"
          variant="outlined"
          onInputChange={(event, newInputValue) => handleChange(event, newInputValue)}
          value={state.positionTitle}
          options={previousPositions}
          renderInput={(params) => <TextField {...params} label="Position" />}
          isOptionEqualToValue={(option, value) => option.id === value.id}
        />
      </div>
      <div>
        <TextField
          fullWidth
          name="url"
          id="urlFormId"
          label="Link to Website"
          variant="outlined"
          onChange={(e) => handleChange(e)}
          value={state.url}
        />
      </div>
      <div>
        <TextField
          fullWidth
          name="salary"
          id="salaryFormId"
          label="Salary Offered"
          variant="outlined"
          onChange={(e) => handleChange(e)}
          value={state.salary}
        />
      </div>
      <Tooltip
        title={
          "Format as Comma separated values. Currently no way to update this after submission!"
        }>
        <div>
          <TextField
            fullWidth
            name="stack"
            id="stackFormId"
            label="Programming Stack"
            variant="outlined"
            onChange={handleChange}
            value={state.stack}
          />
        </div>
      </Tooltip>
      <div>
        <FormControl fullWidth>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            name="status"
            labelId="status-select-label"
            id="status-select"
            value={state.status}
            label="Status"
            onChange={(e) => handleChange(e)}>
            <MenuItem value={STATUS_TYPES.REVIEW}>Under Review</MenuItem>
            <MenuItem value={STATUS_TYPES.REJECTED}>Rejected</MenuItem>
            <MenuItem value={STATUS_TYPES.ACCEPTED}>Accepted</MenuItem>
            <MenuItem value={STATUS_TYPES.INTERVIEW}>Interview</MenuItem>
            <MenuItem value={STATUS_TYPES.ASSESSMENT}>Assessment</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl fullWidth>
          <InputLabel id="location-select-label">Job Type</InputLabel>
          <Select
            name="jobType"
            labelId="location-select-label"
            id="jobTypeSelect"
            value={state.jobType}
            label="jobType"
            onChange={(e) => handleChange(e)}>
            <MenuItem value={JOB_TYPE.REMOTE}>Remote</MenuItem>
            <MenuItem value={JOB_TYPE.IN_PERSON}>In Person</MenuItem>
            <MenuItem value={JOB_TYPE.HYBRID}>Hybrid</MenuItem>
          </Select>
        </FormControl>
      </div>
      {state.jobType === JOB_TYPE.IN_PERSON || state.jobType === JOB_TYPE.HYBRID ? (
        <TextField
          fullWidth
          name="location"
          id="locationFormId"
          label="Location"
          variant="outlined"
          onChange={(e) => handleChange(e)}
          value={state.location}
        />
      ) : (
        <></>
      )}
      <Button onClick={handleSubmit} variant="contained">
        Submit
      </Button>
    </Box>
  );
}
