import { Link, useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
import { useLogout } from "../hooks/useLogout"
import { useCart } from 'react-use-cart'
import { useSignin } from "../hooks/useSignin"
import jwt_decode from 'jwt-decode'

const Navigation = () => {

  const navigate = useNavigate()
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    totalItems
  } = useCart()
  const { getAllUsers } = useSignin();

  const adminRoute = async () => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const allusers = await getAllUsers(user?.token)
    if (user && allusers ) {
      const token = user?.token
      const decode = jwt_decode(token)
      const userObject = JSON.parse(decode.user_details)

      if (userObject.usertype !== 'shopper') navigate('/admin/dashboard', { state: allusers })
      else navigate('/signin')
    }
  }
  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleSignin = () => {
    navigate('/signin')
  }

  const handleSignup = () => {
    navigate('/signup')
  }

  let price = 0
  for (let j = 0; j < items.length; j++) {
    price = price + (items[j].price * items[j].quantity);
  }

  const numberFormatter = Intl.NumberFormat('en-US')
  const formatted = numberFormatter.format(price)

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to='/' className="btn btn-ghost normal-case text-xl">eMarket</Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              <span className="badge badge-sm indicator-item">{totalItems}</span>
            </div>
          </label>
          <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
            <div className="card-body">
              <span className="font-bold text-lg">{totalItems} Items</span>
              <span className="text-info">Subtotal: R {formatted}</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block" onClick={() => navigate('/cart')}>View cart</button>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://placeimg.com/80/80/people" />
            </div>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              {user && (
                <Link to='/profile' className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              )}
            </li>
            {!user ? <div>
              <li onClick={handleSignin}><a>SignIn</a></li>
              <li onClick={handleSignup}><a>SignUp</a></li>
            </div>
              : <div>
                <li onClick={adminRoute}><a>Admin</a></li>
                <li onClick={handleLogout}><a>Logout</a></li>
              </div>}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navigation