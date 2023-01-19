import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { Dataset, PersonAdd, Assessment, Update } from "@mui/icons-material";
import { Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetApplicationsQuery, useGetDashboardQuery } from "state/api";
import StatBox from "components/StatBox";
import BreakdownChart from "components/BreakdownChart";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { formatJobType, salaryFormatter, statusHelper } from "scenes/applications";

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
    flex: 0.25,
    renderCell: (params) => salaryFormatter(params.value),
  },
  // {
  //   field: "createdAt",
  //   headerName: "Applied On",
  //   flex: 0.35,
  //   renderCell: (params) => formatDate(params.value),
  // },
  // {
  //   field: "updatedAt",
  //   headerName: "Last Updated",
  //   flex: 0.35,
  //   renderCell: (params) => formatDate(params.value),
  // },
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
    flex: 0.18,
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

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetApplicationsQuery();

  // Backend not ready for this // ! Use temp consts instead
  // const [data, isLoading] = useGetDashboardQuery();

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle={`Welcome to your dashboard, ${"Kody"}.`} />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}>
            <AddCircleOutlineIcon sx={{ mr: "10px" }} />
            New Application
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}>
        {/* ROW 1 */}
        <StatBox
          title="Attention Needed"
          value={3}
          description="Upcoming"
          icon={<Update sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />
        <StatBox
          title="Total Applications"
          value={65}
          description="All Time"
          icon={<Dataset sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem">
          {/* <NotificationCenter /> */}
        </Box>
        <StatBox
          title="Interview(s)"
          value={1}
          description="Upcoming"
          icon={<PersonAdd sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />
        <StatBox
          title="Assessment(s)"
          value={3}
          description="Upcoming"
          icon={<Assessment sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}>
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={data || []}
            columns={columns}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem">
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            {`Placeholder Title`}
          </Typography>
          <BreakdownChart isDashboard={true} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
