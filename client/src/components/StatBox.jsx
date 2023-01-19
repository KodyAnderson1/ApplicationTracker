import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";

const StatBox = ({ title, value, increase, icon, description }) => {
  const theme = useTheme();
  return (
    <Box
      gridColumn="span 2"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1rem"
      flex="1 1 100%"
      backgroundColor={theme.palette.background.alt}
      borderRadius="0.55rem">
      <FlexBetween>
        <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
          {title}
        </Typography>
        {icon}
      </FlexBetween>
      <Box position="relative">
        <Typography
          variant="h3"
          fontWeight="600"
          sx={{
            color: theme.palette.secondary[200],
            fontSize: "4rem",
          }}>
          {value}
        </Typography>
        <FlexBetween gap="1rem">
          <Typography
            sx={{
              fontStyle: "italic",
              fontSize: ".7rem",
              position: "absolute",
              bottom: 0,
              right: 0,
            }}>
            {description}
          </Typography>
        </FlexBetween>
      </Box>
    </Box>
  );
};

export default StatBox;
