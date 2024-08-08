import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../Common/Loading/Loading";
import Paginator from "../Common/Loading/Paginator/Paginator";
import { Navigate, redirect, redirectDocument, replace, useNavigate } from "react-router-dom";

function Test() {
    const [data, setData] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [pagesCount, setPagesCount] = useState('')
    const [currentPage, setCurrentPage] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `https://api.anilibria.tv/v3/title/updates`
            )
            setData(result.data)
            setIsFetching(true)
            setPagesCount(result.data.pagination.pages)
            setCurrentPage(result.data.pagination.current_page)
        }
        fetchData()
    }, [])

    const onPageChanged = (pageNumber) => {
        // getTitle(pageNumber, setData, setIsFetching, setCurrentPage)
        const fetchData = async () => {
            setIsFetching(false)
            const result = await axios(
                `https://api.anilibria.tv/v3/title/updates?page=${pageNumber}`
            )
            setData(result.data)
            setIsFetching(true)
            setCurrentPage(result.data.pagination.current_page)
        }
        fetchData()
    }

    const navigate = useNavigate();

    const handleClickTitle = (id) => {
        const fetchData = async () => {
            const result = await axios(
                `https://api.anilibria.tv/v3/title?id=${id}`
            )
            console.log(result.data.id)
            navigate(`/title?id=${result.data.id}`)
        }
        fetchData()
    }


    return (
        <div className="grid auto-rows-auto">
            <h1 className='text-5xl mb-10 text-center row-span-1'>Привет</h1>
            <div className="grid grid-rows-2">
                {isFetching ? <div className="gap-x-3 gap-y-3 grid-cols-5 grid mx-auto h-60">
                    {data.list.map((i) => (
                        <div key={i.id} className="">
                            <img onClick={(e) => handleClickTitle(i.id)} src={`https://anilibria.top${i.posters.small.url}`} className="h-60 select-none cursor-pointer" />
                        </div>
                    ))}</div>
                : <Loading style={'flex justify-center h-60'} />}
                <Paginator currentPage={currentPage}
                    onPageChanged={onPageChanged} pagesCount={pagesCount} />
            </div>
            {/* <button onClick={nextPageFetch}>next</button> */}
        </div>
    )
}

export default Test;