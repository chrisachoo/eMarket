import { useState } from "react"
import Pagination from "./pagination"

const ProductsReport = ({ products }) => {
  
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(9)
  const BASE_URL = import.meta.env.VITE_URL_STRING;

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentElements = products?.slice(indexOfFirstPost, indexOfLastPost)
  console.log('currentElements ', currentElements)

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const nextPage = () => {
    if (currentPage !== Math.ceil(products?.length / postsPerPage)) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {currentElements?.map((element, index) => {
              return (
                <tr key={index}>
                  <td>{element.name}</td>
                  <td>{element.price}</td>
                  <td>{element.quantity}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <div style={{ margin: "16px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href={`${BASE_URL}/report/generate-product-report`} download>
            <button className="btn btn-primary" type="submit">
              Generate report
            </button>
          </a>
          <Pagination nextPage={nextPage} previousPage={previousPage} />
        </div>
      </div>
    </>
  )
}

export default ProductsReport