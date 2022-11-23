import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Swal from 'sweetalert2'

export const useReport = () => {
  const [isGenerating, setIsGenerating] = useState(null)
  const _url = 'https://e-mall-backend.herokuapp.com'
  // const _url = 'http://localhost:5000'
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
      headers: { 'Content-Type': 'application/json' }
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

  return { usersReport, productsReport, isGenerating }
}