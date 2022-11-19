import './paginate.css'

const Paginate = ({ page, games, paginate, currentPage, previousPage, nextPage, }) => {

  const pageNumber = []
  for (let i = 1; i <= Math.ceil(games / page); i++) {
    pageNumber.push(i)
  }

  return (
    <div className='pagination-container' >
      <ul className='pagination'>
        <li onClick={previousPage} className='page-number'>
          Prev
        </li>
        {pageNumber.map((number) => (
          <li
            key={number}
            onClick={() => paginate(number)}
            className={
              'page-number hide' + (number === currentPage ? 'active' : '')
            }
          >
            {number}
          </li>
        ))}
        <li onClick={nextPage} className='page-number'>
          Next
        </li>
      </ul>
    </div>
  )
}

export default Paginate