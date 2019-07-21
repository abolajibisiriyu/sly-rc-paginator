import range from "lodash/range";

export function getPager(_totalItems, _currentPage, _itemsPerPage) {
  // console.log("Total items: ", _totalItems);
  // console.log("Items per page: ", _itemsPerPage);
  // console.log("Current page: ", _currentPage);
  const currentPage = _currentPage;

  // default page size is 10
  const itemsPerPage = _itemsPerPage || 10;

  // calculate total pages
  const numberOfPages = Math.ceil(_totalItems / itemsPerPage);

  let startPage, endPage;
  if (numberOfPages <= 10) {
    // less than 10 total pages so show all
    startPage = 1;
    endPage = numberOfPages;
  } else {
    // more than 10 total pages so calculate start and end pages
    if (currentPage <= 6) {
      startPage = 1;
      endPage = 10;
    } else if (currentPage + 4 >= numberOfPages) {
      startPage = numberOfPages - 9;
      endPage = numberOfPages;
    } else {
      startPage = currentPage - 5;
      endPage = currentPage + 4;
    }
  }

  // create an array of pages to repeat in the pager control
  const pages = range(startPage, endPage + 1);

  // return object with all pager properties
  return {
    currentPage,
    numberOfPages,
    pages
  };
}
