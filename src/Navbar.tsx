import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
// import { Outlet } from "react-router";

export function Navbar() {
  return (
    <>
      <h2>Navbar</h2>
      <div>
        <Button>
          <AddCircleOutlineIcon sx={{ marginRight: 1 }} /> New Application
        </Button>
      </div>
      <div>
        <Button>
          <AllInclusiveIcon sx={{ marginRight: 1 }} /> All Applications
        </Button>
      </div>
      <div>
        <Button>
          <AccessAlarmIcon sx={{ marginRight: 1 }} /> Expired Applications
        </Button>
      </div>

      <div>
        <Button>
          <DashboardIcon sx={{ marginRight: 1 }} /> Dashboard
        </Button>
      </div>
    </>
  );
}
