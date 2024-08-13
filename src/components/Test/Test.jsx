import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../Common/Loading/Loading";
import {
  Navigate,
  NavLink,
  redirect,
  redirectDocument,
  replace,
  useNavigate,
} from "react-router-dom";
import { Pagination } from "@mui/material";
import Loading2 from "../Common/Loading/Loading2";
import TitleList from "./TitleList";
import Search from "../Search/Search";
import { getSearchTitle } from "../../api/api";

function Test() {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [pagesCount, setPagesCount] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const [isInputNull, setIsInputNull] = useState(false);
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
      navigate(`/anime-search/title/?id=${result.data.id}`);
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

  const onGenresClicked = (genres) => {
    const fetchData = async () => {
        setIsFetching(false)
        const result = await axios (
            `https://api.anilibria.tv/v3/title/search?genres=${genres}`
        )
        setData(result.data);
        setPagesCount(result.data.pagination.pages);
        setIsFetching(true)
    }
    fetchData()
}

  const handleSearch = (inputValue) => {
    if (inputValue.length > 0) {
      const fetchData = async () => {
        setIsInputNull(false)
        setIsFetching(false)
        const result = await axios(
            `https://api.anilibria.tv/v3/title/search?search=${inputValue}`
        )
        setData(result.data)
        setPagesCount(result.data.pagination.pages);
        setIsFetching(true)
        navigate(`/anime-search/search?search=${inputValue}`);
      };
      fetchData();
    } else {
      setIsInputNull(true)
    }
  }
  
  return (
    <div className="flex flex-col gap-y-8 py-3 h-full justify-between items-center min-h-screen">
      <h1 className="text-5xl text-center row-span-1">Привет</h1>
      <Search onGenresClicked={onGenresClicked} setIsFetching={setIsFetching} 
        handleSearch={handleSearch} isInputNull={isInputNull} setIsInputNull={setIsInputNull} />
      {isFetching ? <TitleList data={data} isFetching={isFetching} handleClickTitle={handleClickTitle} />
        : <Loading2 itemsPerPage={itemsPerPage} />}
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
