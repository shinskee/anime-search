import { Skeleton, Stack } from "@mui/material";

function SkeletonAnimeTitle() {
  return (
    <Stack>
      <Stack columnGap={'10px'} flexDirection={'row'}>
        <Skeleton variant="rounded" width={"50%"} height={"220px"} />
        <Skeleton variant="rounded" width={"50%"} height={"220px"} />
      </Stack>
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
    </Stack>
  );
}

export default SkeletonAnimeTitle;
