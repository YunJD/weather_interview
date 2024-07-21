import { Box, Typography, SxProps } from "@mui/material";
type MainInfoProps = {
  heading: string;
  subheading: string;
  sx?: SxProps;
};
export const MainInfo = ({ heading, subheading, sx }: MainInfoProps) => (
  <Box>
    <Typography variant="h4" sx={{ ...sx }}>
      {heading}
    </Typography>
    <Typography variant="h5">{subheading}</Typography>
  </Box>
);
