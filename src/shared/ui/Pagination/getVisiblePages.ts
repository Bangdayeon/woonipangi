export const getVisiblePages = (currentPage: number, totalPages: number) => {
  if (!Number.isFinite(totalPages) || totalPages < 1) return [];
  const normalizedCurrent = Number.isFinite(currentPage) ? Math.floor(currentPage) : 1;
  const safeCurrent = Math.min(Math.max(normalizedCurrent, 1), totalPages);
  const MAX = 5;
  const HALF = Math.floor(MAX / 2);

  let start = safeCurrent - HALF;
  let end = safeCurrent + HALF;

  if (start < 1) {
    start = 1;
    end = MAX;
  }

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, totalPages - MAX + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};
