import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../Common/Loading/Loading";
import { useLocation, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import FilterEpisode from "./FilterEpisode";

function Title() {
  const [data, setData] = useState([]);
  const [dataFranchises, setDataFranchises] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [valueEpisodes, setValueEpisodes] = useState("");
  const [valueUrl, setValueUrl] = useState("");
  const [valueQuality, setValueQuality] = useState("");
  const [qualityData, setQualityData] = useState("");
  const navigate = useNavigate();
  const locate = useLocation()
  useEffect(() => {
    let id = new URLSearchParams(window.location.search);
    const fetchData = async () => {
      const result = await axios(`https://api.anilibria.tv/v3/title?${id}`);
      setData(result.data);
      setIsFetching(true);
    };
    fetchData();
    // const fetchDataFranchises = async () => {
    //     const result = await axios(
    //       `https://api.anilibria.tv/v3/title/franchises${locate.search}`
    //     );
    //     setDataFranchises(result.data[0].releases)
    //     setIsFetching(true);
    //     debugger
    //   };
    // fetchDataFranchises();
  }, []);

  const handleChangeEpisodes = (e) => {
    setValueEpisodes(e.target.value);
  };
  useEffect(() => {
    if (valueQuality === "sd") {
      setValueUrl(qualityData.sd);
    } else if (valueQuality === "hd") {
      setValueUrl(qualityData.hd);
    } else if (valueQuality === "fhd") {
      setValueUrl(qualityData.fhd);
    }
  }, [valueQuality]);

  const onClickEpisode = (url) => {
    setQualityData(url);
    if (valueQuality === "sd") {
      setValueUrl(url.sd);
    } else if (valueQuality === "hd") {
      setValueUrl(url.hd);
    } else if (valueQuality === "fhd") {
      setValueUrl(url.fhd);
    } else {
      setValueUrl(url.hd);
    }
  };
  const handleChangeQuality = (e) => {
    setValueQuality(e.target.value);
  };
  const onClickTitle = (id) => {
    navigate(`/title/?id=${id}`)
  }
  return (
    <div className="flex flex-col gap-y-5">
      <a
        onClick={() => {
          navigate(-1);
        }}
      >
        Назад
      </a>
      {isFetching ? (
        <div>
          <img
            className="w-40"
            src={`https://anilibria.top${data.posters.small.url}`}
            alt=""
          />
          <h2 className="font-bold text-4xl">{data.names.ru}</h2>
          <p>Жанр: {data.genres.join(", ")}</p>
          <p>Описание: {data.description}</p>
        </div>
      ) : (
        <Loading />
      )}
      <FilterEpisode
        isFetching={isFetching}
        data={data}
        valueEpisodes={valueEpisodes}
        handleChangeEpisodes={handleChangeEpisodes}
        onClickEpisode={onClickEpisode}
        handleChangeQuality={handleChangeQuality}
        valueQuality={valueQuality}
      />
      <ReactPlayer
        width={"100%"}
        height={"100%"}
        url={`https://cache.libria.fun${valueUrl}`}
        controls
      />
      <div> <h2 className="text-xl font-bold">Связанные аниме:</h2>
        {isFetching &&
          dataFranchises.map((t) => (
              <h3 onClick={() => {onClickTitle(t.id)}} key={t.id} className="text-lg">{t.names.ru}</h3>
          ))}
      </div>
    </div>
  );
}

export default Title;
