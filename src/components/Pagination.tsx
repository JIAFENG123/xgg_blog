import { DOTS, usePagination } from "src/composable/usePagination";

export default (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (!paginationRange || currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="flex items-center">
      {currentPage === 1 ? (
        ""
      ) : (
        <a
          onClick={onPrevious}
          className={`bg-white cursor-pointer dark:bg-dark-50 rounded shadow-cardShadow text-sm py-6px px-10px h-9 flex justify-center items-center`}
        >
          Previous
        </a>
      )}

      <ul className="flex-1 flex justify-center items-center overflow-auto">
        {paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return <li className="mx-4">&#8230;</li>;
          }
          return (
            <li
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`${pageNumber === currentPage ? 'dark:bg-gray-300 dark:text-dark-100 bg-blue-500 text-light-300' : ''} cursor-pointer py-1 px-2 m-1 h-9 min-w-9 bg-light-50 dark:bg-dark-50 rounded shadow-cardShadow text-sm flex justify-center items-center` }
            >
              <a>{pageNumber}</a>
            </li>
          );
        })}
      </ul>
      {currentPage === lastPage ? (
        ""
      ) : (
        <a
          onClick={onNext}
          className="bg-white cursor-pointer dark:bg-dark-50 rounded shadow-cardShadow text-sm py-6px px-10px h-9 flex justify-center items-center"
        >
          Next
        </a>
      )}
    </div>
  );
};
