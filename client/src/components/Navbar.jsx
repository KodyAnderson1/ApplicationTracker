import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDOwnOutlined,
  ArrowDropDownOutlined,
  GitHub,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useSendLogoutMutation } from "state/auth/authAPISlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen, user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [sendLogout, { isSuccess }] = useSendLogoutMutation();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    sendLogout();
    setAnchorEl(null);
  };

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  return (
    <AppBar sx={{ position: "static", background: "none", boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem">
            {/* <InputBase disabled placeholder="Search... " /> */}
            <InputBase disabled placeholder="Disabled " />
            <IconButton disabled>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton
            onClick={() => window.open(`https://github.com/KodyAnderson1/ApplicationTracker`)}>
            <GitHub sx={{ fontSize: "25px" }} />
          </IconButton>

          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}>
              {/* <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              /> */}
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}>
                  {user.firstName}
                </Typography>
                <Typography fontSize="0.75rem" sx={{ color: theme.palette.secondary[200] }}>
                  {`Developer`}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
