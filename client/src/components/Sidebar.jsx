import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  Groups2Outlined,
  PublicOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import TableChartIcon from "@mui/icons-material/TableChart";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import profileImage from "assets/headshot.jpg";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Add_New",
    icon: <AddCircleOutlineIcon />,
    isDisabled: false,
  },
  {
    text: "Applications",
    icon: <TableChartIcon />,
    isDisabled: false,
  },
  {
    text: "Notifications",
    icon: <NotificationsNoneIcon />,
    isDisabled: true,
  },

  {
    text: "Administrator",
    icon: null,
  },
  {
    text: "User Privileges",
    icon: <AdminPanelSettingsOutlined />,
    isDisabled: true,
  },
  {
    text: "Admin Settings",
    icon: <PublicOutlined />,
    isDisabled: true,
  },
  {
    text: "Notification Settings",
    icon: <CalendarMonthOutlined />,
    isDisabled: true,
  },
];

const Sidebar = ({ drawerWidth, isSidebarOpen, setIsSidebarOpen, isNonMobile, user }) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");

  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}>
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    Job Tracker
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon, isDisabled }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();
                const txt = text.search("_") ? text.replace("_", " ") : text;
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      disabled={isDisabled}
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText ? theme.palette.secondary[300] : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}>
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}>
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={txt} />
                      {active === lcText && <ChevronRightOutlined sx={{ ml: "auto" }} />}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box position="absolute" bottom="2rem">
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.2rem 1.7rem -1rem 3rem">
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}>
                  {user.firstName}
                </Typography>
                <Typography fontSize="0.8rem" sx={{ color: theme.palette.secondary[200] }}>
                  {`Developer`}
                </Typography>
              </Box>
              <Groups2Outlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px", marginLeft: "1rem" }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
