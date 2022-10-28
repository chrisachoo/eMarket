import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Swal from 'sweetalert2'

export const useReport = () => {
  const [isGenerating, setIsGenerating] = useState(null)
  const _url = 'https://e-mall-backend.herokuapp.com'
  const { user } = useAuthContext()

  const usersReport = async () => {
    setIsGenerating(true)
    const token = user.token
    console.log({token})

    const response = await fetch(`${_url}/report/generate-user-report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    }).catch((err) => {
      console.log(err)
    })
    const json = await response.json()

    if (!response.ok) {
      setIsGenerating(false)
    }

    if (response.ok) {
      setIsGenerating(false)
    }
  }

  return { usersReport, isGenerating }
}