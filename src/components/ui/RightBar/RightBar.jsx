import { Container, Link, Stack, Typography } from "@mui/material";
import { useGetPopularTitleQuery } from "../../../api/api";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Card from "../Card/Card";

function RightBar() {
  const { data, error, isLoading } = useGetPopularTitleQuery({
    page: 1,
    itemPage: 5,
  });
  const navigate = useNavigate();
  const popularClick = () => {
    navigate("/popular");
  };
  if (error) return <div>Ошибка</div>;
  if (isLoading) return <div>Загрузка...</div>;
  return (
    <Container sx={{ borderLeft: "4px solid #454545", height: "100%" }}>
      <Stack alignItems={'center'} rowGap={'10px'}>
        <Typography
          sx={{ cursor: "pointer" }}
          onClick={popularClick}
          variant="h6"
          mt={2}
        >
          Популярные:
        </Typography>
        {data.list.map((i, index) => (
          // <Stack key={index} to={`/title/${i.id}`} sx={{textDecoration: 'none', color: 'var(--color)', fontSize: '14px'}} component={RouterLink} mt={2}>
          //     <img style={{borderRadius: '10px'}} src={`https://anilibria.top${i.posters.small.url}`} alt={i.names.en} width={'80%'} />
          //     {i.names.ru}
          // </Stack>
          <Card key={index} i={i} width={"115px"} height={"164px"} />
        ))}
      </Stack>
    </Container>
  );
}

export default RightBar;
