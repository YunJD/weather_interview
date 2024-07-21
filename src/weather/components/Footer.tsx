import { Box, Typography } from "@mui/material";

export const Footer = () => (
  <Box sx={{ background: "#eee", pt: 3, pb: 2, marginTop: "auto" }}>
    <Box sx={{ mx: "auto", width: 1280, px: 2 }}>
      <Typography>Weather App</Typography>
      <Typography color="grey" variant="body2">
        By Jin Ding
      </Typography>
    </Box>
  </Box>
);
