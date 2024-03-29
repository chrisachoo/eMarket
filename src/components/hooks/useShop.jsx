import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useShop = () => {

  const [isLoading, setIsLoading] = useState(null)
  const navigate = useNavigate()
  const _url = import.meta.env.VITE_URL_STRING;

  const getAllCategory = async () => {
    try {
      const response = await fetch(`${_url}/category/get-all-categories`)
      const json = await response.json()

      if (!response.ok) {
        setIsLoading(false)
      }

      if (response.ok) {
        setIsLoading(false)
        return json
      }
    }
    catch (err) {
      console.error(err)
    }
  }

  const getProducts = async (category_id) => {
    setIsLoading(true)

    const response = await fetch(`${_url}/product/get-products/${category_id}`)
      .catch((err) => console.error(err));

    const products = await response.json()

    if (!response.ok) {
      setIsLoading(false)
    }

    if (response.ok) {
      setIsLoading(false)
      const uniqueProducts = new Set()
      const unique = products.filter(element => {
        const isDuplicate = uniqueProducts.has(element.name)
        uniqueProducts.add(element.name)
        if (!isDuplicate) {
          return true
        }

        return false
      })
      navigate('/prod-list', { state: unique })
    }
  }

  const getMallShops = async (_id) => {
    const response = await fetch(`${_url}/shop/get-shops-for-a-mall/${_id}`)
      .catch((err) => console.error(err));

    const shops = await response.json()

    if (!response.ok) {
      setIsLoading(false)
    }

    if (response.ok) {
      setIsLoading(false)
      return shops
    }
  }

  const shopProducts = async (shop_id) => {
    setIsLoading(true)
    const response = await fetch(`${_url}/product/get-products-for-shop/${shop_id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).catch((err) => {
      console.error(err)
    })
    const shopProducts = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      toast.success("No products found for this shop"), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    }

    if (response.ok) {
      setIsLoading(false)
      return shopProducts
    }
  }

  const shopCategory = async () => {
    const response = await fetch(`${_url}/product/get-products-for-shop/${shop_id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).catch((err) => {
      console.error(err)
    })
    const category = await response.json()

    if (!response.ok) {
      setIsLoading(false)
    }

    if (response.ok) {
      setIsLoading(false)
      return category
    }
  }


  const shopShops = async () => {
    const response = await fetch(`${_url}/shop/get-shop`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).catch((err) => {
      console.error(err)
    })
    const shops = await response.json()

    if (!response.ok) {
      setIsLoading(false)
    }

    if (response.ok) {
      setIsLoading(false)
      return shops
    }
  }

  return { getAllCategory, getProducts, getMallShops, shopProducts, isLoading, shopShops }
}