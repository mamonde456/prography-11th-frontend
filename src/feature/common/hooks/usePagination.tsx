import { useMemo, useState } from "react";

type Props = {
  size?: number;
  currnetTotalPage: number | undefined;
};

export default function usePagination({ currnetTotalPage, size = 5 }: Props) {
  const [totalPage, setTotalPage] = useState(currnetTotalPage ?? 1);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePage = () => {
    const half = Math.floor(size / 2); // 2.5

    let start = currentPage - half;
    let end = currentPage + half;
    if (start < 1) {
      start = 1;
      end = size;
    }

    if (end > totalPage) {
      end = totalPage;
      start = Math.max(1, totalPage - size + 1);
    }
    return { start, end };
  };
  const getPageNumbers = (start: number, end: number) => {
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = useMemo(() => {
    const { start, end } = handlePage();
    return getPageNumbers(start, end);
  }, [currentPage, totalPage, size]);

  const updatePageCount = (count: number) => {
    setCurrentPage(count);
  };
  const updateTotalPage = (page: number) => {
    setTotalPage(page);
  };
  return { pages, currentPage, updatePageCount, updateTotalPage };
}
