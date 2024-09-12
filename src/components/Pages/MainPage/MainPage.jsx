import { Box, Paper, Stack, Typography } from "@mui/material";
import { useGetPopularTitleQuery, useGetTitleUpdatesQuery } from "../../../api/api";
import BearCarousel, { BearSlideImage } from 'bear-react-carousel';
import { Link } from "react-router-dom";
import styles from './MainPage.module.css'
import SkeletonAnimeMainPage from "../../ui/SkeletonAnime/SkeletonAnimeMainPage";
import { useAuth } from "../../../features/useAuth";
import Washlist from "../../ui/Washlist/Washlist";

function MainPage() {
    const { user } = useAuth()
    const { data, error, isLoading } = useGetTitleUpdatesQuery()
    const popularData = useGetPopularTitleQuery({
        page: 1,
        itemPage: 20,
      })  

    if (error || popularData.error) return <div>Ошибка</div>
    if (isLoading || popularData.isLoading) return <SkeletonAnimeMainPage />
    const carouselData = data.list.map(row => {
        return <Stack >
            <Stack sx={{textDecoration: 'none', color: 'var(--color)'}} component={Link} to={`/title/${row.id}`}>
                <Paper elevation={3} component={BearSlideImage} className={styles.slide} imageUrl={`https://anilibria.top${row.posters.small.url}`} key={row.id}>
                </Paper>
            </Stack>
            <Typography variant="h7">{row.names.ru}</Typography>
        </Stack>
    });
    
    const carouselPopularData = popularData.data.list.map(row => {
        return <Stack sx={{textDecoration: 'none', color: 'var(--color)'}} component={Link} to={`/title/${row.id}`}>
            <Paper elevation={3} component={BearSlideImage} className={styles.slide} imageUrl={`https://anilibria.top${row.posters.small.url}`} key={row.id}>
            </Paper>
            <Typography variant="h7">{row.names.ru}</Typography>
        </Stack>
    });
    return ( 
        <Stack display={'flex'}>
            {/* <HeroVideo data={data} /> */}
            {/* <Hero /> */}
            <Stack>
                <Typography variant="h6" mb={2}>
                    Последние обновления:
                </Typography>
                <Stack component={BearCarousel}
                    autoPlayTime= '3000'
                    height= "300px"
                    data={carouselData} 
                    slidesPerView='2'
                    spaceBetween='10'
                    breakpoints={{
                        568: {
                            isEnableLoop: 'true',
                            slidesPerView: 5,
                            height: "300px",
                            isEnableAutoPlay: 'true',
                        }
                    }}
                    
                />
            </Stack>
            <Box display={{xs: 'block', sm: 'none'}}>
                <Typography variant='h6' mb={2}>
                    Популярные:
                </Typography>
                <Stack component={BearCarousel}
                    autoPlayTime= '3000'
                    height= "300px"
                    data={carouselPopularData} 
                    slidesPerView='2'
                    spaceBetween='10'
                    breakpoints={{
                        568: {
                            isEnableLoop: 'true',
                            slidesPerView: 5,
                            height: "300px",
                            isEnableAutoPlay: 'true',
                        }
                    }}
                    
                />
            </Box>
            <Box>
                {user && (
                    <Washlist />
                )}
            </Box>
        </Stack>
     );
}

export default MainPage;