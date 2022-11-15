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
      navigate('/prod-list', {state: products})
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
          <div className="mb-5">

            <h2 className="text-2xl font-bold leading-snug sm:pr-8">Filter</h2>
            <p className="text-sm dark:text-gray-400">Shop by Malls, Shop and Category</p>
          </div>
          <ReactSearchAutocomplete
            items={malls}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            autoFocus
            placeholder={`Search for malls`}
            showIcon={false}
            className="input input-bordered input-primary w-full"
            styling={{
              border: '1px solid #1A3365',
              hoverBackgroundColor: 'none',
              borderRadius: '5px',
              padding: '.5em 1em',
              display: 'flex', alignItems: 'center',
              clearIconMargin: '.5em 1em',
              zIndex: '20'
            }}
          />

          <ReactSearchAutocomplete
            items={shops}
            onSearch={handleOnSearch}
            onSelect={getAllCategoryofShop}
            autoFocus
            placeholder={`Search for shops`}
            showIcon={false}
            styling={{
              border: '1px solid #1A3365',
              hoverBackgroundColor: 'none',
              borderRadius: '5px',
              padding: '.5em 1em',
              display: 'flex', alignItems: 'center',
              clearIconMargin: '.5em 1em',
              zIndex: '2'
            }}
          />

        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Onboarding