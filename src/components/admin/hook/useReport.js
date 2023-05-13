import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Swal from 'sweetalert2'
// allow cors

export const useReport = () => {
  const [isGenerating, setIsGenerating] = useState(null)
  const _url = import.meta.env.VITE_URL_STRING;
  const { user } = useAuthContext()

  const usersReport = async () => {
    setIsGenerating(true)

    const response = await fetch(`${_url}/report/generate-user-report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }).catch((err) => {
      console.log(err)
    })
    const json = await response.json()

    if (!response.ok) {
      setIsGenerating(false)
    }

    if (response.ok) {
      setIsGenerating(false)
      return json
    }
  }

  const productsReport = async () => {
    setIsGenerating(true)

    const response = await fetch(`${_url}/report/generate-product-report-for-display`, {
      method: 'GET',
    }).catch((err) => {
      console.log(err)
    })
    const json = await response.json()
    console.log({ json })

    if (!response.ok) {
      setIsGenerating(false)
    }

    if (response.ok) {
      setIsGenerating(false)
      return json
    }
  }

  const shopSalesReport = async () => {
    setIsGenerating(true)
    // console.log('url', _url)

    const response = await fetch(`${_url}/report/generate-money-allocation-report-for-display`, {
      method: 'GET',
    }).catch((err) => {
      console.log(err)
    })
    const json = await response.json()
    console.log({ 'money': json })

    if (!response.ok) {
      setIsGenerating(false)
    }

    if (response.ok) {
      setIsGenerating(false)
      return json
    }
  }

  return { usersReport, productsReport, shopSalesReport, isGenerating }
}