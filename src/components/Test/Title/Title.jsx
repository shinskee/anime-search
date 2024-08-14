import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../Common/Loading/Loading";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function Title() {
    const [data, setData] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [valueEpisodes, setValueEpisodes] = useState('')
    const [valueUrl, setValueUrl] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        let id = new URLSearchParams(window.location.search)
        const fetchData = async () => {
            const result = await axios(
                `https://api.anilibria.tv/v3/title?${id}`
            )
            console.log(result.data.id)
            setData(result.data)
            console.log(Object.values(result.data.player.list));
            
            setIsFetching(true)
        }
        fetchData()
    }, [])

    const handleChangeEpisodes = (e) => {
        setValueEpisodes(e.target.value) 
    }
    const onClickEpisode = (url) => {
        setValueUrl(url);
    }
    return ( 
        <div>
            <a onClick={() => {navigate(-1)}}>Назад</a>
            {isFetching 
                ? <div>
                    <img className="w-40" src={`https://anilibria.top${data.posters.small.url}`} alt="" />
                    <h2 className="font-bold text-4xl">{data.names.ru}</h2>
                    <p>Жанр: {data.genres.join(", ")}</p>
                    <p>Описание: {data.description}</p>
                </div>
                : <Loading />}
                <FormControl className="w-full">
                <InputLabel id="open-select-episodes">Серия</InputLabel>
                <Select
                    className="w-full"
                    labelId="open-select-episodes"
                    id="open-select-episodes"
                    value={valueEpisodes}
                    onChange={handleChangeEpisodes}
                    label="Episodes"
                >
                    {isFetching &&
                        Object.values(data.player.list).map((e, index) => (
                            <MenuItem value={e.episode} key={index} onClick={() => onClickEpisode(e.hls.hd)}>
                                {e.episode}
                            </MenuItem>
                    ))}
                </Select>
                </FormControl>
                <ReactPlayer width={'100%'} height={"100%"} url={`https://cache.libria.fun${valueUrl}`} controls />
        </div>
     );
}

export default Title;