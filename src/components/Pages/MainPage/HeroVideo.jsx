import { Box, makeStyles, Typography } from "@mui/material";
import ReactPlayer from "react-player";
import styles from './MainPage.module.css'
import { useNavigate } from "react-router-dom";

function HeroVideo(data) {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/title/${data.data.list[1].id}`)
    }

    return ( 
        <Box onClick={handleClick} mb={4} className={styles.player}>
            <Box flexDirection={'column'}>
            {/* <ReactPlayer url={`https://cache.libria.fun/${data.data.list[0].player.list[7].hls.sd}`}
        width={'100%'} height={'450px'} playing muted style={{borderRadius: '20px'}} /> */}
                <ReactPlayer url={`https://cache.libria.fun/${data.data.list[1].player.list[7].hls.sd}`} muted playing width={'100%'} height={'100%'}></ReactPlayer>
         </Box>
            <Box className={styles.bg}></Box>
            <Box className={styles.title} sx={{
                width: {
                    xs: '200px',
                    sm: '300px'
                }
            }}>
                <Typography sx={{
                    fontSize: {
                        xs: '16px', sm: '18px'
                    }
                }} gutterBottom variant="h6">{data.data.list[1].names.ru}</Typography>
                <Typography sx={{
                    fontSize: {
                        xs: '12px', sm: '14px'
                    }
                }} noWrap paragraph color={'gray'} variant="body2">{data.data.list[1].description}</Typography>
            </Box>
            
        </Box>
     );
}

export default HeroVideo;