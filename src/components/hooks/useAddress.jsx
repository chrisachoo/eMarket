import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import Swal from 'sweetalert2'

export const useAddress = () => {

  const { user } = useAuthContext()
  const token = user.token
  const [isLoading, setIsLoading] = useState(null)
  const _url = import.meta.env.VITE_URL_STRING;


  const addAddress = async (address_type, street_address, suburb, city_or_town, province, postal_code) => {
    setIsLoading(true)

    const response = await fetch(`${_url}/address/add-address`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address_type, street_address, suburb, city_or_town, province, postal_code, token })
    }).catch((err) => {
      console.error(err)
    })

    if (!response.ok) {
      setIsLoading(false)

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: json.error,
      })
    }

    if (response.ok) {
      setIsLoading(false)
      Swal.fire(
        'Good job!',
        'Address added successfully!',
        'success'
      )
    }
  }

  const getAddress = async () => {
    setIsLoading(true)

    const response = await fetch(`${_url}/shop/get-shops-for-a-mall/${_id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).catch((err) => {
      console.error(err)
    })
    const shops = await response.json()

    if (!response.ok) {
      setIsLoading(false)

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: json.error,
      })
    }

    if (response.ok) {
      setIsLoading(false)
      return shops
    }
  }

  return { addAddress, isLoading }
}