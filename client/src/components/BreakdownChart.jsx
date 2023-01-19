import React from "react";
// import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useTheme } from "@mui/material";
// import { useGetSalesQuery } from "state/api";

const BreakdownChart = ({ isDashboard = false }) => {
  //   const { data, isLoading } = useGetSalesQuery();
  const theme = useTheme();

  //   if (!data || isLoading) return "Loading...";

  //   const formattedData = Object.entries(data.salesByCategory).map(
  //     ([category, sales], i) => ({
  //       id: category,
  //       label: category,
  //       value: sales,
  //       color: colors[i],
  //     })
  //   );

  return (
    <Box
      height={isDashboard ? "400px" : "100%"}
      width={undefined}
      minHeight={isDashboard ? "325px" : undefined}
      minWidth={isDashboard ? "325px" : undefined}
      position="relative">
      Secondary Title
      <Box
        position="absolute"
        top="50%"
        left="50%"
        color={theme.palette.secondary[400]}
        textAlign="center"
        pointerEvents="none"
        sx={{
          transform: isDashboard ? "translate(-75%, -170%)" : "translate(-50%, -100%)",
        }}>
        <Typography variant="h6">{`Placeholder Text`}</Typography>
      </Box>
    </Box>
  );
};

export default BreakdownChart;
