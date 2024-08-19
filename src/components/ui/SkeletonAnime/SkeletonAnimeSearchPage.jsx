import { Skeleton, Stack } from "@mui/material";

function SkeletonAnimeSearchPage() {
  return (
    <Stack height={'100%'} display={'flex'} flexDirection={'column'} columnGap={'20px'} justifyContent={'space-between'}>
      <Stack mb={2} display={'flex'} flexDirection={'row'} flexWrap={'wrap'} justifyContent={'center'} columnGap={'20px'} rowGap={'20px'}>
        {Array(20).fill(0).map((_, index) => (
          <Skeleton variant="rounded" width={'167px'} height={'238px'} key={index}/>
        ))}
      </Stack>
    </Stack>
  );
}

export default SkeletonAnimeSearchPage;
