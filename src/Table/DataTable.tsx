// import * as React from "react";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import { DataGrid } from "@mui/x-data-grid";
// import { STATUS_TYPES } from "../constants";
import { tableColumns } from "./TableColumns";
import { tableRows } from "./TableRows";

const tableStyles = {
  height: 370,
  width: "108.5%",
  // marginTop: 10,
  marginTop: 33,
  marginLeft: -6,
};

export function DataTable() {
  return (
    <Container>
      <Box sx={tableStyles}>
        <DataGrid
          rows={tableRows}
          columns={tableColumns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          sx={{ backgroundColor: "white" }}
        />
      </Box>
    </Container>
  );
}
