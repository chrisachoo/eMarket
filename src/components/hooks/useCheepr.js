import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from './useAuthContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useCheaper = () => {

  const [loading, setLoading] = useState(null)
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const _url = 'https://e-mall-backend.herokuapp.com'

  const getCheaperProduct = async (product_name, product_id, shop_id) => {
    setLoading(true)
    const token = user.token

    const response = await fetch(`${_url}/product/get-product-one-product`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_name, product_id, shop_id, token })
    }).catch((err) => {
      console.log(err)
    })
    const json = await response.json()
    console.log(json)

    if (!response.ok) {
      setLoading(false)
      toast.error("Could not find cheaper product"), {
        position: "top-right",
        autoClose: 9000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    }

    if (response.ok) {
      setLoading(false)
      navigate('/view product', { state: json })
    }
  }

  return { getCheaperProduct, loading }
}