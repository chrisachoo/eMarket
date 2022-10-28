import { useUpdate } from '../../hooks/useUpdate'
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Address } from '../';


const Profile = () => {

  const { updateUser, isLoading } = useUpdate()
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    cellno: ''
  })

  const notify = (event) => {
    event.preventDefault()
    navigate('/')
  }

  const handleFormChange = (event) => {
    const updatedForm = { ...form }
    updatedForm[event.target.name] = event.target.value

    setForm(updatedForm)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    let { first_name, last_name, email, cellno } = form

    if (!first_name) {
      setError('Field can not be empty!')
    } else
      if (first_name.length < 3) {
        setError('Too short, must be at least 2 characters or more')
      } else
        if (first_name.length > 20) {
          setError('Too long, must be at least 20 characters or less')
        } else
          if (!last_name) {
            setError('Field can not be empty!')
          } else
            if (last_name.length < 3) {
              setError('Too short, must be at least 2 characters or more')
            } else
              if (last_name.length > 20) {
                setError('Too long, must be at least 20 characters or less')
              } else
                if (!cellno) {
                  setError('Field can not be empty!')
                } else
                  if (cellno.length < 10 || cellno.length > 10) {
                    setError('Too long, must be 10 digits in length')
                  } else {
                    await updateUser(first_name, last_name, email, cellno)
                  }
  }

  useEffect(() => {
    const fetchUser = async () => {
      const user = await JSON.parse(sessionStorage.getItem('user'))
      if (user) {
        setForm({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          cellno: user.cellno
        })
      }
    }

    fetchUser().catch(console.error)
  }, [])

  return (
    <>
      <div className="p-5 grid-items">
        <div>
          <ul className="menu bg-base-300 w-100 p-2 rounded-box">
            <li className="menu-title">
              <span>Customer Information</span>
            </li>
            <li><a>Personal Details</a></li>
            <li><a>Address Book</a></li>
            <li className="menu-title">
              <span>Orders</span>
            </li>
            <li><a>Orders</a></li>
            <li><a>Invoices</a></li>
            <li className="menu-title">
              <span>Payment & Credit</span>
            </li>
            <li><a>Credit & Refunds</a></li>
            <li><a>Redeem Gift Voucher</a></li>
          </ul>
        </div>
        <div className="bg-base-300 rounded-box p-4">
          {error && <div className='error'>{error}</div>}
          <form onSubmit={handleSubmit} className="grid-cols-cols">
            <input
              name={`first_name`}
              onChange={handleFormChange}
              value={form.first_name}
              type="text" placeholder="First Name"
              className="input input-bordered input-primary w-full"
            />

            <input name={`last_name`}
              onChange={handleFormChange}
              value={form.last_name}
              type="text" placeholder="Last Name"
              className="input input-bordered input-primary w-full"
            />

            <input name={`cellno`}
              onChange={handleFormChange}
              value={form.cellno}
              type="number" placeholder="Cell Number"
              className="input input-bordered input-primary w-full"
            />

            <input name={`email`}
              onChange={handleFormChange}
              value={form.email}
              type="email" placeholder="Email"
              required={true}
              className="input input-bordered input-primary w-full"
            />

            <Address />

            <div className="flex-items">
              <button className="btn btn-outline btn-error"
                onClick={notify}
              >
                Cancel
              </button>
              <button className="btn btn-primary" type="submit" disabled={isLoading}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Profile