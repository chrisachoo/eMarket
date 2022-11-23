const Pagination = ({ page, routes, previousPage, nextPage }) => {
  const pageNumber = []
  for (let i = 1; i <= Math.ceil(routes / page); i++) {
    pageNumber.push(i)
  }

  return (
    <>
      <div className="btn-group grid grid-cols-2">
        <button className="btn btn-outline" onClick={previousPage}>Previous page</button>
        <button className="btn btn-outline" onClick={nextPage}>Next</button>
      </div>
    </>
  );
}

export default Pagination;