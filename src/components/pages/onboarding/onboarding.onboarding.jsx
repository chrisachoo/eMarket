import { useShop } from '../../hooks/useShop'
import React, { useState } from 'react'
import { Loader, Paginate } from '../..'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from 'react-use-cart'
import { useAuthContext } from "../../hooks/useAuthContext"
import { useCheaper } from '../../hooks/useCheepr'
import { useNavigate } from 'react-router-dom';


const Onboarding = ({ category, product }) => {

  const numberFormatter = Intl.NumberFormat('en-US')

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(2)
  const { getProducts, isLoading } = useShop()
  const { getCheaperProduct, loading } = useCheaper()
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const { user } = useAuthContext()
  const { addItem } = useCart()
  const navigate = useNavigate()
  const fetchProducts = async (data) => {
    const category_id = data.id
    await getProducts(category_id)
  }

  const addToCart = (item) => {
    addItem(item)
    console.log({ item })
  }

  const viewItem = async (item) => {
    console.log({ item })
    const product_id = item.id
    const shop_id = item.shop_id
    const category_id = item.category_id

    if (user) {
      await getCheaperProduct(product_id, shop_id, category_id)
    } else {
      navigate('/signin')
    }
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const nextPage = () => {
    if (product.length > 0) {
      if (currentPage !== Math.ceil(product.length / postsPerPage)) {
        setCurrentPage(currentPage + 1)
      }
    }
  }

  const [searchField, setSearchField] = useState("")

  return (
    <>
      {isLoading ? <Loader /> : null}

      <div className="p-5 grid-items">
        <ul className="menu bg-base-300 rounded-box" style={{ height: "fit-content" }}>
          {category ?
            <div>
              {category.map((x) => {
                return (
                  <li key={x.id} onClick={() => fetchProducts(x)} className="hover-bordered"><a>{x.name}</a></li>
                )
              })}
            </div> : <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-700 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>}
        </ul>
        <div className="flex-grow p-5 rounded-box place-items-center">
          <nav className="bg-gray-50 dark:bg-gray-700">
            <div className="max-w-screen-xl px-4 py-3 mx-auto md:px-6">
              <div className="flex items-center">
                <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search..."
                  onChange={event => setSearchField(event.target.value)}
                />
              </div>
            </div>
          </nav>
          {product ?
            <div className="highlights">
              {product.filter(post => {
                if (searchField === '') {
                  return post
                }
                else if (post.name.toLowerCase().includes(searchField.toLowerCase())) {
                  return post
                }
              }).slice(indexOfFirstPost, indexOfLastPost).map((x) => {
                return (
                  <div key={x.id} className="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <h4 className="text-lg px-5 pt-5 text-orange-300" onClick={() => viewItem(x)} style={{ cursor: "pointer" }}>
                      View Product
                    </h4>
                    <a style={{ display: "flex", justifyContent: "center" }}>
                      <img className="p-8 rounded-t-lg" style={{ objectFit: "fill", maxHeight: "250px" }} src={x.picture_url} alt="product image" />
                    </a>
                    <div className="px-5 pb-5">
                      <a>
                        <h5 className="text tracking-tight text-gray-900 dark:text-white">
                          {x.name}
                        </h5>
                      </a>
                      <div className="flex items-center mt-2.5 mb-5">
                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
                      </div>
                      <div className="flex justify-between items-center" onClick={() => addToCart(x)}>
                        <span className="text-2xl font-semibold text-gray-900 text-purple-500">R {numberFormatter.format(x.price)}</span>
                        <a className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          style={{ cursor: "pointer" }}
                        >
                          Add to cart
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            : <div className='onboarding__loader'>
              <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto mt-2">
                <div className="animate-pulse flex space-x-4">
                  <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-700 rounded"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                      </div>
                      <div className="h-2 bg-slate-700 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto mt-2">
                <div className="animate-pulse flex space-x-4">
                  <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-700 rounded"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                      </div>
                      <div className="h-2 bg-slate-700 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }

          {product ?
            <div style={{ marginTop: "1.5em" }}>
              <Paginate page={postsPerPage}
                games={product.length}
                paginate={paginate}
                currentPage={currentPage}
                previousPage={previousPage}
                nextPage={nextPage}
              />
            </div>
            : null}
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Onboarding