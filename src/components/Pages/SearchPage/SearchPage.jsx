import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Pagination } from "@mui/material";
import Loading2 from "../../Common/Loading/Loading2";
import Search from "../../Search/Search";
import TitleList from "../../Test/TitleList";
import { filterApi } from "../../../api/api";

function SearchPage() {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [pagesCount, setPagesCount] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const [isInputNull, setIsInputNull] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams();
  const [mainData, setMainData] = useState(false);

  const itemsPerPage = 6
  const locate = useLocation()

  useEffect(() => {
    setMainData(false)
    const fetchData = async () => {
        setIsFetching(false)
        const result = await axios(
            `https://api.anilibria.tv/v3/title/search${locate.search}&items_per_page=${itemsPerPage}`
        )
        setData(result.data)
        setPagesCount(result.data.pagination.pages);
        setIsLoading(false)
        setIsFetching(true)
        setCurrentPage(result.data.pagination.current_page)
        
    }
    if (locate.search.length > 0) {
        fetchData()
    }
}, [locate.search])

useEffect(() => {
    filterApi.getTitleUpdates(setIsFetching, setData, setPagesCount, setIsLoading, setCurrentPage)
}, [])

  const navigate = useNavigate();

  const handleClickTitle = (id) => {
    setMainData(false)
    const fetchData = async () => {
      navigate(`/anime-search/title/?id=${id}`);
    };
    fetchData();
  };

  const clickPage = (e, p) => {
    setIsLoading(true)
    
    if (!mainData) {
        const fetchData = async () => {
            setIsFetching(false);
            const result = await axios(
              `https://api.anilibria.tv/v3/title/search${locate.search}&page=${p}&items_per_page=${itemsPerPage}`
            );
            setData(result.data);
            setIsLoading(false)
            setIsFetching(true);
            setCurrentPage(result.data.pagination.current_page);
          };
          fetchData();
    } else {
        const fetchData = async () => {
            setIsFetching(false);
            const result = await axios(
              `https://api.anilibria.tv/v3/title/updates?page=${p}&items_per_page=${itemsPerPage}`
            );
            setData(result.data);
            setIsLoading(false)
            setIsFetching(true);
            setCurrentPage(result.data.pagination.current_page);
          };
          fetchData();
    }
  };

  const handleSearch = (inputValue, genres, year) => {
    setMainData(false)
    let genresParams = ''
    let inputSearchParams = ''
    let yearParams = ''
    if (genres.length > 0) {genresParams = `genres=${genres}`}
    if (inputValue.length > 0) {inputSearchParams = `search=${inputValue}`}
    if (year > 0) {yearParams = `year=${year}`}
    setIsLoading(true)
    setSearchParams(`${inputSearchParams}&${genresParams}&${yearParams}`)
}
const openSearch = () => {
    setIsSearchActive(!isSearchActive)
}
  
  return (
    <div className="flex flex-col gap-y-8 py-3 h-full justify-between items-center min-h-screen">
        <button onClick={openSearch}>Открыть</button>
      {isSearchActive && <Search handleSearch={handleSearch} setIsFetching={setIsFetching} 
         isInputNull={isInputNull} setIsInputNull={setIsInputNull} />}
      {isFetching && <TitleList data={data} isFetching={isFetching} handleClickTitle={handleClickTitle} />}
      {isLoading && <Loading2 itemsPerPage={itemsPerPage} />}
      <Pagination
        size="small"
        count={Number(pagesCount)}
        page={Number(currentPage)}
        onChange={clickPage}
        className="flex justify-center"
      />
    </div>
  );
}

export default SearchPage;
