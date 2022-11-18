import { useShop } from '../../hooks/useShop'
import React, { useEffect, useState } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { Loader } from '../..'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Onboarding = ({ category, malls }) => {

  const { getProducts, getAllCategory, getMallShops, shopProducts, isLoading } = useShop()
  const [shopCategory, setShopCategory] = useState()
  const [shops, setShops] = useState()
  const fetchProducts = async (data) => {
    console.log({ data })
    const category_id = data.id
    await getProducts(category_id)
  }

  const handleOnSearch = (string, results) => {
    console.log(string, results)
  }

  const handleOnSelect = async (item) => {
    // GET SHOPS OF SELECTED MALL
    const response = await getMallShops(item.id)
    if (response.length > 0) {
      console.log('mall shops: ', response)
      setShops(response)
    }
  }

  // GET ALL THE CATEGORY OF SELECTED SHOP
  const getAllCategoryofShop = async (item) => {
    console.log(item)
    const shop_id = item.id
    const products = await shopProducts(shop_id)
    if (products) {
      console.log({ products })
      navigate('/prod-list', { state: products })
    }
  }

  return (
    <>
      {isLoading ? <Loader /> : null}

      <div className="p-5 grid-items">
        <ul className="menu bg-base-300 rounded-box">
          {category ?
            <div>
              {category.map((x) => {
                return (
                  <li key={x.id} onClick={() => fetchProducts(x)} className="hover-bordered"><a>{x.name}</a></li>
                )
              })}
            </div> : <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
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
        <div className="flex-grow p-5 bg-base-300 rounded-box place-items-center">
          <nav className="bg-gray-50 dark:bg-gray-700">
            <div className="max-w-screen-xl px-4 py-3 mx-auto md:px-6">
              <div className="flex items-center">
                <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
              </div>
            </div>
          </nav>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Onboarding