import axios from "axios"

const BASE_URL = 'https://api.anilibria.tv/v3'

export const getTitle = async (pageNumber, setData, setIsFetching, setCurrentPage) => {
    setIsFetching(false)
    const result = await axios(
        `https://api.anilibria.tv/v3/title/updates?page=${pageNumber}`
    )
    setData(result.data)
    setIsFetching(true)
    setCurrentPage(result.data.pagination.current_page)
}

export const getSearchTitle = async (searchValue, setData, setIsFetching) => {
    setIsFetching(false)
    const result = await axios(
        `https://api.anilibria.tv/v3/title/search?search=${searchValue}`
    )
}

export const filterApi = {
    getYear: async (setIsFetching, setYear, setOpen, open, isFetching) => {
        setIsFetching({...isFetching, year: false})
        const result = await axios.get(`${BASE_URL}/years`)
        setYear(result.data)
        setIsFetching({...isFetching, year: true})
        setOpen({...open, year: true})
    },
    getGenres: async (setIsFetching, setGenres, setOpen, open, isFetching) => {
        setIsFetching({...isFetching, genres: false})
        const result = await axios.get(`${BASE_URL}/genres`)
        setGenres(result.data)
        setIsFetching({...isFetching, genres: true})
        setOpen({...open, genres: true})
    },
    getTitleUpdates: async (setIsFetching, setData, setPagesCount, setIsLoading, setCurrentPage) => {
        setIsFetching(false)
        const result = await axios.get(`${BASE_URL}/title/updates?items_per_page=6`)
        setData(result.data)
        setPagesCount(result.data.pagination.pages);
        setIsLoading(false)
        setIsFetching(true)
        setCurrentPage(result.data.pagination.current_page)
    }
}
