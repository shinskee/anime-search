import { useLocation, useMatches, useParams } from "react-router-dom";
import { useGetAnimeTitleQuery } from "../../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { changeQuality, changeEpisode } from "../../../features/currentQuerySlice";

function AnimeTitle() {
    const matches = useMatches();
    const id = useParams()
    console.log(id);
    
    const { data, error, isLoading } = useGetAnimeTitleQuery(id.id)
    const [ videoUrl, setVideoUrl ] = useState('')
    const [ quality, setQuality ] = useState('')
    const [ episode, setEpisode ] = useState('')
    const [ qualityData, setQualityData ] = useState('')
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (quality === '480p') {
            setVideoUrl(qualityData.sd)
        } else if (quality === '720p') {
            setVideoUrl(qualityData.hd)
        } else if (quality === '1080p') {
            setVideoUrl(qualityData.fhd)
        } else {
            setVideoUrl(qualityData.hd)
        }
    },[quality, episode])
    

    const changeEpisodes = (e) => {
        setEpisode(e.target.value)
    }
    const clickEpisode = (e) => {
        setQualityData(e)
        if (quality === '480p') {
            setVideoUrl(qualityData.sd)
        } else if (quality === '720p') {
            setVideoUrl(qualityData.hd)
        } else if (quality === '1080p') {
            setVideoUrl(qualityData.fhd)
        }
    }
    const changeQualitys = (e) => {
        setQuality(e.target.value)
    }

    if (error) return <div>Ошибка</div>
    if (isLoading) return <div>Загрузка...</div>
    return ( 
        <Stack> 
            <Typography variant="h4">{data.names.ru}</Typography>
            <FormControl>
                <InputLabel>Серия</InputLabel>
                <Select 
                    label="Серия"
                    value={episode}
                    onChange={changeEpisodes}
                    >
                    {Object.values(data.player.list).map((i, index) => (
                        <MenuItem key={index} value={i.episode} onClick={() => clickEpisode(i.hls)}>{i.episode}. {i.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel>Качество</InputLabel>
                <Select 
                    label="Качество"
                    value={quality}
                    onChange={changeQualitys}
                    >
                    <MenuItem value='480p'>480p</MenuItem>
                    <MenuItem value='720p'>720p</MenuItem>
                    <MenuItem value='1080p'>1080p</MenuItem>
                </Select>
            </FormControl>
            <ReactPlayer url={`https://cache.libria.fun/${videoUrl}`} controls width={'100%'} height={'100%'} />
        </Stack>
     );
}

export default AnimeTitle;