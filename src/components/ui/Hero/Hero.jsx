import { Stack, Typography } from "@mui/material";
import { useGetTitleUpdatesQuery } from "../../../api/api";
import BearCarousel, { BearSlideCard } from "bear-react-carousel";
import { Link } from "react-router-dom";

function Hero() {
  const { data, error, isLoading } = useGetTitleUpdatesQuery();
  if (error) return <div>Ошибка</div>;
  if (isLoading) return <div>Загрузка...</div>;

  const dataCarousel = data.list.map((row) => {
    return (
      <Stack sx={{textDecoration: 'none', color: 'var(--color)'}} height={'350px'} component={Link} to={`/title/${row.id}`}>
        <Stack
          component={BearSlideCard}
          borderRadius={"10px"}
          key={row.id}
          sx={{
            borderRadius: "10px",
            backgroundRepeat: "no-repeat",
            backgroundPositionX: "right",
            backgroundSize: "100%",
            backgroundPositionY: "70%",
            backgroundImage: `linear-gradient(106deg, rgba(36,36,36,100) 10%, rgba(26,26,26,0.70640756302521) 50%,rgba(0,0,0,0) 100%), url(https://anilibria.top${row.posters.medium.url})`,
          }}
        >
          <Stack
            mb={5}
            overflow={"hidden"}
            marginLeft={5}
            alignItems={"start"}
            display={"flex"}
            flexDirection={"column"}
            height={"100%"}
            justifyContent={"center"}
          >
            <Typography mb={1} variant="h4" fontWeight={"bold"}>
              {row.names.ru}
            </Typography>
            <Typography variant="h5" mb={1} color={"gray"}>
              {row.type.full_string}
            </Typography>
            <Typography width={"40%"} height={"15px"} color={"gray"}>
              {row.description}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    );
  });

  return (
    <>
      <BearCarousel
        height="450px"
        data={dataCarousel}
        mb={4}
        isEnableMouseMove
      />
    </>
  );
}

export default Hero;
