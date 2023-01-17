import Alert, { AlertColor } from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { STATUS_TYPES } from "../constants";
import DoneIcon from "@mui/icons-material/Done";

const DEFAULT_COLUMN_WIDTH = 126;

type AlertComponentProps = {
  alertSeverity: AlertColor;
  message: STATUS_TYPES | string;
};

const tableStatusStyles = {
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

function statusHelper(params: string | undefined) {
  switch (params) {
    case STATUS_TYPES.REVIEW:
      return <AlertComponent alertSeverity={"info"} message={STATUS_TYPES.REVIEW} />;
    case STATUS_TYPES.ASSESSMENT:
      return <AlertComponent alertSeverity={"warning"} message={STATUS_TYPES.ASSESSMENT} />;
    case STATUS_TYPES.INTERVIEW:
      return <AlertComponent alertSeverity={"warning"} message={STATUS_TYPES.INTERVIEW} />;
    case STATUS_TYPES.REJECTED:
      return <AlertComponent alertSeverity={"error"} message={STATUS_TYPES.REJECTED} />;
    case STATUS_TYPES.ACCEPTED:
      return <AlertComponent alertSeverity={"success"} message={STATUS_TYPES.ACCEPTED} />;
    default:
      return <AlertComponent alertSeverity={"warning"} message={"ERROR"} />;
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
        style={{ marginLeft: 5 }}>
        Open
      </Button>
    );
  }
}

export const tableColumns: GridColDef[] = [
  {
    field: "companyName",
    headerName: "Company Name",
    width: DEFAULT_COLUMN_WIDTH + 60,
    editable: false,
  },
  {
    field: "positionTitle",
    headerName: "Position Title",
    width: DEFAULT_COLUMN_WIDTH + 120,
    editable: false,
  },
  {
    field: "status",
    headerName: "Status",
    width: DEFAULT_COLUMN_WIDTH + 30,
    editable: false,
    renderCell: (params: GridRenderCellParams<string>) => statusHelper(params.value),
  },
  {
    field: "location",
    headerName: "Location",
    width: DEFAULT_COLUMN_WIDTH,
    editable: false,
  },
  {
    field: "inPersonLoc",
    headerName: "Site",
    width: DEFAULT_COLUMN_WIDTH,
    editable: false,
  },
  {
    field: "lastUpdated",
    headerName: "Last Updated",
    width: DEFAULT_COLUMN_WIDTH,
    editable: false,
  },
  {
    field: "dateApplied",
    headerName: "Date Applied",
    width: DEFAULT_COLUMN_WIDTH,
    editable: false,
  },
  {
    field: "url",
    width: DEFAULT_COLUMN_WIDTH - 20,
    headerName: "Website",
    renderCell: (params: GridRenderCellParams<string>) => urlHelper(params.value),
    editable: false,
  },
];

function AlertComponent(props: AlertComponentProps) {
  return (
    <Alert sx={tableStatusStyles} variant="outlined" severity={props.alertSeverity}>
      {props.message}
    </Alert>
  );
}
