import axios from "axios"

const instanse = axios.create({
    baseURL: 'https://api.anilibria.tv/v3/'
})

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
    console.log(result.data);
    
    // setData(result.data)
    // setIsFetching(true)
    // setCurrentPage(result.data.pagination.current_page)
}