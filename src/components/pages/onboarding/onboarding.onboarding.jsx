import { useShop } from '../../hooks/useShop'
import React, { useState } from 'react'
import { Loader, Paginate, NoItems } from '../..'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from 'react-use-cart'
import { useAuthContext } from "../../hooks/useAuthContext"
import { useCheaper } from '../../hooks/useCheepr'
import { useNavigate } from 'react-router-dom';


const Onboarding = ({ category, product }) => {

  const numberFormatter = Intl.NumberFormat('en-US')

  const [currentPage, setCurrentPage] = useState(1)
  const [searchField, setSearchField] = useState("")
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
  }

  const viewItem = async (item) => {
    const product_id = item.id
    const shop_id = item.shop_id
    const product_name = item.name

    if (user) {
      await getCheaperProduct(product_name, product_id, shop_id)
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

  const filteredProducts = product?.filter(post => {
    if (searchField === '') {
      return post
    } else if (post.name.toLowerCase().includes(searchField.toLowerCase())) {
      return post
    }
  })
  const displayedProducts = filteredProducts?.slice(indexOfFirstPost, indexOfLastPost)

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
            <div>
              {displayedProducts?.length > 0 ? (
                  <div className="highlights">
                { displayedProducts.map((x) => (
                    <div key={x.id} className="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                      <h4 className="text-lg px-5 pt-5 text-orange-300" onClick={() => viewItem(x)} style={{ cursor: "pointer" }}>
                        View Product
                      </h4>
                      <a style={{ display: "flex", justifyContent: "center" }}>
                        <img className="p-8 rounded-t-lg" style={{ objectFit: "fill", width: "100%", maxHeight: "300px" }} src={x.picture_url} alt="product image" />
                      </a>
                      <div className="px-5 pb-5">
                        <a>
                          <p className="text-base text-white">
                            {x.name}
                          </p>
                        </a>
                        <p className="pt-1 text-indigo-500 text-2xl font-medium">R {numberFormatter.format(x.price)}</p>
                      </div>
                    </div>
                ))
                }
                  </div>
              ) : (
                <NoItems />
              )}
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

          {displayedProducts?.length > 0 ?
            <div style={{ marginTop: "1.5em" }}>
              <Paginate page={postsPerPage}
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