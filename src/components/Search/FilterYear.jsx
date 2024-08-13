import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function FilterYear({
  handleOpenYear,
  handleCloseYear,
  yearValue,
  handleChangeYear,
  open,
  year,
  isFetching,
}) {
  return (
    <FormControl>
      <InputLabel id="open-select-year">Год</InputLabel>
      <Select
        className="w-full"
        labelId="open-select-year"
        id="open-select-year"
        onOpen={handleOpenYear}
        onClose={handleCloseYear}
        value={yearValue}
        onChange={handleChangeYear}
        // multiple
        open={open}
        label="Year"
      >
        {isFetching &&
          year.map((y, index) => (
            <MenuItem value={y} key={index}>
              {y}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

export default FilterYear;
