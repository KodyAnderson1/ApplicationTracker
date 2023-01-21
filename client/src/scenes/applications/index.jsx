import React from "react";
import { Box, Button, useTheme } from "@mui/material";
import { useGetApplicationsQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";

import ChipComponent from "components/ChipComponent";
import { formatDate, formatJobType, salaryFormatter } from "utils";
import { useNavigate } from "react-router-dom";

const Applications = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetApplicationsQuery();
  const navigate = useNavigate();

  const columns = [
    {
      field: "status",
      headerName: "Status",
      flex: 0.4,
      renderCell: (params) => (
        <ChipComponent params={params.value} sx={{ fontSize: "18px", width: "150px" }} />
      ),
    },
    {
      field: "companyName",
      headerName: "Company Name",
      flex: 0.35,
    },
    {
      field: "positionTitle",
      headerName: "Position",
      flex: 0.5,
    },

    {
      field: "location",
      headerName: "Location",
      flex: 0.3,
    },
    {
      field: "jobType",
      headerName: "Job Type",
      flex: 0.25,
      renderCell: (params) => formatJobType(params.value),
    },
    {
      field: "salary",
      headerName: "Salary",
      flex: 0.35,
      renderCell: (params) => salaryFormatter(params.value),
    },
    {
      field: "createdAt",
      headerName: "Applied On",
      flex: 0.35,
      renderCell: (params) => formatDate(params.value),
    },
    {
      field: "updatedAt",
      headerName: "Last Updated",
      flex: 0.35,
      renderCell: (params) => formatDate(params.value),
    },
    {
      field: "url",
      headerName: "URL",
      flex: 0.17,
      renderCell: (params) => {
        return params.value ? (
          <Button onClick={(e) => window.open(`${params.value}`)} variant="contained">
            Go
          </Button>
        ) : (
          <></>
        );
      },
    },
    {
      field: "_id",
      headerName: "Details",
      flex: 0.17,
      renderCell: (params) => {
        return params.value ? (
          <Button onClick={() => navigate(`/details/${params.value}`)} variant="contained">
            Go
          </Button>
        ) : (
          <></>
        );
      },
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Applications" subtitle="All Applications" />
      <Box mt="40px" height="75vh">
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Applications;
