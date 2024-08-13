import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function FilterGenres({handleOpen, handleClose, genresValue, handleChange, open, genres, isFetching }) {
  return (
    <FormControl>
      <InputLabel id="open-select-genres">Жанры</InputLabel>
      <Select
        className="w-full"
        labelId="open-select-genres"
        id="open-select-genres"
        onOpen={handleOpen}
        onClose={handleClose}
        value={genresValue}
        onChange={handleChange}
        multiple
        open={open}
        label="Genres"
      >
        {isFetching &&
          genres.map((g, index) => (
            <MenuItem value={g} key={index}>
              {g}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

export default FilterGenres;
