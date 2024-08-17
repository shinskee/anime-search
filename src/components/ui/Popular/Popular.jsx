import { Pagination, Paper, Stack, TabScrollButton, Typography } from "@mui/material";
import { useGetPopularTitleQuery } from "../../../api/api";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import styles from "./Popular.module.css";
import Card from "../Card/Card";


function Popular() {
    const [ page, setPage ] = useState(1)
    const { data, error, isLoading } = useGetPopularTitleQuery({page, itemPage: 20})
    const pageChange = (event, value) => {
        setPage(value);
      };
    const scrollTop = () => {
        window.scrollTo(0, 0);
    }
    if (error ) return <div>Ошибка</div>
    if (isLoading ) return <div>Загрузка...</div>
    return ( 
        <Stack height={'100%'} display={'flex'} flexDirection={'column'} columnGap={'20px'} justifyContent={'space-between'}>
            <Stack mb={2} display={'flex'} flexDirection={'row'} flexWrap={'wrap'} columnGap={'20px'}  rowGap={'20px'}> 
                {data.list.map(i => (
                    <Card key={i.id} i={i} width={'167px'} height={'238px'} />
                    
                ))}
            </Stack>
            <Pagination onClick={scrollTop} count={data.pagination.pages} page={page} onChange={pageChange} />
        </Stack>
     );
}

export default Popular;