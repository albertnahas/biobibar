import React, { useMemo } from "react";
import { Pagination } from "../types/pagination";

export const LEFT_DOTS = "left-dots";
export const RIGHT_DOTS = "right-dots";

const range = (start: number, end: number) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePaginate = ({
  items,
  pageSize,
  siblingCount = 1,
  currentPage,
}: Pagination) => {
  const paginationRange = useMemo(() => {
    const pagesCount = Math.ceil(items / pageSize);

    if (pagesCount === 1) return null;
    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    // Case 1: If the number of pages is less than the page numbers we want to show in our Pagination component, we return the range [1..pagesCount]
    if (totalPageNumbers >= pagesCount) {
      return range(1, pagesCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, pagesCount);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < pagesCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = pagesCount;

    // Case 2: No left dots to show, but rights dots to be shown
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, RIGHT_DOTS, pagesCount];
    }

    // Case 3: No right dots to show, but left dots to be shown
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(pagesCount - rightItemCount + 1, pagesCount);
      return [firstPageIndex, LEFT_DOTS, ...rightRange];
    }

    // Case 4: Both left and right dots to be shown
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [
        firstPageIndex,
        LEFT_DOTS,
        ...middleRange,
        RIGHT_DOTS,
        lastPageIndex,
      ];
    }
  }, [items, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
