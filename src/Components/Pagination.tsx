import React, { useMemo, useRef, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import clsx from 'clsx';

export type PaginationProps = {
  /** break text to show between numbers */
  breakText?: string;
  /** Total length of data */
  pageCount: number;
  /** Page size */
  pageSize: number;
  /**  Page change callback handler */
  onPageChange?: (pageNumber: number) => void;
  /** className */
  className?: string;
};

export function Pagination(props: PaginationProps) {
  const { pageCount, pageSize, breakText, onPageChange, className } = props;

  const DOTS = '...';

  const ref: any = useRef(null);

  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const rangeSelector = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, index) => index + start);
  };

  const paginationRange = useMemo(() => {
    // calculates the total pages count
    const totalPageCount = Math.ceil(pageCount / pageSize);

    // calculates the left and right sibling indexes
    const leftSiblingIndex = Math.max(currentPageNumber - 1, 1);
    const rightSiblingIndex = Math.min(currentPageNumber + 1, totalPageCount);

    // determine the break DOTS sides based on the current page number
    const showLeftDots = leftSiblingIndex > 1;
    const showRightDots = rightSiblingIndex < totalPageCount - 1;

    // calculate the first and last page indexes
    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    // if cursor is on last pages then show dots on left side
    if (!showLeftDots && showRightDots) {
      const leftItemCount = 3 + 2 * 1;
      const leftRange = rangeSelector(1, leftItemCount);
      return [...leftRange, DOTS, totalPageCount];
    }

    // if cursor is on middle pages then show dots on both side
    if (showLeftDots && showRightDots) {
      const middleRange = rangeSelector(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    // if cursor is on inital pages then show dots on right side
    if (!showRightDots && showLeftDots) {
      const rightItemCount = 3 + 2 * 1;
      const rightRange = rangeSelector(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }
    return [];
  }, [pageCount, pageSize, currentPageNumber]);

  let lastPageNumber: number = 0;

  // define last page number
  if (paginationRange) {
    lastPageNumber = paginationRange[paginationRange.length - 1] as number;
  }

  // if the pagination data is less than 2 then render nothing
  if (paginationRange && paginationRange?.length < 2) {
    return null;
  }

  // next page button handler
  const onNextPageHandle = (event: any) => {
    event.preventDefault();
    if (lastPageNumber !== currentPageNumber) {
      const pageNumber = currentPageNumber + 1;
      unstable_batchedUpdates(() => {
        setCurrentPageNumber(pageNumber);
        if (onPageChange) onPageChange(pageNumber);
      });
    }
  };

  // previous page button handler
  const onPreviousPageHandle = (event: any) => {
    event.preventDefault();
    if (currentPageNumber !== 1) {
      const pageNumber = currentPageNumber - 1;
      unstable_batchedUpdates(() => {
        setCurrentPageNumber(pageNumber);
        if (onPageChange) onPageChange(pageNumber);
      });
    }
  };

  const handlePageChange = (page: number) => () => {
    if (onPageChange) {
      onPageChange(page);
      setCurrentPageNumber(page);
    }
  };

  return (
    <div className={clsx('flex justify-between', className)}>
      <button
        type="button"
        onClick={onPreviousPageHandle}
        disabled={currentPageNumber === 1}
        className="bg-blue-500 text-white w-24 rounded-lg hover:bg-blue-400"
      >
        Previous
      </button>

      <div className="flex gap-2 items-center">
        {paginationRange?.map((pageNumber: number | string, index) => {
          if (pageNumber === DOTS) {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <p key={pageNumber + index} className="hidden md:inline-block">
                {breakText ?? DOTS}
              </p>
            );
          }

          return (
            <div
              tabIndex={0}
              className={clsx(
                'text-xl hidden md:flex justify-center items-center w-10 h-10 rounded-full transition-colors duration-200 ease-linear',
                pageNumber === currentPageNumber
                  ? 'bg-blue-500 text-white font-medium'
                  : 'text-gray-600 hover:bg-blue-400 hover:text-white'
              )}
              role="button"
              key={pageNumber}
              onClick={handlePageChange(pageNumber as number)}
              onKeyDown={handlePageChange(pageNumber as number)}
            >
              <p>{pageNumber}</p>
            </div>
          );
        })}
        <p className="md:hidden text-xl">
          {`Page ${currentPageNumber} of ${lastPageNumber}`}
        </p>
      </div>

      <button
        type="button"
        onClick={onNextPageHandle}
        disabled={currentPageNumber === lastPageNumber}
        className="px-3 py-2 bg-blue-500 w-24 text-white rounded-lg hover:bg-blue-400"
      >
        Next
      </button>
    </div>
  );
}
