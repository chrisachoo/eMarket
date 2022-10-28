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
      alert('dispatch exist')
      navigate('/payment-checkout')
    }
  }

  return { checkUser, isLoading, error }
}