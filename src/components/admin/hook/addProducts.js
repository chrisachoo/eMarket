import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const saveProductsDeatils = () => {

  const [error, setError] = useState(null)
  const { user } = useAuthContext()
  const [isLoading, setIsLoading] = useState(null)
  const _url = import.meta.env.VITE_URL_STRING;

  const saveProducts = async (name, description, price, quantity, category_id, shop_id, picture_url) => {
    setIsLoading(true)
    setError(null)
    const token = user.token

    const response = await fetch(`${_url}/product/add-product`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, price, quantity, category_id, shop_id, picture_url, token })
    }).catch((err) => {
      console.error(err);
    })

    if (!response.ok) {
      setIsLoading(false)
      setError(response.error)
    }

    if (response.ok) {
      setIsLoading(false)
      toast.success("Product addded successfully!"), {
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
  }

  const addShop = async (name, category_id, mall_id) => {
    setIsLoading(true)
    setError(null)
    const token = user.token

    const response = await fetch(`${_url}/shop/add-shop`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, category_id, mall_id, token })
    }).catch((err) => {
      console.error(err)
    })

    if (!response.ok) {
      setIsLoading(false)
      setError(response.error)
    }

    if (response.ok) {
      setIsLoading(false)
      toast.success("Shop addded successfully!"), {
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
  }

  return { saveProducts, addShop, isLoading, error }
}