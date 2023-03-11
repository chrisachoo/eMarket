import { useState } from 'react'

export const useMalls = () => {

  const [isLoading, setIsLoading] = useState(null)
  const _url = import.meta.env.VITE_URL_STRING;

  const malls = async () => {
    setIsLoading(true)

    const response = await fetch(`${_url}/mall/get-malls`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).catch((err) => {
      console.log(err)
    })
    const json = await response.json()
    console.log({ malls: json })

    if (!response.ok) {
      setIsLoading(false)
    }

    if (response.ok) {
      setIsLoading(false)
      return json
    }
  }

  return { malls, isLoading }
}