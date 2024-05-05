
export const generatePagination = (currentPage: number, totalPages: number) => {
  let startPage = 1;
  let endPage = totalPages;
  let pages: number[] = [];

  if (totalPages > 5) {
    if (currentPage <= 3) {
      startPage = 1;
      endPage = 5;
    } else if (currentPage + 2 >= totalPages) {
      startPage = totalPages - 4;
      endPage = totalPages;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
};