import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../Common/Loading/Loading";
import Paginator from "../Common/Loading/Paginator/Paginator";
import {
  Navigate,
  redirect,
  redirectDocument,
  replace,
  useNavigate,
} from "react-router-dom";
import { Pagination } from "@mui/material";

function Test() {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [pagesCount, setPagesCount] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const [hoverId, setHoverId] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://api.anilibria.tv/v3/title/updates?items_per_page=6`
      );
      setData(result.data);
      setIsFetching(true);
      setPagesCount(result.data.pagination.pages);
      setCurrentPage(result.data.pagination.current_page);
    };
    fetchData();
  }, []);

  const onPageChanged = (pageNumber) => {
    // getTitle(pageNumber, setData, setIsFetching, setCurrentPage)
    const fetchData = async () => {
      setIsFetching(false);
      const result = await axios(
        `https://api.anilibria.tv/v3/title/updates?page=${pageNumber}&items_per_page=6`
      );
      setData(result.data);
      setIsFetching(true);
      setCurrentPage(result.data.pagination.current_page);
    };
    fetchData();
  };

  const navigate = useNavigate();

  const handleClickTitle = (id) => {
    const fetchData = async () => {
      const result = await axios(`https://api.anilibria.tv/v3/title?id=${id}`);
      console.log(result.data.id);
      navigate(`/title?id=${result.data.id}`);
    };
    fetchData();
  };
  const handleclick = (e, p) => {
    const fetchData = async () => {
      setIsFetching(false);
      const result = await axios(
        `https://api.anilibria.tv/v3/title/updates?page=${p}&items_per_page=6`
      );
      setData(result.data);
      setIsFetching(true);
      setCurrentPage(result.data.pagination.current_page);
    };
    fetchData();
  };

  return (
    <div className="flex flex-col gap-y-8 h-full py-3 justify-between">
      <h1 className="text-5xl text-center row-span-1">Привет</h1>
      {isFetching ? (
        <div className="gap-x-3 gap-y-3 flex flex-wrap mx-auto">
          {data.list.map((i) => (
            <div key={i.id}>
                <div className="hover relative">
                    <img
                        onClick={(e) => handleClickTitle(i.id)}
                        src={`https://anilibria.top${i.posters.small.url}`}
                        className="rounded h-60 select-none cursor-pointer w-44 hover:-translate-y-1 transition-all"
                    />
                    <p className="dark:text-gray-800 absolute bottom-0 w-full bg-gray-50 bg-opacity-70 filter backdrop-blur-sm p-2 opacity-0 transition-all pointer-events-none translate-y-2">{i.names.ru}</p>
                </div>
            </div>
          ))}
        </div>
      ) : (
        <Loading
          style={"flex justify-center items-center"}
          styleImg={"w-40 h-40"}
        />
      )}
      {/* <Paginator currentPage={currentPage}
                    onPageChanged={onPageChanged} pagesCount={pagesCount} /> */}
      <Pagination
        count={Number(pagesCount)}
        page={Number(currentPage)}
        onChange={handleclick}
        className="flex justify-center"
      />
    </div>
  );
}

export default Test;
