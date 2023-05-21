import { useState } from "react"
import { useReport } from "../../hook/useReport.js"
import Pagination from "./pagination"

const ShopsReport = ({ sales, system }) => {

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(9)
  const BASE_URL = import.meta.env.VITE_URL_STRING;

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentElements = sales?.data?.slice(indexOfFirstPost, indexOfLastPost)

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const nextPage = () => {
    if (currentPage !== Math.ceil(sales?.data?.length / postsPerPage)) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <>
      {sales ?
        <div className="overflow-x-auto">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th>Shop Name</th>
                <th>Total Income</th>
                <th>Total Profit</th>
              </tr>
            </thead>
            <tbody>
              {currentElements.map((element, index) => {
                return (
                  <tr key={index}>
                    <td>{element?.shopName}</td>
                    <td>{element?.moneyMade}</td>
                    <td>{element?.ourProfit}</td>
                  </tr>
                )
              })}
            </tbody>
            <tbody>
              <tr>
                <td>Total Profit (8% Commission)</td>
                <td></td>
                <td>{sales?.systemProfit}</td>
              </tr>
            </tbody>
          </table>

          <div style={{ margin: "16px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <a href={`${BASE_URL}/report/generate-money-allocation-report`} download>
              <button className="btn btn-primary" type="submit">
                Generate report
              </button>
            </a>
            <Pagination nextPage={nextPage} previousPage={previousPage} />
          </div>
        </div> :
        <div role="status" className="max-w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      }
    </>
  )
}

export default ShopsReport