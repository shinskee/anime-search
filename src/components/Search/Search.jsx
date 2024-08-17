import { useState } from "react";
import { Button, TextField } from "@mui/material";
import FilterGenres from "./FilterGenres";
import FilterYear from "./FilterYear";
import { filterApi } from "../../api/api2";


function Search({handleSearch, setIsInputNull}) {
    const [inputV, setInputV] = useState('')
    const [genres, setGenres] = useState('')
    const [year, setYear] = useState("")
    const [yearValue, setYearValue] = useState("")
    const [isFetching, setIsFetching] = useState({genres: false, year: false})
    const [genresValue, setGenresValue] = useState([])
    const [open, setOpen] = useState({genres: false, year: false})

    const onChangeInput = (e) => {
        setInputV(e.target.value)
        if (inputV.length === 1) {
            setIsInputNull(true)
        } else {
            setIsInputNull(false)
        }
    }

    const handleChange = (e) => {
        setGenresValue(e.target.value)
    }
    const handleOpen = () => {
        if (genres.length === 0) {
            filterApi.getGenres(setIsFetching, setGenres, setOpen, open, isFetching) 
        } else {
            setOpen({...open, genres: true})
        }
    }
    const handleClose = () => {
        setOpen({...open, genres: false})
    }

    const handleOpenYear = () => {
        if (year.length === 0) {
            filterApi.getYear(setIsFetching, setYear, setOpen, open, isFetching)
        } else {
            setOpen({...open, year: true})
        }
    }

    const handleCloseYear = () => {
        setOpen({...open, year: false})
    }

    const handleChangeYear = (e) => {
        setYearValue(e.target.value)
    }

    return ( 
        <div className="flex flex-col gap-x-2 w-full max-sm:overflow-x-hidden gap-y-3">
            <div className="flex items-center gap-x-3 pt-2">
                <TextField
                    fullWidth 
                    id="input-search" 
                    label='Введите название'
                    value={inputV}
                    onChange={onChangeInput} ></TextField>
                <Button onClick={() => handleSearch(inputV, genresValue, yearValue)} id="input-search" variant="outlined" >Поиск</Button>
            </div>
            <FilterGenres handleOpen={handleOpen} handleClose={handleClose} 
                genresValue={genresValue} handleChange={handleChange} open={open.genres} genres={genres} isFetching={isFetching.genres} />
            <FilterYear handleOpenYear={handleOpenYear} handleCloseYear={handleCloseYear}
                yearValue={yearValue} handleChangeYear={handleChangeYear} openYear={open.year} year={year} isFetching={isFetching.year} />
        </div>
     );
}

export default Search;