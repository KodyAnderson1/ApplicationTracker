// import * as React from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { STATUS_TYPES } from "./constants";

const defaultColumnWidth = 175;

const statusStyles = {
  width: 110,
  height: 40,
  padding: 0,
  paddingLeft: 2,
  paddingRight: 2,
  borderRadius: 5,
  fontSize: 12,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function statusHelper(params: string | undefined): any {
  switch (params) {
    case STATUS_TYPES.REVIEW:
      return (
        <Alert sx={statusStyles} variant="outlined" severity="info">
          Review
        </Alert>
      );
    case STATUS_TYPES.ASSESSMENT:
      return (
        <Alert sx={statusStyles} variant="outlined" severity="warning">
          Assessment
        </Alert>
      );
    case STATUS_TYPES.INTERVIEW:
      return (
        <Alert sx={statusStyles} variant="outlined" severity="warning">
          Interview
        </Alert>
      );
    case STATUS_TYPES.REJECTED:
      return (
        <Alert sx={statusStyles} variant="outlined" severity="error">
          Rejected
        </Alert>
      );
    case STATUS_TYPES.ACCEPTED:
      return (
        <Alert sx={statusStyles} variant="outlined" severity="success">
          Accepted
        </Alert>
      );
    default:
      return (
        <Alert sx={statusStyles} variant="outlined" severity="error">
          Error
        </Alert>
      );
  }

  if (params === STATUS_TYPES.ACCEPTED) {
    return (
      <Alert sx={statusStyles} variant="outlined" severity="success">
        Review
      </Alert>
    );
  }
}

function urlHelper(params: string | undefined | null) {
  if (params === undefined || params === null) return <></>;
  else {
    return (
      <Button
        onClick={() => window.open(params)}
        variant="contained"
        size="small"
        style={{ marginLeft: -5 }}>
        Open
      </Button>
    );
  }
}

function getDate(): string {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  return mm + "-" + dd + "-" + yyyy;
}

const columns: GridColDef[] = [
  {
    field: "companyName",
    headerName: "Company Name",
    width: defaultColumnWidth + 30,
    editable: false,
  },
  {
    field: "positionTitle",
    headerName: "Position Title",
    width: defaultColumnWidth + 80,
    editable: false,
  },
  {
    field: "status",
    headerName: "Status",
    width: defaultColumnWidth,
    editable: false,
    renderCell: (params: GridRenderCellParams<string>) => statusHelper(params.value),
  },
  {
    field: "location",
    headerName: "Location",
    width: defaultColumnWidth - 40,
    editable: false,
  },
  {
    field: "lastUpdated",
    headerName: "Last Updated",
    width: defaultColumnWidth + 20,
    editable: false,
  },
  {
    field: "dateApplied",
    headerName: "Date Applied",
    width: defaultColumnWidth + 20,
    editable: false,
  },
  {
    field: "inPersonLoc",
    headerName: "Campus",
    width: defaultColumnWidth - 40,
    editable: false,
  },
  {
    field: "url",
    width: defaultColumnWidth - 100,
    headerName: "Site",
    renderCell: (params: GridRenderCellParams<string>) => urlHelper(params.value),
  },
];

const rows = [
  {
    id: 1,
    companyName: "Google",
    positionTitle: "Software Internship",
    location: "REMOTE",
    status: STATUS_TYPES.REJECTED,
    lastUpdated: getDate(),
    dateApplied: getDate(),
    url: "https://www.google.com",
    inPersonLoc: "",
  },
  {
    id: 2,
    companyName: "Meta",
    positionTitle: "Software Developer Internship",
    location: "REMOTE",
    status: STATUS_TYPES.INTERVIEW,
    lastUpdated: getDate(),
    dateApplied: getDate(),
    url: null,
    inPersonLoc: null,
  },
  {
    id: 3,
    companyName: "Navy Federal",
    positionTitle: "Software Developer Internship",
    location: "IN PERSON",
    status: STATUS_TYPES.REVIEW,
    lastUpdated: getDate(),
    dateApplied: getDate(),
    url: null,
    inPersonLoc: "Seattle",
  },
  {
    id: 4,
    companyName: "Z Company",
    positionTitle: "Software Internship",
    location: "IN PERSON",
    status: STATUS_TYPES.REVIEW,
    lastUpdated: getDate(),
    dateApplied: getDate(),
    url: null,
    inPersonLoc: "Miami",
  },
];

const tableStyles = {
  height: rows.length * 89 || 500,
  width: "125%",
  marginTop: 10,
  marginLeft: -20,
};

export function DataTable() {
  return (
    <Container>
      <Box sx={tableStyles}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection={false}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          sx={{ backgroundColor: "white", border: "solid lightBlue" }}
        />
      </Box>
    </Container>
  );
}
