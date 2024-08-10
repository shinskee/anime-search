import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Search({handleSearch, isInputNull, setIsInputNull}) {
    const [inputV, setInputV] = useState('')
    const [genres, setGenres] = useState('')
    const [isFetching, setIsFetching] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const onChangeInput = (e) => {
        setInputV(e.target.value)
        if (inputV.length === 1) {
            setIsInputNull(true)
        } else {
            setIsInputNull(false)
        }
    }
    const navigate = useNavigate()
    const onGetGenres = () => {
        const fetchData = async () => {
            setIsFetching(false)
            const result = await axios (
                `https://api.anilibria.tv/v3/genres`
            )
            setGenres(result.data)
            setIsFetching(true)
        }
        fetchData()
        setIsActive(!isActive)
    }

    const onCloseGenres = () => {
        setIsActive(false)
    }

    const onGenresClicked = () => {
        const fetchData = async () => {
            setIsFetching(false)
            const result = await axios (
                `https://api.anilibria.tv/v3/genres`
            )
            setGenres(result.data)
            setIsFetching(true)
        }
        fetchData()
        setIsActive(!isActive)
    }
    
    return ( 
        <div className="flex gap-x-2 w-full max-sm:overflow-x-hidden">
            <input maxLength={180} onChange={onChangeInput} value={inputV} className={isInputNull ? `border border-red-700 rounded h-8 px-2 w-full` : `border rounded h-8 px-2 w-full`} type="text" name="search" placeholder="введите название" id="" />
            <button onClick={() => handleSearch(inputV)} className="text-gray-800">Поиск</button>
            <button onClick={() => {navigate(0, { replace: true })}} className="text-gray-800">Сбросить</button>
            <button onClick={onGetGenres} className="text-gray-800 z-10">=</button>
            <div className={isActive ? "z-10 max-sm:translate-x-0 max-sm:absolute max-sm:right-0 transition-all bg-gray-100 p-5 rounded" : "z-10 max-sm:translate-x-full max-sm:absolute max-sm:right-0 transition-all"}>
                <button onClick={onCloseGenres}>X</button>
                {isFetching && genres.map((g, index) => (<div onClick={onGenresClicked} key={index}>{g}</div>))}
            </div>
            {/* <TitleList handleClickTitle={handleClickTitle} data={data} /> */}
        </div>
     );
}

export default Search;