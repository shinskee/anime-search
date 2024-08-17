import { Paper, Stack, Typography } from "@mui/material";
import styles from "../Popular/Popular.module.css";
import { Link as RouterLink } from "react-router-dom";

function Card({i, width, height}) {
  return (
    <Stack className={styles.card}>
      <Paper
        elevation={3}
        key={i.id}
        to={`/title/${i.id}`}
        sx={{
          borderRadius: "10px",
          width: `${width}`,
          height: `${height}`,
          textDecoration: "none",
          color: "var(--color)",
          fontSize: "14px",
        }}
        component={RouterLink}
        mt={2}
      >
        <img
          width={width}
          style={{ borderRadius: "10px" }}
          src={`https://anilibria.top${i.posters.small.url}`}
          alt={i.names.en}
        />
      </Paper>
      <Typography mt={1} variant="body2" width={width}>
        {i.names.ru}
      </Typography>
    </Stack>
  );
}

export default Card;
