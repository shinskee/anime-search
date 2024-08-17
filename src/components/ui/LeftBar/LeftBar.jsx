import { Link, List, ListItemText, Stack, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useGetGenresQuery, useGetSearchQuery } from "../../../api/api";
import styles from './LeftBar.module.css'
import { useDispatch, useSelector } from "react-redux";
import { resetQuery, searchAnime } from "../../../features/currentQuerySlice";

function LeftBar() {
    const { data, error, isLoading } = useGetGenresQuery()
    // const {genres, year} = useSelector(state => state.currentQuery)
    const genre = useSelector(state => state.currentQuery.genres)    

    const navigate = useNavigate()
    
    const dispatch = useDispatch()
    if (error ) return <div>Ошибка</div>
    if (isLoading ) return <div>Загрузка...</div>
    const clickGenre = (i) => {
        dispatch(searchAnime({genres: i}))
        navigate('/searcher')
    }
    return ( 
        <Stack sx={{borderRight: '4px solid #454545', height: '100%'}}>
            <Link onClick={() => dispatch(resetQuery())} margin={'0 auto'} sx={{textDecoration: 'none', color: 'white'}} component={RouterLink} to={'/'}>
                <Typography margin={'10px 0'} variant="h6">Anime Search</Typography>
            </Link>
            <List sx={{display: 'flex', flexDirection: 'column'}}>
            {data.map((i, index) => (
                <ListItemText sx={{m: 0, pt: .8, pb: .8}} className={genre === i ? styles.active : styles.genres } key={index} 
                    onClick={() => clickGenre(i)}
                    >
                    {i}
                </ListItemText>
            ))}
            </List>
        </Stack>
     );
}

export default LeftBar;