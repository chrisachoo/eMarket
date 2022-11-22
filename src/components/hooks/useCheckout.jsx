import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'

export const checkout = () => {

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { user } = useAuthContext()
  // const _url = 'https://e-mall-backend.herokuapp.com'
  const _url = 'https://e-mall-backend.com'

  const checkUser = async () => {
    if (!user) {
      navigate('/signin')
    } else {
      navigate('/payment-checkout')
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

    // const response = await fetch(`${_url}/cart/proceed-to-checkout`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ product_id, shop_id, quantity, totalDue, fullName, email, token })
    // }).catch((err) => {
    //   console.log(err)
    // })

    // const res = await response.json()
    // console.log({ res })

    // if (!response.ok) {
    //   setIsLoading(false)
    //   setError(res.error)
    // }

    // if (response.ok) {
    //   setIsLoading(false)
    //   localStorage.removeItem('react-use-cart')
    //   window.location.reload()
    //   navigate('/thank-you')
    // }
  }

  return { checkUser, checkoutProducts, proceedCheckout, isLoading, error }
}