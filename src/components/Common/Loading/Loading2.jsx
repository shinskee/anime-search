

function Loading2({isFetching, itemsPerPage}) {
    return ( 
        <div className="w-full flex flex-wrap max-sm:flex-col gap-y-3 justify-center gap-x-3">
            {!isFetching && [...Array(itemsPerPage)].map((_, index) => (<div key={index} className="h-60 w-44 max-sm:w-full max-sm:h-40 bg-gray-50 animate-pulse rounded"></div>))}
        </div>
     );
}

export default Loading2;