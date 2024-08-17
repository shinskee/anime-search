import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

function FilterEpisode({
  handleChangeQuality,
  valueQuality,
  isFetching,
  data,
  valueEpisodes,
  handleChangeEpisodes,
  onClickEpisode,
}) {
  return (
    <div className="flex gap-x-5">
      <FormControl className="w-[90%]">
        <InputLabel id="open-select-episodes">Серия</InputLabel>
        <Select
          className="w-full"
          labelId="open-select-episodes"
          id="open-select-episodes"
          value={valueEpisodes}
          onChange={handleChangeEpisodes}
          label="Episodes"
        >
          {isFetching &&
            Object.values(data.player.list).map((e, index) => (
              <MenuItem
                value={e.episode}
                key={index}
                onClick={() => onClickEpisode(e.hls)}
              >
                {e.episode}: {e.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl className="w-[20%]">
        <InputLabel id="open-select-quality">Качество</InputLabel>
        <Select
          className="w-full"
          labelId="open-select-quality"
          id="open-select-quality"
          value={valueQuality}
          defaultValue={'hd'}
          onChange={handleChangeQuality}
          label="Quality"
        >
              <MenuItem value={'sd'}>480p</MenuItem>
              <MenuItem value={'hd'}>720p</MenuItem>
              <MenuItem value={'fhd'}>1080p</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default FilterEpisode;
