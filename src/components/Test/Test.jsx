import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../Common/Loading/Loading";
import {
  Navigate,
  redirect,
  redirectDocument,
  replace,
  useNavigate,
} from "react-router-dom";
import { Pagination } from "@mui/material";
import Loading2 from "../Common/Loading/Loading2";

function Test() {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [pagesCount, setPagesCount] = useState("");
  const [currentPage, setCurrentPage] = useState("");
    const itemsPerPage = 6
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

//   const onPageChanged = (pageNumber) => {
//     // getTitle(pageNumber, setData, setIsFetching, setCurrentPage)
//     const fetchData = async () => {
//       setIsFetching(false);
//       const result = await axios(
//         `https://api.anilibria.tv/v3/title/updates?page=${pageNumber}&items_per_page=6`
//       );
//       setData(result.data);
//       setIsFetching(true);
//       setCurrentPage(result.data.pagination.current_page);
//     };
//     fetchData();
//   };

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
        `https://api.anilibria.tv/v3/title/updates?page=${p}&items_per_page=${itemsPerPage}`
      );
      setData(result.data);
      setIsFetching(true);
      setCurrentPage(result.data.pagination.current_page);
    };
    fetchData();
  };
  return (
    <div className="flex flex-col gap-y-8 py-3 h-full justify-between items-center">
      <h1 className="text-5xl text-center row-span-1">Привет</h1>
      {isFetching ? (
        <div className="gap-x-3 gap-y-3 flex flex-wrap mx-auto justify-center max-sm:flex-col items-start">
          {data.list.map((i) => (
            <div key={i.id} className="max-sm:w-full">
                <div className="hover relative max-sm:flex max-sm:gap-x-2 max-sm:bg-gray-200 max-sm:min-w-full max-sm:rounded">
                    <img
                        onClick={(e) => handleClickTitle(i.id)}
                        src={`https://anilibria.top${i.posters.small.url}`}
                        className="rounded max-sm:h-40 h-60 select-none cursor-pointer max-sm:w-28 w-44 hover:-translate-y-1 transition-all"
                    />
                    <p className="text-sm max-sm:block hidden dark:text-gray-800">{i.names.ru}</p>
                    <p className="max-sm:hidden dark:text-gray-800 absolute bottom-0 w-full bg-gray-50 bg-opacity-70 filter backdrop-blur-sm p-2 opacity-0 transition-all pointer-events-none translate-y-2">{i.names.ru}</p>
                </div>
            </div>
          ))}
        </div>
      ) : (
        // <Loading
        //   style={"flex justify-center items-center"}
        //   styleImg={"w-40 h-40"}
        // />
        <Loading2 isFetching={isFetching} itemsPerPage={itemsPerPage} />
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
