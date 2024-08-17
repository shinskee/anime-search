import { Stack, Typography } from "@mui/material";
import { useGetTitleUpdatesQuery } from "../../../api/api";
import BearCarousel, { BearSlideImage } from 'bear-react-carousel';
import { Link } from "react-router-dom";
import Popular from "../../ui/Popular/Popular";
import styles from './MainPage.module.css'
import Hero from "../../ui/Hero/Hero";

function MainPage() {
    const { data, error, isLoading } = useGetTitleUpdatesQuery()

    if (error) return <div>Ошибка</div>
    if (isLoading) return <div>Загрузка...</div>
    const carouselData = data.list.map(row => {
        return <Stack sx={{textDecoration: 'none', color: 'var(--color)'}} component={Link} to={`/title/${row.id}`}>
            <BearSlideImage className={styles.slide} imageUrl={`https://anilibria.top${row.posters.small.url}`} key={row.id}>
            </BearSlideImage>
            <Typography variant="h7">{row.names.ru}</Typography>
        </Stack>
    });
    return ( 
        <Stack display={'flex'}>
            <Hero />
            <Stack>
                <Typography variant="h5" mb={2}>
                    Последние обновления:
                </Typography>
                <BearCarousel
                    height= "400px"
                    data={carouselData} 
                    slidesPerView='1'
                    spaceBetween='10'
                    breakpoints={{
                        568: {
                            slidesPerView: 5 
                        }
                    }}
                />
            </Stack>
        </Stack>
     );
}

export default MainPage;