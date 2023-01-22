import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { Dataset, PersonAdd, Assessment, Update, Search, Block } from "@mui/icons-material";
import { Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetDashboardQuery } from "state/api";
import StatBox from "components/StatBox";
import BreakdownChart from "components/BreakdownChart";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChipComponent from "components/ChipComponent";
import { formatJobType, salaryFormatter } from "utils";

// ! Put applications in a useContext?!
const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const userId = useSelector((state) => state.global.userId);
  const { data, isLoading } = useGetDashboardQuery(userId);
  const navigate = useNavigate();

  const columns = [
    {
      field: "status",
      headerName: "Status",
      flex: 0.35,
      renderCell: (params) => (
        <ChipComponent params={params.value} sx={{ fontSize: "15px", width: "140px" }} />
      ),
    },
    {
      field: "companyName",
      headerName: "Company Name",
      flex: 0.3,
    },
    {
      field: "positionTitle",
      headerName: "Position",
      flex: 0.45,
    },
    {
      field: "salary",
      headerName: "Salary",
      flex: 0.25,
      renderCell: (params) => salaryFormatter(params.value),
    },
    {
      field: "jobType",
      headerName: "Job Type",
      flex: 0.25,
      renderCell: (params) => formatJobType(params.value),
    },
    {
      field: "location",
      headerName: "Location",
      flex: 0.25,
    },
    {
      field: "url",
      headerName: "URL",
      flex: 0.2,
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
      flex: 0.19,
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
      <FlexBetween>
        <Header title="DASHBOARD" subtitle={`Welcome to your dashboard, ${"Kody"}.`} />
        <Box>
          <Button
            onClick={() => {
              navigate(`/add_new`);
            }}
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
          title="Total Applications"
          value={data?.total || 0}
          description="All Time"
          icon={<Dataset sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />
        <StatBox
          title="Interview(s)"
          value={data?.interview || 0}
          description="Upcoming"
          icon={<PersonAdd sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />
        <StatBox
          title="Under Review"
          value={data?.review || 0}
          // description="Keep Checking!"
          icon={<Search sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />

        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem">
          Notification Center
          {/* <NotificationCenter /> */}
        </Box>
        <StatBox
          title="Need Status Updates"
          value={data?.attention || 0} // !
          description="7+ Days Old"
          icon={<Update sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />

        <StatBox
          title="Assessment(s)"
          value={data?.assessment || 0}
          description="Upcoming"
          icon={<Assessment sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />
        <StatBox
          title="Rejected"
          value={data?.rejected || 0}
          description=""
          icon={<Block sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
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
            rows={data?.applications || []}
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
            Application Breakdown
          </Typography>
          <BreakdownChart
            isDashboard={true}
            data={{
              rejected: data?.rejected,
              interview: data?.interview,
              review: data?.review,
              assessment: data?.assessment,
              accepted: data?.accepted,
            }}
            total={data?.total || 0}
          />
          <Typography p="0 0.6rem" fontSize="0.8rem" sx={{ color: theme.palette.secondary[200] }}>
            Breakdown of the current status of all applications.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
