import { Skeleton, Stack } from "@mui/material";

function SkeletonAnimeMainPage() {
  return (
    <Stack>
      <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
      <Stack mb={8} columnGap={'10px'} flexDirection={'row'}>
        <Skeleton variant="rounded" width={"50%"} height={"220px"} />
        <Skeleton variant="rounded" width={"50%"} height={"220px"} />
      </Stack>
      <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
      <Stack columnGap={'10px'} flexDirection={'row'}>
        <Skeleton variant="rounded" width={"50%"} height={"220px"} />
        <Skeleton variant="rounded" width={"50%"} height={"220px"} />
      </Stack>
    </Stack>
  );
}

export default SkeletonAnimeMainPage;
