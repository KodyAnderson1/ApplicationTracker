import { useState, useReducer } from "react";
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
} from "@mui/material";
import { ACTION_TYPES, formReducer, INITIAL_STATE } from "../state/formReducer";
import { JOB_TYPE, STATUS_TYPES } from "../constants";
import { spliceSlice, stackToArray } from "../utils";
import { useAddNewApplicationMutation } from "state/api";
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
  // const theme = useTheme();
  const userId = useSelector((state) => state.global.userId);
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const [addNewApplication, response] = useAddNewApplicationMutation();

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

  const handleChange = (e) => {
    dispatch({
      type: ACTION_TYPES.UPDATE,
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  return (
    <div>
      <Box
        noValidate
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          m: "6rem 8rem",
          width: "fit-content",
          gap: "1.5rem",
        }}>
        <div>
          <TextField
            name="companyName"
            id="companyNameFormId"
            label="Company Name"
            variant="outlined"
            sx={{ marginTop: 1 }}
            onChange={handleChange}
            value={state.companyName}
          />
        </div>
        <div>
          <TextField
            name="positionTitle"
            id="positionTitleFormId"
            label="Position"
            variant="outlined"
            onChange={handleChange}
            value={state.positionTitle}
          />
        </div>
        <div>
          <TextField
            name="url"
            id="urlFormId"
            label="Link to Website"
            variant="outlined"
            onChange={handleChange}
            value={state.url}
          />
        </div>
        <div>
          <TextField
            name="salary"
            id="salaryFormId"
            label="Salary Offered"
            variant="outlined"
            onChange={handleChange}
            value={state.salary}
          />
        </div>
        <Tooltip title={"Format as Comma separated values!"}>
          <div>
            <TextField
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
          <FormControl sx={{ minWidth: "13.5rem" }}>
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              name="status"
              labelId="status-select-label"
              id="status-select"
              value={state.status}
              label="Status"
              onChange={handleChange}>
              <MenuItem value={STATUS_TYPES.REVIEW}>Under Review</MenuItem>
              <MenuItem value={STATUS_TYPES.REJECTED}>Rejected</MenuItem>
              <MenuItem value={STATUS_TYPES.ACCEPTED}>Accepted</MenuItem>
              <MenuItem value={STATUS_TYPES.INTERVIEW}>Interview</MenuItem>
              <MenuItem value={STATUS_TYPES.ASSESSMENT}>Assessment</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ minWidth: "13.5rem" }}>
            <InputLabel id="location-select-label">Job Type</InputLabel>
            <Select
              name="jobType"
              labelId="location-select-label"
              id="jobTypeSelect"
              value={state.jobType}
              label="jobType"
              onChange={handleChange}>
              <MenuItem value={JOB_TYPE.REMOTE}>Remote</MenuItem>
              <MenuItem value={JOB_TYPE.IN_PERSON}>In Person</MenuItem>
              <MenuItem value={JOB_TYPE.HYBRID}>Hybrid</MenuItem>
            </Select>
          </FormControl>
        </div>
        {state.jobType === JOB_TYPE.IN_PERSON || state.jobType === JOB_TYPE.HYBRID ? (
          <TextField
            name="location"
            id="locationFormId"
            label="Location"
            variant="outlined"
            onChange={handleChange}
            value={state.location}
          />
        ) : (
          <></>
        )}
        {/* </Stack> */}
        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
      </Box>
    </div>
  );
}
