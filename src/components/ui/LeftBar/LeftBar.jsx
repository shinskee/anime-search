import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
  Checkbox,
  Collapse,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useGetGenresQuery, useGetSearchQuery } from "../../../api/api";
import { useDispatch, useSelector } from "react-redux";
import {
  genresChecked,
  resetQuery,
} from "../../../features/currentQuerySlice";
import logo from "../../../assets/logo.png";
import { useState } from "react";

function LeftBar() {
  const { data, error, isLoading } = useGetGenresQuery();
  const [checked, setChecked] = useState([]);
  const [genreMore, setGenreMore] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    dispatch(genresChecked(newChecked));
    navigate("/searcher");
    console.log(newChecked);
  };
  if (error) return <div>Ошибка</div>;
  if (isLoading) return <div>Загрузка...</div>;

  return (
    <Stack sx={{ borderRight: "4px solid #454545", height: "100%" }}>
      <Link
        onClick={() => dispatch(resetQuery())}
        margin={"0 auto"}
        sx={{
          display: "flex",
          textDecoration: "none",
          color: "white",
          alignItems: "center",
          columnGap: "10px",
        }}
        component={RouterLink}
        to={"/"}
      >
        <img width={"30px"} height={"30px"} src={logo} alt="logo" />
        <Typography margin={"10px 0"} variant="h6">
          Anime Search
        </Typography>
      </Link>
    
      <Box alignItems={'start'} display={'flex'} flexDirection={'column'}>
      </Box>
      <Accordion defaultExpanded sx={{boxShadow: 'none', backgroundImage: 'none', margin: 0, }}>
        <AccordionSummary>Жанры</AccordionSummary>
        <AccordionDetails sx={{p: 0}}>
            <Collapse orientation="vertical" in={!genreMore} collapsedSize={400}>
                <List sx={{ display: "flex", flexDirection: "column" }}>
                {data.map((i, index) => (
                    <ListItem sx={{height: '40px'}} key={index} disablePadding>
                    <ListItemButton sx={{height: '40px'}} role={undefined} onClick={handleToggle(i)} dense>
                        <ListItemIcon sx={{minWidth:'28px'}}>
                        <Checkbox
                            edge="start"
                            checked={checked.indexOf(i) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ "aria-labelledby": i }}
                        />
                        </ListItemIcon>
                        <ListItemText id={i} primary={i} />
                    </ListItemButton>
                    </ListItem>
                ))}
                </List>
            </Collapse>
            <Link sx={{cursor: 'pointer'}} pl={1} onClick={() => {setGenreMore(!genreMore)}}>Показать еще</Link>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
}

export default LeftBar;
