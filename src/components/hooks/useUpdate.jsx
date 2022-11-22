import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Swal from 'sweetalert2'

export const useUpdate = () => {
  const [isLoading, setIsLoading] = useState(null)
  const _url = 'https://e-mall-backend.herokuapp.com'
  const { user } = useAuthContext()

  const updateUser = async (first_name, last_name, email, cellno, address) => {
    setIsLoading(true)
    const token = user.token

    console.log({
      first_name: first_name,
      last_name: last_name,
      email: email,
      cellno: cellno,
      address: address
    })

    const response = await fetch(`${_url}/user/update-profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ first_name, last_name, email, cellno, address, token })
    }).catch((err) => {
      console.log(err)
    })
    const json = await response.json()
    console.log({ json })

    if (!response.ok) {
      setIsLoading(false)
      // Swal.fire(
      //   'Error',
      //   json.error,
      //   'error'
      // )
    }

    if (response.ok) {
      setIsLoading(false)
      toast.success("Personal details updated successfully!"), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }

      const newUser = await JSON.parse(sessionStorage.getItem('user'))
      newUser.first_name = first_name,
        newUser.last_name = last_name,
        newUser.cellno = cellno,
        newUser.email = email,
        newUser.address = address

      sessionStorage.setItem('user', JSON.stringify(newUser))
      console.log('response', JSON.stringify(json))
    }
  }

  return { updateUser, isLoading }
}