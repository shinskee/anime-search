

function TitleList({data, handleClickTitle}) {
    return ( 
                <div className="mb-auto gap-x-3 gap-y-3 flex flex-wrap mx-auto justify-center max-sm:flex-col items-start max-sm:w-full">
                {data.list.length > 0 ? data.list.map((i) => (
                    <div key={i.id} className="max-sm:w-full">
                        <div className="hover relative max-sm:flex max-sm:gap-x-2 max-sm:bg-gray-200 max-sm:min-w-full max-sm:rounded">
                            <img
                                onClick={(e) => handleClickTitle(i.id)}
                                src={`https://anilibria.top${i.posters.small.url}`}
                                className="rounded max-sm:h-40 h-60 select-none cursor-pointer max-sm:w-28 w-44 sm:hover:-translate-y-1 transition-all"
                            />
                            <div className="text-sm hidden dark:text-gray-800 select-none max-sm:flex max-sm:flex-col max-sm:gap-y-1">
                                <p className="font-bold">{i.names.ru}</p>
                                <p>Жанр: {i.genres.join(", ")}</p>
                            </div>
                            <p className="desktopName max-sm:hidden dark:text-gray-800 absolute bottom-0 w-full bg-gray-50 bg-opacity-70 filter backdrop-blur-sm p-2 opacity-0 transition-all pointer-events-none sm:translate-y-2">{i.names.ru}</p>
                        </div>
                    </div>
                )) : <div className="h-screen">Ничего не найдено</div>}
                </div>
     );
}

export default TitleList;