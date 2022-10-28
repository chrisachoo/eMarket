import { useState, useEffect } from 'react'

export const useConnect = () => {

  const [category, setCategory] = useState([])
  const _url = 'https://e-mall-backend.herokuapp.com'

  const getMallShops = async () => {
    await fetch(`${_url}/shop/get-shops-for-a-mall`)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw response
      }).then(data => {
        setShops(data)
      })
  }

  const getAllCategory = async () => {
    await fetch(`${_url}/shop/get-category-for-a-mall`)
      .then(response => {
        if (response.ok) {
          return response.json()
        } throw response
      }).then(data => {
        setCategory(data)
      })
  }

  return { getMallShops }
}