import { useNavigate, Link as RouterLink } from "react-router-dom";
import { AppBar, Link, Typography } from "@mui/material";

function Header() {
  return (
    <AppBar sx={{ paddingInline: 2 }}>
      <Typography component={RouterLink} sx={{color: 'white', textDecoration: 'none'}} to={'/'} variant="h5" fontWeight={"bold"}>
        Anime Search
      </Typography>
    </AppBar>
  );
}

export default Header;
