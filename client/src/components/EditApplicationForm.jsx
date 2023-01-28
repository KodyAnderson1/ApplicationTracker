import { JOB_TYPE } from "constants";
import { STATUS_TYPES } from "constants";
import React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { formatDate } from "utils";

const EditApplicationForm = ({
  isDisabled = false,
  data,
  handleChange,
  setStackChips,
  stackChips,
}) => {
  return (
    <Grid container direction="column">
      <Box component="form" p="2rem">
        {/* <Grid item> */}
        <Grid item>
          <TextField
            sx={{ width: "15rem", margin: "1rem 0rem 0 0" }}
            name="companyName"
            disabled={isDisabled}
            id="companyName"
            label="Company Name"
            variant="outlined"
            onChange={handleChange}
            value={data?.companyName}
          />
        </Grid>
        <Grid item>
          <FormControl sx={{ width: "15rem", margin: "1rem 0rem 0 0" }}>
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              // fullWidth
              disabled={isDisabled}
              name="status"
              labelId="status-select-label"
              id="status-select"
              value={data?.status === undefined ? "" : data.status}
              label="Status"
              onChange={handleChange}>
              <MenuItem value={STATUS_TYPES.REVIEW}>Under Review</MenuItem>
              <MenuItem value={STATUS_TYPES.REJECTED}>Rejected</MenuItem>
              <MenuItem value={STATUS_TYPES.ACCEPTED}>Accepted</MenuItem>
              <MenuItem value={STATUS_TYPES.INTERVIEW}>Interview</MenuItem>
              <MenuItem value={STATUS_TYPES.ASSESSMENT}>Assessment</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <TextField
            name="positionTitle"
            disabled={isDisabled}
            id="positionTitle"
            label="Position"
            variant="outlined"
            value={data?.positionTitle}
            onChange={handleChange}
            sx={{ width: "15rem", margin: "1rem 0rem 0 0" }}
          />
        </Grid>
        <Grid item>
          <TextField
            sx={{ width: "15rem", margin: "1rem 0rem 0 0" }}
            name="url"
            disabled={isDisabled}
            id="url"
            label="URL"
            variant="outlined"
            value={data?.url}
            onChange={handleChange}
            InputProps={{
              endAdornment: data.url ? (
                <Button
                  onClick={() => window.open(data.url)}
                  sx={{
                    marginRight: "-.5rem",
                    width: 50,
                    p: 1,
                    height: "2rem",
                  }}
                  variant="contained">
                  Go
                </Button>
              ) : (
                <></>
              ),
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            sx={{ width: "15rem", margin: "1rem 0rem 0 0" }}
            name="location"
            disabled={isDisabled}
            id="location"
            label="Location"
            variant="outlined"
            value={data?.location}
            onChange={handleChange}
          />
        </Grid>
        {/* </Grid> */}
        {/* <Grid item> */}
        <Grid item>
          <FormControl sx={{ width: "15rem", margin: "1rem 0rem 0 0" }}>
            <InputLabel id="location-select-label">Job Type</InputLabel>
            <Select
              disabled={isDisabled}
              name="jobType"
              labelId="location-select-label"
              id="jobTypeSelect"
              value={data?.jobType === undefined ? "" : data.jobType}
              label="jobType"
              onChange={handleChange}>
              <MenuItem value={JOB_TYPE.REMOTE}>Remote</MenuItem>
              <MenuItem value={JOB_TYPE.IN_PERSON}>In Person</MenuItem>
              <MenuItem value={JOB_TYPE.HYBRID}>Hybrid</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <TextField
            sx={{ width: "15rem", margin: "1rem 0rem 0 0" }}
            disabled={isDisabled}
            name="salary"
            id="salary"
            label="Salary"
            variant="outlined"
            onChange={handleChange}
            value={data?.salary || 0}
          />
        </Grid>
        <Grid item>
          <TextField
            disabled
            id="appliedAt"
            variant="outlined"
            value={formatDate(data?.createdAt)}
            label="Applied On"
            onChange={() => console.log()}
            sx={{ width: "15rem", margin: "1rem 0rem 0 0" }}
          />
        </Grid>
        <Grid item>
          <TextField
            disabled
            id="lastUpdated"
            variant="outlined"
            value={formatDate(data?.createdAt)}
            onChange={() => console.log()}
            label="Last Updated"
            sx={{ width: "15rem", margin: "1rem 0rem 0 0" }}
          />
        </Grid>
        <Grid item>
          <ChipsArray
            name="stack"
            isDisabled={isDisabled}
            setStackChips={setStackChips}
            stackChips={stackChips}
          />
        </Grid>
        {/* </Grid> */}
      </Box>
    </Grid>
  );
};

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

function ChipsArray({ isDisabled, setStackChips, stackChips }) {
  const handleDelete = (chipToDelete) => () => {
    setStackChips(stackChips.filter((chip) => chip !== chipToDelete));
  };

  if (!stackChips || stackChips.length === 0) return <></>;

  const chipsToDisplay = stackChips?.map((data, index) => {
    return (
      <div key={index}>
        {isDisabled ? (
          <ListItem>
            <Chip label={data} sx={{ fontSize: "1.2rem" }} />
          </ListItem>
        ) : (
          <ListItem>
            <Chip sx={{ fontSize: "1.2rem" }} label={data} onDelete={handleDelete(data)} />
          </ListItem>
        )}
      </div>
    );
  });

  return (
    <>
      <Typography variant="h2" sx={{ marginTop: "2rem" }}>
        Stack
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          listStyle: "none",
          p: 0.5,
          m: 0,
        }}
        component="ul">
        {chipsToDisplay}
      </Box>
    </>
  );
}

export default EditApplicationForm;
