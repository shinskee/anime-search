import { useParams } from "react-router-dom";
import { useGetAnimeTitleQuery } from "../../../api/api";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  FormControl,
  InputLabel,
  List,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import SkeletonAnimeTitle from "../../ui/SkeletonAnime/SkeletonAnimeTitle";

function AnimeTitle() {
  const id = useParams();
  const { data, error, isLoading } = useGetAnimeTitleQuery(id.id);
  const [videoUrl, setVideoUrl] = useState("");
  const [quality, setQuality] = useState("");
  const [episode, setEpisode] = useState("");
  const [qualityData, setQualityData] = useState("");

  useEffect(() => {
    if (quality === "480p") {
      setVideoUrl(qualityData.sd);
    } else if (quality === "720p") {
      setVideoUrl(qualityData.hd);
    } else if (quality === "1080p") {
      setVideoUrl(qualityData.fhd);
    } else {
      setVideoUrl(qualityData.hd);
    }
  }, [quality, episode]);

  const changeEpisodes = (e) => {
    setEpisode(e.target.value);
  };
  const clickEpisode = (e) => {
    setQualityData(e);
    if (quality === "480p") {
      setVideoUrl(qualityData.sd);
    } else if (quality === "720p") {
      setVideoUrl(qualityData.hd);
    } else if (quality === "1080p") {
      setVideoUrl(qualityData.fhd);
    }
  };
  const changeQualitys = (e) => {
    setQuality(e.target.value);
  };

  if (error) return <div>Ошибка</div>;
  if (isLoading) return <SkeletonAnimeTitle />
  return (
    <Stack>
      <Stack flexDirection={"row"} columnGap={"10px"} mb={4}>
        <img
          style={{ borderRadius: "10px" }}
          src={`https://anilibria.top${data.posters.small.url}`}
          alt="poster"
          height={"220px"}
        />
        <Stack>
          <Typography sx={{ fontSize: { xs: "16px", sm: "18px" } }}>
            {data.names.ru}
          </Typography>
          <Typography
            color={"gray"}
            sx={{ fontSize: { xs: "12px", sm: "14px" } }}
          >
            {data.names.en}
          </Typography>
          <Typography
            color={"gray"}
            sx={{ fontSize: { xs: "12px", sm: "14px" } }}
          >
            Тип: {data.type.string}
          </Typography>
          <Typography
            color={"gray"}
            sx={{ fontSize: { xs: "12px", sm: "14px" } }}
          >
            Жанр: {data.genres.join(", ")}
          </Typography>
          <Typography
            color={"gray"}
            sx={{ fontSize: { xs: "12px", sm: "14px" } }}
          >
            Статус: {data.status.string}
          </Typography>
          <Typography
            color={"gray"}
            sx={{ fontSize: { xs: "12px", sm: "14px" } }}
          >
            Серий: {data.player.episodes.string}
          </Typography>
        </Stack>
      </Stack>
      <Box
        mb={4}
        width={"100%"}
        display={"flex"}
        flexDirection={{ xs: "column", sm: "row" }}
        rowGap={"10px"}
        columnGap={"10px"}
        alignItems={{ xs: "start", sm: "center" }}
      >
        <FormControl>
          <InputLabel sx={{ m: "-10px", fontSize: { xs: "12px", sm: "14px" } }}>
            Серия
          </InputLabel>
          <Select
            size="small"
            sx={{ width: "200px", height: "30px" }}
            label="Серия"
            value={episode}
            onChange={changeEpisodes}
          >
            {Object.values(data.player.list).map((i, index) => (
              <MenuItem
                key={index}
                value={i.episode}
                onClick={() => clickEpisode(i.hls)}
              >
                {i.episode}. {i.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel sx={{ m: "-10px", fontSize: { xs: "12px", sm: "14px" } }}>
            Качество
          </InputLabel>
          <Select
            size="small"
            sx={{ minWidth: "200px", height: "30px" }}
            width="50%"
            label="Качество"
            value={quality}
            onChange={changeQualitys}
          >
            <MenuItem value="480p">480p</MenuItem>
            <MenuItem value="720p">720p</MenuItem>
            <MenuItem value="1080p">1080p</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <ReactPlayer
        url={`https://cache.libria.fun/${videoUrl}`}
        controls
        width={"100%"}
        height={"100%"}
      />
      <List>
        Связанные:
        {data.franchises[0].releases.map((i) => (
          <ListItemText key={i.id}>
            <Typography onClick={() => {window.scrollTo(0, 0)}} component={RouterLink} to={`/title/${i.id}`}
                color={'gray'} 
                sx={{ fontSize: { xs: "14px", sm: "16px" } }}>
              {i.names.ru}
            </Typography>
          </ListItemText>
        ))}
      </List>
    </Stack>
  );
}

export default AnimeTitle;
