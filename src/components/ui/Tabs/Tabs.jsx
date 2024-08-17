import { Button, FormControl, Stack, Link, TextField } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Tabs.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { searchAnime } from "../../../features/currentQuerySlice";

function Tabs() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [type] = useSelector(state => state.currentQuery.type)
  
  const [searchValue, setSearchValue] = useState('')
  const searchClick = () => {
    dispatch(searchAnime({search: searchValue}))
    navigate('/searcher')
  }
  const animeClick = () => {
    dispatch(searchAnime({type: [1]}))
    navigate('/searcher')
  }
  const filmClick = () => {
    dispatch(searchAnime({type: [0]}))
    navigate('/searcher')
  }

  return (
    <Stack
      flexDirection={"row"}
      justifyContent={"space-between"}
      columnGap={2}
      mt={2}
      mb={4}
      alignItems={'center'}
    >
      <Stack flexDirection={"row"} columnGap={2}>
        <NavLink onClick={filmClick} className={type === 0 ? styles.active : styles.default}
          to={"/searcher"}
        >
          Фильмы
        </NavLink >
        <NavLink onClick={animeClick} className={type === 1 ? styles.active : styles.default}
          to={"/searcher"}
        >
          Сериалы
        </NavLink>
      </Stack>
      <Stack display={'flex'} flexDirection={'row'} columnGap={2}>
        <FormControl>
          <TextField size="small" value={searchValue} onChange={(e) => {setSearchValue(e.target.value)}}></TextField>
        </FormControl>
        <Button onClick={searchClick}>Поиск</Button>
      </Stack>
    </Stack>
  );
}

export default Tabs;
