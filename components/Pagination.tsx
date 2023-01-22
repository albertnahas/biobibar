import { ReactSVG } from "react-svg";
import { Pagination } from "../types/pagination";
import { usePaginate, LEFT_DOTS, RIGHT_DOTS } from "../helpers/usePaginate";

const Pagination = ({
  onPageChange,
  items,
  siblingCount = 1,
  currentPage,
  pageSize,
}: Pagination) => {
  const paginationRange = usePaginate({
    currentPage,
    items,
    siblingCount,
    pageSize,
    onPageChange,
  });

  if (paginationRange && (currentPage === 0 || paginationRange.length < 2)) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage;

  if (paginationRange) {
    lastPage = paginationRange![paginationRange.length - 1];
  }

  return (
    <>
      {paginationRange && (
        <div className="flex justify-end">
          <ul className="pagination">
            {paginationRange && currentPage === 1 ? (
              <li className="page-arrow-inactive">
                <ReactSVG src="/arrows.svg" />
              </li>
            ) : (
              <li
                className="page-arrow cursor-pointer"
                onClick={() => onPrevious()}
              >
                <ReactSVG src="/arrows.svg" />
              </li>
            )}

            {paginationRange?.map((page: any) => {
              if (page === LEFT_DOTS || page === RIGHT_DOTS) {
                return (
                  <li key={page} className="page-item dots">
                    . . .
                  </li>
                );
              }
              return (
                <li
                  key={page}
                  className={
                    page === currentPage ? "page-item-active" : "page-item"
                  }
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </li>
              );
            })}

            {currentPage === lastPage ? (
              <li className="page-arrow-inactive">
                <ReactSVG src="/arrows2.svg" />
              </li>
            ) : (
              <li
                className="page-arrow cursor-pointer"
                onClick={() => onNext()}
              >
                <ReactSVG src="/arrows2.svg" />
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default Pagination;
