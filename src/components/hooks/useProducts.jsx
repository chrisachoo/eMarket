import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'

export const useProducts = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuthContext()
  const _url = import.meta.env.VITE_URL_STRING;

  const getAllProducts = async () => {
    const response = await fetch(`${_url}/product/get-all-products`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).catch((err) => {
      console.log(err)
    })
    const json = await response.json()
    console.log(json)

    if (!response.ok) {
      setIsLoading(false)
    }

    if (response.ok) {
      setIsLoading(false)
      return json
    }
  }
  
  return { getAllProducts, isLoading, error }
}