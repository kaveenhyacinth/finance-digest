export function getPagination(page, size) {
  let pPage = parseInt(page ?? 1);
  if (isNaN(pPage)) pPage = 1;

  let sSize = parseInt(size ?? 100);
  if (isNaN(sSize)) sSize = 0;

  const offset = (pPage - 1) * sSize;

  function getPaginationMeta(total) {
    return {
      total,
      page: pPage,
      size: sSize,
      pages: Math.ceil(total / sSize),
    };
  }

  return {
    page: pPage,
    size: sSize,
    offset,
    getPaginationMeta,
  };
}