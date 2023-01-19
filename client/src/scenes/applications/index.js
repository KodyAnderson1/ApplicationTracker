import React from "react";
import { Box, Button, Chip, useTheme } from "@mui/material";
import { useGetApplicationsQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { Done, Grading, Close, Person, Error, Assessment } from "@mui/icons-material";
import { STATUS_TYPES } from "constants";
import { JOB_TYPE } from "constants";

export function statusHelper(params) {
  switch (params) {
    case STATUS_TYPES.REVIEW:
      return <ChipComponent color={"info"} message={STATUS_TYPES.REVIEW} icon={<Grading />} />;
    case STATUS_TYPES.ASSESSMENT:
      return (
        <ChipComponent
          color={"secondary"}
          message={STATUS_TYPES.ASSESSMENT}
          icon={<Assessment />}
        />
      );
    case STATUS_TYPES.INTERVIEW:
      return (
        <ChipComponent color={"secondary"} message={STATUS_TYPES.INTERVIEW} icon={<Person />} />
      );
    case STATUS_TYPES.REJECTED:
      return <ChipComponent color={"error"} message={STATUS_TYPES.REJECTED} icon={<Close />} />;
    case STATUS_TYPES.ACCEPTED:
      return <ChipComponent color={"success"} message={STATUS_TYPES.ACCEPTED} icon={<Done />} />;
    default:
      return <ChipComponent color={"warning"} message={"ERROR"} icon={<Error />} />;
  }
}

export function salaryFormatter(params) {
  if (!params) return "";
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(params);
}

export function formatJobType(params) {
  if (params === JOB_TYPE.IN_PERSON) {
    const words = params.split("-");

    for (let i = 0; i < words.length; i++)
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);

    return `${words[0]} ${words[1]}`;
  }

  return params.charAt(0).toUpperCase() + params.slice(1);
}

export function formatDate(params) {
  const [date, time] = params.split(["T"]);
  const [actualTime] = time.split(".");
  return `${date} ${actualTime}`;
}

const Applications = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetApplicationsQuery();

  const columns = [
    {
      field: "status",
      headerName: "Status",
      flex: 0.4,
      renderCell: (params) => statusHelper(params.value),
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
    // {
    //   field: "stack",
    //   headerName: "Stack",
    //   flex: 0.35,
    // },
    // {
    //   field: "needsUpdate",
    //   headerName: "",
    //   flex: 0.15,
    //   headerAlign: "center",
    //   renderCell: (params) => (true ? <NewReleases /> : <></>),
    // },
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
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Applications" subtitle="All Applications" />
      <Box
        mt="40px"
        height="75vh"
        // sx={{
        //   "& .MuiDataGrid-root": {
        //     border: "none",
        //   },
        //   "& .MuiDataGrid-cell": {
        //     borderBottom: "none",
        //   },
        //   "& .MuiDataGrid-columnHeaders": {
        //     backgroundColor: theme.palette.background.alt,
        //     color: theme.palette.secondary[100],
        //     borderBottom: "none",
        //   },
        //   "& .MuiDataGrid-virtualScroller": {
        //     backgroundColor: theme.palette.primary.light,
        //   },
        //   "& .MuiDataGrid-footerContainer": {
        //     backgroundColor: theme.palette.background.alt,
        //     color: theme.palette.secondary[100],
        //     borderTop: "none",
        //   },
        //   "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
        //     color: `${theme.palette.secondary[200]} !important`,
        //   },
        // }}
      >
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

function ChipComponent({ color, message, icon }) {
  return (
    <Chip
      icon={icon}
      size="medium"
      variant="outlined"
      label={message}
      color={`${color}`}
      sx={{ fontSize: "18px", width: "150px" }}
    />
  );
}

export default Applications;
