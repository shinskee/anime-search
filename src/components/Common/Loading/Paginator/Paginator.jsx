import { useState } from "react";
import Left from '../../../../assets/left.svg?react'
import Right from '../../../../assets/right.svg?react'

function Paginator({pagesCount, onPageChanged, currentPage}) {
    const [portionNumber, setPortionNumber] = useState(1)

    let pages = []
    for (let i = 1; i < pagesCount; i++) {
        pages.push(i)
    }
    let portionSize = 20
    let portionCount = Math.ceil(pagesCount / portionSize)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize
  return (
    <div className="flex justify-center items-center w-full">
      {portionNumber > 1 && (
        <Left
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
          className="w-5 h-5 cursor-pointer select-none"
        />
      )}
      {
        <div className="flex gap-x-2 justify-center text-xl cursor-pointer select-none">
          {pages
            .filter(
              (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
            )
            .map((p) => (
              <span
                key={p}
                onClick={(e) => onPageChanged(p)}
                className={
                  currentPage === p ? "font-bold" : "font-sans"
                }
              >
                {p}
              </span>
            ))}
        </div>
      }
      {portionCount > portionNumber && (
        <Right
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
          className="w-5 h-5 cursor-pointer select-none dark:fill-gray-200 fill-gray-950"
        />
      )}
    </div>
  );
}

export default Paginator;
