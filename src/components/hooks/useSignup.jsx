import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'

export const useSignup = () => {
  let navigate = useNavigate()

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const _url = import.meta.env.VITE_URL_STRING;

  const signup = async (first_name, last_name, email, cellno, usertype, password) => {
    setIsLoading(true)
    setError(null)

    console.log(`first_name ${first_name}, last_name ${last_name}, email ${email}, cellno ${cellno}, usertype ${usertype}, password ${password}`)

    const response = await fetch(`${_url}/user/registration`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ first_name, last_name, email, cellno, usertype, password })
    }).catch((err) => {
      console.log(err)
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }

    if (response.ok) {
      sessionStorage.setItem('user', JSON.stringify(json))
      dispatch({ type: 'SIGNIN', payload: json })
      setIsLoading(false)
      navigate('/')
      console.log('response', JSON.stringify(json))
    }
  }

  return { signup, isLoading, error }
}