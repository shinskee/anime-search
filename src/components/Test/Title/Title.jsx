import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../Common/Loading/Loading";
import { Navigate, NavLink, useNavigate } from "react-router-dom";

function Title() {
    const [data, setData] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        let id = new URLSearchParams(window.location.search)
        const fetchData = async () => {
            const result = await axios(
                `https://api.anilibria.tv/v3/title?${id}`
            )
            console.log(result.data.id)
            setData(result.data)
            setIsFetching(true)
        }
        fetchData()
    }, [])

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
        </div>
     );
}

export default Title;