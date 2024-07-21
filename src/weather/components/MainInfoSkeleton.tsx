import { Stack, Skeleton } from "@mui/material";
export const MainInfoSkeleton = () => (
  <Stack sx={{ gap: 2, width: "20rem" }}>
    <Skeleton variant="rectangular" sx={{ height: "2rem" }} />
    <Skeleton variant="rectangular" />
  </Stack>
);
