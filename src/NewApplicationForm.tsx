import react, { useState, useReducer } from "react";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Stack,
  Dialog,
  Box,
} from "@mui/material";
import { ACTION_TYPES, formReducer, INITIAL_STATE } from "./formReducer";
import { JOB_LOCATIONS, STATUS_TYPES } from "./constants";
import { spliceSlice } from "./utils";

/**
 *
 * Change Company and position title to Autocomplete component with a list
 *    of all previously submitted position names and company names
 *
 * https://mui.com/material-ui/react-dialog/
 * ^^ Form dialog
 */

export function NewApplicationForm() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    <div>
      <Button onClick={handleClickOpen}>
        <AddCircleOutlineIcon sx={{ marginRight: 1 }} /> Add Application
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent className="d-flex justify-content-center">
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}>
            {/* <Stack spacing={2} direction="column"> */}
            <div>
              <TextField
                className="form-input"
                name="companyName"
                id="outlined-basic"
                label="Company Name"
                variant="outlined"
                sx={{ marginTop: 1 }}
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
              <FormControl className="form-input">
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
              <FormControl className="form-input">
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
            {state.location === JOB_LOCATIONS.IN_PERSON ||
            state.location === JOB_LOCATIONS.HYBRID ? (
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
            {/* </Stack> */}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
