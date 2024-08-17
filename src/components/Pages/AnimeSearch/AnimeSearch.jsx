import { useDispatch, useSelector } from "react-redux";
import { useGetPaginationPagesQuery, useGetSearchQuery } from "../../../api/api";
import { Pagination, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";
import { searchAnime } from "../../../features/currentQuerySlice";
import Card from "../../ui/Card/Card";


function AnimeSearch() {
    const {search, genres, year, itemPerPage, type} = useSelector(state => state.currentQuery)
    const [ page, setPage ] = useState(1)
    const { data, error, isLoading } = useGetSearchQuery({type, search, genres, year, itemPerPage, page})
    const paginationApi = useGetPaginationPagesQuery({type, search, genres, year, itemPerPage})
    const pageChange = (event, value) => {
        setPage(value);
      };
        if (error || paginationApi.error ) return <div>Ошибка</div>
        if (isLoading || paginationApi.isLoading ) return <div>Загрузка...</div>
        let pageCount = paginationApi.data.pagination.pages
        
    return ( 
        <Stack height={'100%'} display={'flex'} flexDirection={'column'} columnGap={'20px'} justifyContent={'space-between'}>
            <Stack mb={2} display={'flex'} flexDirection={'row'} flexWrap={'wrap'} columnGap={'20px'} rowGap={'20px'}> 
                {data.list.map(i => (
                    <Card key={i.id} i={i} width={'167px'} height={'238px'} />
                ))}
            </Stack>
            <Pagination count={Number(pageCount)} page={page} onChange={pageChange} />
        </Stack>
     );
}

export default AnimeSearch;