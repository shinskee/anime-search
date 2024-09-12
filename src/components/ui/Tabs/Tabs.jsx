import { Button, FormControl, Stack, Link, TextField, Box, Typography, Icon, IconButton, InputLabel } from "@mui/material";
import { NavLink, useNavigate, Link as RouterLink } from "react-router-dom";
import styles from "./Tabs.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { searchAnime } from "../../../features/currentQuerySlice";
import logo from "../../../assets/logo.png";
import SearchIcon from '@mui/icons-material/Search';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useAuth } from "../../../features/useAuth";

function Tabs() {
  const { user, signInWithGoogle, logout } = useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [type] = useSelector(state => state.currentQuery.type)
  const [searchValue, setSearchValue] = useState('')
  
  const onGoogleLogin = async () => {
    try {
      await signInWithGoogle()
      console.log('success');
      
    } catch (error) {
      console.log('err', error);
      
    }
  }
  
  const searchClick = () => {
    if (searchValue.length > 0) {
      dispatch(searchAnime({search: searchValue}))
      navigate('/searcher')
      setSearchValue('')
    }
    return
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
        <Box display={{xs: 'block', sm: 'none'}}>
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
        className={styles.logo}
      >
        <img width={"30px"} height={"30px"} src={logo} alt="logo" />
      </Link>
        </Box>
        <Box display={{xs: 'none', sm: 'flex'}} columnGap={'10px'}>
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
        {user && (
          <div>
            User Auth
            <NavLink to={"/washlist"}>
              Избранное
            </NavLink>
            <NavLink onClick={logout}>
              Выйти
            </NavLink>
          </div>
        )}
        {!user && (
          <NavLink onClick={onGoogleLogin}>
            Войти
          </NavLink>
        )}
        </Box>
      </Stack>
      <Stack display={'flex'} flexDirection={'row'}>
        <FormControl>
          <TextField placeholder="Введите название" size="small" value={searchValue} onChange={(e) => {setSearchValue(e.target.value)}}></TextField>
        </FormControl>
        <IconButton onClick={searchClick}>
          <SearchIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
}

export default Tabs;
