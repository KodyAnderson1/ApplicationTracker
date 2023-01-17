import { useState, useReducer } from "react";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormControl, InputLabel, MenuItem, Select, TextField, Button, Stack } from "@mui/material";
import { ACTION_TYPES, formReducer, INITIAL_STATE } from "./formReducer";
import { JOB_LOCATIONS, STATUS_TYPES } from "./constants";
import { spliceSlice } from "./utils";

/**
 * Will have a vertical table with all the companies
 *    already applied to (Set to remove duplicates)
 * Have it be a DROPBOX so can change between job titles
 * Have a click autofill position title
 */

export function NewApplicationForm() {
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const [date, setDate] = useState<Dayjs | null>(null);

  const handleChange = (e: any) => {
    dispatch({
      type: ACTION_TYPES.UPDATE,
      payload: { name: e.target.name, value: e.target.value },
    });
    console.log(state);
  };

  const handleDatePicker = (e: any) => {
    let dateString = `${e.$d.toString().slice(4, 15)}`;
    dateString = spliceSlice(dateString, 6, 0, ",");
    console.log(dateString);
    setDate(e);
    dispatch({
      type: ACTION_TYPES.UPDATE,
      payload: { name: "dateApplied", value: dateString },
    });
  };

  return (
    <form>
      <Stack spacing={2} direction="column">
        <div>
          <TextField
            className="form-input"
            name="companyName"
            id="outlined-basic"
            label="Company Name"
            variant="outlined"
            onChange={handleChange}
            value={state.companyName}
          />
        </div>
        <div>
          <TextField
            className="form-input"
            name="positionTitle"
            id="outlined-basic"
            label="Position Title"
            variant="outlined"
            onChange={handleChange}
            value={state.positionTitle}
          />
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className="form-input"
              label="Date Applied"
              value={date}
              onChange={(e) => handleDatePicker(e)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div>
          <TextField
            className="form-input"
            name="url"
            id="outlined-basic"
            label="Link to Website"
            variant="outlined"
            onChange={handleChange}
            value={state.url}
          />
        </div>
        <div>
          <FormControl>
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              name="status"
              labelId="status-select-label"
              id="status-select"
              value={state.status}
              label="Status"
              onChange={handleChange}>
              <MenuItem value={STATUS_TYPES.REVIEW}>Review</MenuItem>
              <MenuItem value={STATUS_TYPES.REJECTED}>Rejected</MenuItem>
              <MenuItem value={STATUS_TYPES.ACCEPTED}>Accepted</MenuItem>
              <MenuItem value={STATUS_TYPES.INTERVIEW}>Interview</MenuItem>
              <MenuItem value={STATUS_TYPES.ASSESSMENT}>Assessment</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl>
            <InputLabel id="location-select-label">Location</InputLabel>
            <Select
              name="location"
              labelId="location-select-label"
              id="location-select"
              value={state.location}
              label="Location"
              onChange={handleChange}>
              <MenuItem value={JOB_LOCATIONS.REMOTE}>Remote</MenuItem>
              <MenuItem value={JOB_LOCATIONS.IN_PERSON}>In Person</MenuItem>
              <MenuItem value={JOB_LOCATIONS.HYBRID}>Hybrid</MenuItem>
            </Select>
          </FormControl>
        </div>
        {state.location === JOB_LOCATIONS.IN_PERSON || state.location === JOB_LOCATIONS.HYBRID ? (
          <TextField
            className="form-input"
            name="inPersonLoc"
            id="outlined-basic"
            label="Job Location"
            variant="outlined"
            onChange={handleChange}
            value={state.inPersonLoc}
          />
        ) : (
          <></>
        )}
      </Stack>
      <div>
        <Button className="form-button" variant="contained">
          Submit
        </Button>
      </div>
    </form>
  );
}
