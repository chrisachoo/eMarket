import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'

export const checkout = () => {
  let navigate = useNavigate()

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuthContext()
  const _url = 'https://e-mall-backend.herokuapp.com'

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

  const proceedCheckout = async (category_id, product_id, total) => {
    console.log({
      category_id: category_id,
      product_id: product_id,
      total: total
    })
    const token = user.token
    const response = await fetch(`${_url}/cart/proceed-to-checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category_id, product_id, total, token })
    }).catch((err) => {
      console.log(err)
    })

    const res = await response.json()
    console.log({res})

    if (!response.ok) {
      setIsLoading(false)
      setError(res.error)
    }

    if (response.ok) {
      setIsLoading(false)
    }
  }

  return { checkUser, checkoutProducts, proceedCheckout, isLoading, error }
}