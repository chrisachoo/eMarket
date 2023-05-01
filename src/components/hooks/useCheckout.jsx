import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { useCart } from 'react-use-cart';
import 'react-toastify/dist/ReactToastify.css';

export const checkout = () => {

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const _url = import.meta.env.VITE_URL_STRING;
  const localUser = JSON.parse(sessionStorage.getItem('user'))
  const { emptyCart } = useCart();
  const [disable, isDisable] = useState(false);

  const checkUser = async () => {
    if (!user) {
      navigate('/signin')
    } else {
      if (!localUser.address) {
        toast.error("Please go to your profile and edit your address, since it's its empty"), {
          position: "top-right",
          autoClose: 9000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      } else {
        navigate('/payment-checkout')
      }
    }
  }

  const checkoutProducts = async (card_number, exp_date, cvv) => {
    setIsLoading(true)
    setError(null)
    const token = user.token

    console.log({
      card_number: card_number,
      exp_date: exp_date,
      cvv: cvv
    })

    const response = await fetch(`${_url}/payment/save-card`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ card_number, exp_date, cvv, token })
    }).catch((err) => {
      console.log(err)
    })
    const json = await response.json()
    console.log({ json })

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }

    if (response.ok) {
      setIsLoading(false)
    }
  }

  const proceedCheckout = async (product_id, shop_id, quantity, totalDue, fullName) => {
    setIsLoading(true)
    isDisable(true)
    const token = user.token
    const email = user.email

    console.log({
      product_id: product_id,
      shop_id: shop_id,
      quantity: quantity,
      totalDue: totalDue,
      fullName: fullName,
      email: email
    })

    const response = await fetch(`${_url}/cart/proceed-to-checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id, shop_id, quantity, totalDue, fullName, email, token })
    }).catch((err) => {
      console.log(err)
    })

    const res = await response.json()
    console.log({ res })

    if (!response.ok) {
      setIsLoading(false)
      isDisable(false)
      setError(res.error)
    }

    if (response.ok) {
      emptyCart();
      setIsLoading(false);
      isDisable(true)
      navigate('/thank-you');
    }
  }

  return { checkUser, checkoutProducts, proceedCheckout, isLoading, error, isDisable }
}